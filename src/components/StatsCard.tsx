import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  status?: "success" | "warning" | "default";
}

export const StatsCard = ({ title, value, icon: Icon, trend, status = "default" }: StatsCardProps) => {
  const statusColors = {
    success: "text-success",
    warning: "text-warning",
    default: "text-primary",
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-secondary/30">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{value}</h3>
            {trend && (
              <span className={cn("text-sm font-medium", statusColors[status])}>
                {trend}
              </span>
            )}
          </div>
        </div>
        <div className={cn("p-3 rounded-xl bg-gradient-to-br", 
          status === "success" ? "from-success/20 to-success/10" :
          status === "warning" ? "from-warning/20 to-warning/10" :
          "from-primary/20 to-accent/10"
        )}>
          <Icon className={cn("h-6 w-6", statusColors[status])} />
        </div>
      </div>
    </Card>
  );
};
