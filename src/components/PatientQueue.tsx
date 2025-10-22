import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, AlertCircle } from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  severity: "critical" | "urgent" | "stable";
  arrivalTime: string;
  vitals: string;
}

const mockPatients: Patient[] = [
  { id: "1", name: "John Doe", age: 45, condition: "Cardiac Arrest", severity: "critical", arrivalTime: "2 min", vitals: "HR: 120, BP: 90/60" },
  { id: "2", name: "Sarah Smith", age: 32, condition: "Fracture", severity: "stable", arrivalTime: "5 min", vitals: "HR: 80, BP: 120/80" },
  { id: "3", name: "Michael Johnson", age: 58, condition: "Stroke Symptoms", severity: "critical", arrivalTime: "1 min", vitals: "HR: 95, BP: 160/100" },
  { id: "4", name: "Emily Davis", age: 24, condition: "Allergic Reaction", severity: "urgent", arrivalTime: "10 min", vitals: "HR: 110, BP: 115/75" },
];

export const PatientQueue = () => {
  const [patients, setPatients] = useState(mockPatients);

  useEffect(() => {
    const interval = setInterval(() => {
      setPatients(prev => 
        prev.map(patient => ({
          ...patient,
          arrivalTime: Math.max(0, parseInt(patient.arrivalTime) - 1) + " min"
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: Patient["severity"]) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-destructive-foreground";
      case "urgent":
        return "bg-warning text-warning-foreground";
      case "stable":
        return "bg-success text-success-foreground";
    }
  };

  const getSeverityIcon = (severity: Patient["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-4 w-4" />;
      case "urgent":
        return <Heart className="h-4 w-4" />;
      case "stable":
        return <Heart className="h-4 w-4" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Incoming Patients</h2>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {patients.length} Patients
        </Badge>
      </div>
      
      <div className="space-y-3">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="p-4 rounded-lg border bg-gradient-to-r from-card to-secondary/20 hover:shadow-md transition-all duration-300 animate-slide-up"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">{patient.name}</span>
                  <span className="text-sm text-muted-foreground">({patient.age}y)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(patient.severity)}>
                    {getSeverityIcon(patient.severity)}
                    <span className="ml-1">{patient.severity.toUpperCase()}</span>
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">ETA</div>
                <div className="text-lg font-bold text-accent animate-pulse-glow">{patient.arrivalTime}</div>
              </div>
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-medium">Condition:</span>
                <span className="font-medium">{patient.condition}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-medium">Vitals:</span>
                <span className="font-mono text-xs">{patient.vitals}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
