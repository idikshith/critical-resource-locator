import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ambulance, Users, Heart, Plus, AlertCircle, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  post_type: string;
  blood_type?: string;
  location?: string;
  contact_info?: string;
  urgent: boolean;
  resolved: boolean;
  created_at: string;
  user_id: string;
}

const Community = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    post_type: Database["public"]["Enums"]["post_type"];
    blood_type: string;
    location: string;
    contact_info: string;
    urgent: boolean;
  }>({
    title: "",
    content: "",
    post_type: "blood_request",
    blood_type: "",
    location: "",
    contact_info: "",
    urgent: false,
  });

  useEffect(() => {
    checkAuth();
    fetchPosts();
    
    const channel = supabase
      .channel('community_posts_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'community_posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setUser(session?.user || null);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to create a post",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("community_posts").insert([
        {
          ...formData,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Post created successfully",
        description: "Your post has been shared with the community",
      });

      setFormData({
        title: "",
        content: "",
        post_type: "blood_request",
        blood_type: "",
        location: "",
        contact_info: "",
        urgent: false,
      });
      setDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Critical Resource Locator</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-4 gradient-hero">
        <div className="container mx-auto text-center text-white">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Support</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Connect with others for blood requests, resource sharing, and support
          </p>
        </div>
      </section>

      <section className="py-8 px-4 border-b bg-muted/30">
        <div className="container mx-auto flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gradient-emergency text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Community Post</DialogTitle>
                <DialogDescription>
                  Share a blood request or help others in need
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="post_type">Post Type</Label>
                  <Select
                    value={formData.post_type}
                    onValueChange={(value) => setFormData({ ...formData, post_type: value as Database["public"]["Enums"]["post_type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blood_request">Blood Request</SelectItem>
                      <SelectItem value="medical_help">Medical Help</SelectItem>
                      <SelectItem value="resource_sharing">Resource Share</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Description</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={4}
                    required
                  />
                </div>

                {formData.post_type === "blood_request" && (
                  <div className="space-y-2">
                    <Label htmlFor="blood_type">Blood Type</Label>
                    <Select
                      value={formData.blood_type}
                      onValueChange={(value) => setFormData({ ...formData, blood_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A+">A+</SelectItem>
                        <SelectItem value="A-">A-</SelectItem>
                        <SelectItem value="B+">B+</SelectItem>
                        <SelectItem value="B-">B-</SelectItem>
                        <SelectItem value="AB+">AB+</SelectItem>
                        <SelectItem value="AB-">AB-</SelectItem>
                        <SelectItem value="O+">O+</SelectItem>
                        <SelectItem value="O-">O-</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, State"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_info">Contact Information</Label>
                  <Input
                    id="contact_info"
                    value={formData.contact_info}
                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                    placeholder="Phone or email"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    checked={formData.urgent}
                    onChange={(e) => setFormData({ ...formData, urgent: e.target.checked })}
                  />
                  <Label htmlFor="urgent" className="cursor-pointer">Mark as urgent</Label>
                </div>

                <Button type="submit" className="w-full">Submit Post</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
              <p className="text-muted-foreground">Be the first to create a post!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Card key={post.id} className={`hover:shadow-lg transition-shadow ${post.urgent ? 'border-destructive' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={post.post_type === 'blood_request' ? 'destructive' : 'secondary'} className="capitalize">
                        {post.post_type.replace('_', ' ')}
                      </Badge>
                      {post.urgent && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{post.title}</CardTitle>
                    {post.blood_type && (
                      <Badge variant="outline" className="w-fit">
                        <Heart className="w-3 h-3 mr-1" />
                        {post.blood_type}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="line-clamp-3">{post.content}</CardDescription>
                    
                    {post.location && (
                      <p className="text-sm text-muted-foreground">📍 {post.location}</p>
                    )}
                    
                    {post.contact_info && (
                      <p className="text-sm text-muted-foreground">📞 {post.contact_info}</p>
                    )}
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                      {post.resolved && (
                        <Badge variant="secondary" className="text-xs">Resolved</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Critical Resource Locator - Team Paradox | IOTRIXHACK 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Community;
