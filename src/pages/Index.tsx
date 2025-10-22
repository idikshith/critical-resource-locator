import { DashboardHeader } from "@/components/DashboardHeader";
import { HeroSection } from "@/components/HeroSection";
import { StatsCard } from "@/components/StatsCard";
import { AmbulanceTracker } from "@/components/AmbulanceTracker";
import { PatientQueue } from "@/components/PatientQueue";
import { NotificationFeed } from "@/components/NotificationFeed";
import { Ambulance, Users, Clock, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <HeroSection />
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Ambulances"
            value={4}
            icon={Ambulance}
            trend="+2"
            status="success"
          />
          <StatsCard
            title="Incoming Patients"
            value={4}
            icon={Users}
            trend="Real-time"
            status="warning"
          />
          <StatsCard
            title="Avg Response Time"
            value="6 min"
            icon={Clock}
            status="success"
          />
          <StatsCard
            title="System Status"
            value="100%"
            icon={Activity}
            trend="Operational"
            status="success"
          />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AmbulanceTracker />
            <PatientQueue />
          </div>
          
          <div className="lg:col-span-1">
            <NotificationFeed />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
