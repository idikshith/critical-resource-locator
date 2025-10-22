import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Ambulance, MapPin, Clock } from "lucide-react";

interface Ambulance {
  id: string;
  unit: string;
  status: "en-route" | "arrived" | "available";
  patient: string;
  location: string;
  eta: string;
  priority: "high" | "medium" | "low";
}

const mockAmbulances: Ambulance[] = [
  { id: "1", unit: "AMB-101", status: "en-route", patient: "John Doe", location: "5th Ave & Main St", eta: "4 min", priority: "high" },
  { id: "2", unit: "AMB-205", status: "en-route", patient: "Sarah Smith", location: "Park Blvd", eta: "7 min", priority: "medium" },
  { id: "3", unit: "AMB-312", status: "arrived", patient: "Michael Johnson", location: "Hospital Bay 2", eta: "0 min", priority: "high" },
  { id: "4", unit: "AMB-418", status: "en-route", patient: "Emily Davis", location: "Downtown Center", eta: "12 min", priority: "low" },
];

export const AmbulanceTracker = () => {
  const [ambulances, setAmbulances] = useState(mockAmbulances);

  useEffect(() => {
    const interval = setInterval(() => {
      setAmbulances(prev => 
        prev.map(amb => {
          if (amb.status === "en-route" && Math.random() > 0.7) {
            const currentEta = parseInt(amb.eta);
            return { ...amb, eta: Math.max(0, currentEta - 1) + " min" };
          }
          return amb;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: Ambulance["status"]) => {
    switch (status) {
      case "en-route":
        return "bg-accent text-accent-foreground";
      case "arrived":
        return "bg-success text-success-foreground";
      case "available":
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getPriorityColor = (priority: Ambulance["priority"]) => {
    switch (priority) {
      case "high":
        return "border-destructive bg-destructive/10";
      case "medium":
        return "border-warning bg-warning/10";
      case "low":
        return "border-primary bg-primary/10";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Ambulance className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Active Ambulances</h2>
        </div>
        <Badge variant="outline" className="bg-accent/10 text-accent">
          {ambulances.filter(a => a.status === "en-route").length} En Route
        </Badge>
      </div>
      
      <div className="space-y-3">
        {ambulances.map((ambulance) => (
          <div
            key={ambulance.id}
            className={`p-4 rounded-lg border-l-4 transition-all duration-300 animate-slide-up ${getPriorityColor(ambulance.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{ambulance.unit}</span>
                  <Badge className={getStatusColor(ambulance.status)}>
                    {ambulance.status.replace("-", " ").toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium">Patient:</span>
                    <span>{ambulance.patient}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{ambulance.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-accent">{ambulance.eta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
