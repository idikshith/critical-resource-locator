import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Ambulance, MapPin } from "lucide-react";

interface EmergencyRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const EmergencyRequestModal = ({ open, onOpenChange, userId }: EmergencyRequestModalProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    pickup_address: string;
    pickup_latitude: string;
    pickup_longitude: string;
    patient_condition: string;
    priority: Database["public"]["Enums"]["priority_level"];
    notes: string;
  }>({
    pickup_address: "",
    pickup_latitude: "",
    pickup_longitude: "",
    patient_condition: "",
    priority: "medium",
    notes: "",
  });

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            pickup_latitude: position.coords.latitude.toString(),
            pickup_longitude: position.coords.longitude.toString(),
          });
          toast({
            title: "Location captured",
            description: "Your current location has been set",
          });
        },
        (error) => {
          toast({
            variant: "destructive",
            title: "Location error",
            description: "Unable to get your location. Please enter manually.",
          });
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.pickup_latitude || !formData.pickup_longitude) {
        throw new Error("Please provide pickup location coordinates");
      }

      const { error } = await supabase.from("emergency_requests").insert([
        {
          patient_id: userId,
          pickup_address: formData.pickup_address,
          pickup_latitude: parseFloat(formData.pickup_latitude),
          pickup_longitude: parseFloat(formData.pickup_longitude),
          patient_condition: formData.patient_condition,
          priority: formData.priority,
          notes: formData.notes,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Emergency request submitted",
        description: "An ambulance will be assigned shortly",
      });

      setFormData({
        pickup_address: "",
        pickup_latitude: "",
        pickup_longitude: "",
        patient_condition: "",
        priority: "medium",
        notes: "",
      });
      
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ambulance className="w-6 h-6 text-primary" />
            Request Emergency Ambulance
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to request immediate medical assistance
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pickup_address">Pickup Address</Label>
            <Input
              id="pickup_address"
              value={formData.pickup_address}
              onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
              placeholder="Enter full address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup_latitude">Latitude</Label>
              <Input
                id="pickup_latitude"
                type="number"
                step="any"
                value={formData.pickup_latitude}
                onChange={(e) => setFormData({ ...formData, pickup_latitude: e.target.value })}
                placeholder="0.0000"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickup_longitude">Longitude</Label>
              <Input
                id="pickup_longitude"
                type="number"
                step="any"
                value={formData.pickup_longitude}
                onChange={(e) => setFormData({ ...formData, pickup_longitude: e.target.value })}
                placeholder="0.0000"
                required
              />
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={getCurrentLocation}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Use Current Location
          </Button>

          <div className="space-y-2">
            <Label htmlFor="patient_condition">Patient Condition</Label>
            <Textarea
              id="patient_condition"
              value={formData.patient_condition}
              onChange={(e) => setFormData({ ...formData, patient_condition: e.target.value })}
              placeholder="Describe the medical condition or emergency"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value as Database["public"]["Enums"]["priority_level"] })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - Non-urgent</SelectItem>
                <SelectItem value="medium">Medium - Moderate urgency</SelectItem>
                <SelectItem value="high">High - Very urgent</SelectItem>
                <SelectItem value="critical">Critical - Life-threatening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Any additional information (optional)"
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-emergency text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Request Ambulance"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
