import { Activity, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Hospital Integration Dashboard</h1>
                <p className="text-sm text-muted-foreground">Real-time Monitoring System</p>
              </div>
            </div>
            
            <nav className="flex items-center gap-2">
              <Button 
                variant={location.pathname === "/" ? "default" : "ghost"}
                onClick={() => navigate("/")}
              >
                Dashboard
              </Button>
              <Button 
                variant={location.pathname === "/gps-monitoring" ? "default" : "ghost"}
                onClick={() => navigate("/gps-monitoring")}
              >
                GPS Monitoring
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px]">
                3
              </Badge>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              All Systems Active
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
