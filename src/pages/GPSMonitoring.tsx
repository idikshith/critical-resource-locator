import { DashboardHeader } from "@/components/DashboardHeader";
import { GPSHeroSection } from "@/components/GPSHeroSection";
import { GPSMapView } from "@/components/GPSMapView";
import { GPSStatsBar } from "@/components/GPSStatsBar";

const GPSMonitoring = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8">
        <GPSHeroSection />
        <GPSStatsBar />
        <GPSMapView />
      </main>
    </div>
  );
};

export default GPSMonitoring;
