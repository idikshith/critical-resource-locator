import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation2, Clock, Gauge } from "lucide-react";

interface AmbulanceLocation {
  id: string;
  unit: string;
  lat: number;
  lng: number;
  speed: number;
  heading: number;
  patient: string;
  destination: string;
  eta: string;
  distance: string;
  status: "moving" | "stopped" | "arrived";
}

const mockLocations: AmbulanceLocation[] = [
  { 
    id: "1", 
    unit: "AMB-101", 
    lat: 40.7589, 
    lng: -73.9851, 
    speed: 45, 
    heading: 135,
    patient: "John Doe",
    destination: "City Hospital",
    eta: "4 min",
    distance: "2.1 km",
    status: "moving"
  },
  { 
    id: "2", 
    unit: "AMB-205", 
    lat: 40.7614, 
    lng: -73.9776, 
    speed: 38, 
    heading: 90,
    patient: "Sarah Smith",
    destination: "Memorial Hospital",
    eta: "7 min",
    distance: "3.8 km",
    status: "moving"
  },
  { 
    id: "3", 
    unit: "AMB-312", 
    lat: 40.7489, 
    lng: -73.9680, 
    speed: 0, 
    heading: 0,
    patient: "Michael Johnson",
    destination: "Emergency Center",
    eta: "0 min",
    distance: "0 km",
    status: "arrived"
  },
  { 
    id: "4", 
    unit: "AMB-418", 
    lat: 40.7549, 
    lng: -73.9840, 
    speed: 52, 
    heading: 270,
    patient: "Emily Davis",
    destination: "Central Hospital",
    eta: "12 min",
    distance: "5.4 km",
    status: "moving"
  },
];

export const GPSMapView = () => {
  const [locations, setLocations] = useState(mockLocations);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocations(prev => 
        prev.map(loc => {
          if (loc.status === "moving") {
            const latChange = (Math.random() - 0.5) * 0.001;
            const lngChange = (Math.random() - 0.5) * 0.001;
            const speedChange = Math.floor((Math.random() - 0.5) * 10);
            return {
              ...loc,
              lat: loc.lat + latChange,
              lng: loc.lng + lngChange,
              speed: Math.max(0, Math.min(80, loc.speed + speedChange)),
              heading: (loc.heading + Math.floor((Math.random() - 0.5) * 20) + 360) % 360,
            };
          }
          return loc;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: AmbulanceLocation["status"]) => {
    switch (status) {
      case "moving":
        return "bg-accent text-accent-foreground";
      case "stopped":
        return "bg-warning text-warning-foreground";
      case "arrived":
        return "bg-success text-success-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map View */}
      <div className="lg:col-span-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold">Live GPS Tracking</h2>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success">
              Real-time Updates
            </Badge>
          </div>
          
          {/* Simulated Map */}
          <div className="relative bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg h-[600px] overflow-hidden border">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDQwIEwgNDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 text-muted-foreground"></div>
            
            {/* Ambulance markers */}
            {locations.map((loc, idx) => (
              <div
                key={loc.id}
                className={`absolute transition-all duration-2000 cursor-pointer transform hover:scale-110 ${
                  selectedUnit === loc.unit ? 'z-20' : 'z-10'
                }`}
                style={{
                  left: `${20 + idx * 20}%`,
                  top: `${30 + idx * 15}%`,
                }}
                onClick={() => setSelectedUnit(loc.unit)}
              >
                <div className="relative animate-pulse-glow">
                  {/* Pulsing circle for moving ambulances */}
                  {loc.status === "moving" && (
                    <div className="absolute -inset-4 bg-accent/20 rounded-full animate-ping"></div>
                  )}
                  
                  {/* Ambulance icon */}
                  <div className={`relative p-3 rounded-full ${
                    loc.status === "moving" ? "bg-accent" : 
                    loc.status === "stopped" ? "bg-warning" : "bg-success"
                  } shadow-lg`}>
                    <Navigation2 
                      className="h-5 w-5 text-white" 
                      style={{ transform: `rotate(${loc.heading}deg)` }}
                    />
                  </div>
                  
                  {/* Unit label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <Badge variant="outline" className="bg-background text-xs">
                      {loc.unit}
                    </Badge>
                  </div>
                  
                  {/* Speed indicator */}
                  {loc.status === "moving" && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <Badge className="bg-accent text-xs">
                        {loc.speed} km/h
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* GPS Details Panel */}
      <div className="lg:col-span-1">
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-4">GPS Tracker Details</h3>
          <div className="space-y-3">
            {locations.map((loc) => (
              <div
                key={loc.id}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 cursor-pointer ${
                  selectedUnit === loc.unit 
                    ? "border-primary bg-primary/10 shadow-md" 
                    : "border-secondary bg-secondary/30 hover:bg-secondary/50"
                }`}
                onClick={() => setSelectedUnit(loc.unit)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{loc.unit}</span>
                    <Badge className={getStatusColor(loc.status)}>
                      {loc.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium">Patient:</span>
                      <span>{loc.patient}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{loc.destination}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-accent" />
                        <span className="text-accent font-medium">{loc.eta}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation2 className="h-3 w-3" />
                        <span className="text-xs">{loc.distance}</span>
                      </div>
                      {loc.status === "moving" && (
                        <div className="flex items-center gap-1">
                          <Gauge className="h-3 w-3" />
                          <span className="text-xs">{loc.speed} km/h</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex justify-between">
                        <span>Lat: {loc.lat.toFixed(4)}</span>
                        <span>Lng: {loc.lng.toFixed(4)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
