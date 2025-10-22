import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface Notification {
  id: string;
  type: "info" | "success" | "warning";
  message: string;
  timestamp: string;
}

const initialNotifications: Notification[] = [
  { id: "1", type: "warning", message: "AMB-101 ETA updated: 4 minutes", timestamp: "Just now" },
  { id: "2", type: "success", message: "Patient John Doe checked in successfully", timestamp: "2 min ago" },
  { id: "3", type: "info", message: "Emergency Room 3 now available", timestamp: "5 min ago" },
];

export const NotificationFeed = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  useEffect(() => {
    const messages = [
      "New patient incoming via AMB-418",
      "Medical team assembled for critical patient",
      "Equipment prepared in ER-2",
      "Blood type O+ requested",
      "Specialist consultation scheduled",
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: ["info", "success", "warning"][Math.floor(Math.random() * 3)] as Notification["type"],
          message: messages[Math.floor(Math.random() * messages.length)],
          timestamp: "Just now"
        };
        setNotifications(prev => [newNotification, ...prev].slice(0, 5));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "info":
        return <Info className="h-4 w-4 text-accent" />;
    }
  };

  const getBadgeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-success/10 text-success border-success/20";
      case "warning":
        return "bg-warning/10 text-warning border-warning/20";
      case "info":
        return "bg-accent/10 text-accent border-accent/20";
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">Live Notifications</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 rounded-lg bg-gradient-to-r from-secondary/30 to-background border animate-slide-up"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{notification.message}</p>
                <Badge variant="outline" className={getBadgeColor(notification.type)}>
                  {notification.timestamp}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
