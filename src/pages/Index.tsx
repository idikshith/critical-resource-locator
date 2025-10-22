import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Activity,
  Ambulance,
  Hospital,
  MapPin,
  Navigation,
  Phone,
  BookOpen,
  Users,
  Shield,
  Clock,
  Heart,
  AlertCircle,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Critical Resource Locator</span>
          </div>
          <div className="flex items-center gap-4">
            {session ? (
              <Button onClick={() => navigate("/dashboard")}>Dashboard</Button>
            ) : (
              <Button onClick={() => navigate("/auth")}>Login</Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Smart Emergency Response System
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Every Second
            <br />
            <span className="gradient-emergency bg-clip-text text-transparent">
              Saves Lives
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            AI-powered ambulance allocation, real-time GPS tracking, and seamless
            hospital integration for faster emergency medical response.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-emergency text-white"
              onClick={() => navigate(session ? "/dashboard" : "/auth")}
            >
              <Ambulance className="w-5 h-5 mr-2" />
              Request Ambulance
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/medical-library")}>
              <BookOpen className="w-5 h-5 mr-2" />
              Medical Library
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                60%
              </div>
              <p className="text-muted-foreground">Faster Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <Heart className="w-8 h-8 mx-auto mb-2" />
                99%
              </div>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <Hospital className="w-8 h-8 mx-auto mb-2" />
                50+
              </div>
              <p className="text-muted-foreground">Partner Hospitals</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <Ambulance className="w-8 h-8 mx-auto mb-2" />
                24/7
              </div>
              <p className="text-muted-foreground">Always Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Features</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need for emergency medical response
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Based Ambulance Allocation
              </h3>
              <p className="text-muted-foreground">
                Intelligent algorithms automatically assign the nearest available
                ambulance based on distance, traffic, and availability.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time GPS Monitoring</h3>
              <p className="text-muted-foreground">
                Track ambulance location live with accurate ETA updates for patients
                and hospitals.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Hospital className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Hospital Integration Dashboard
              </h3>
              <p className="text-muted-foreground">
                Hospitals receive real-time notifications about incoming patients to
                prepare treatment teams in advance.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Navigation className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Route Optimization</h3>
              <p className="text-muted-foreground">
                Real-time traffic analysis and predictive routing to ensure fastest
                possible arrival times.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Emergency Contact Notification
              </h3>
              <p className="text-muted-foreground">
                Automatic notifications to emergency contacts with live tracking links
                and status updates.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Driver Assistance</h3>
              <p className="text-muted-foreground">
                Real-time alerts for nearby hospitals, fuel stations, and high-risk
                zones with voice-guided navigation.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">E-Medical Library</h3>
              <p className="text-muted-foreground">
                Verified medical information with first-aid instructions and emergency
                handling tips.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Connect with local healthcare communities for blood requests and
                resource sharing.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Virtual Consultations</h3>
              <p className="text-muted-foreground">
                Connect with healthcare professionals through video calls for minor
                illnesses and follow-ups.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero">
        <div className="container mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust our emergency response system
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate(session ? "/dashboard" : "/auth")}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Critical Resource Locator - Team Paradox | IOTRIXHACK 2025</p>
          <p className="mt-2 text-sm">
            Saving lives through technology and innovation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
