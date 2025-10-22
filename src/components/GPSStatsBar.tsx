import { Card } from "@/components/ui/card";
import { Navigation, Satellite, Clock, TrendingUp } from "lucide-react";

export const GPSStatsBar = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-primary/20">
            <Navigation className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Active Trackers</p>
            <p className="text-2xl font-bold">4</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-success/20">
            <Satellite className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">GPS Signal</p>
            <p className="text-2xl font-bold">98%</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-accent/20">
            <Clock className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg ETA</p>
            <p className="text-2xl font-bold">7 min</p>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-warning/20">
            <TrendingUp className="h-5 w-5 text-warning" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold">±5m</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
