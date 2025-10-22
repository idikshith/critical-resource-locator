-- Create enum types for various statuses and roles
CREATE TYPE public.app_role AS ENUM ('admin', 'patient', 'driver', 'hospital_staff');
CREATE TYPE public.ambulance_status AS ENUM ('available', 'busy', 'maintenance');
CREATE TYPE public.request_status AS ENUM ('pending', 'assigned', 'in_transit', 'completed', 'cancelled');
CREATE TYPE public.priority_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.post_type AS ENUM ('blood_request', 'medical_help', 'resource_sharing', 'general');

-- Create user roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create hospitals table
CREATE TABLE public.hospitals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    phone TEXT NOT NULL,
    emergency_capacity INTEGER DEFAULT 0,
    available_beds INTEGER DEFAULT 0,
    specialties TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create ambulances table
CREATE TABLE public.ambulances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vehicle_number TEXT NOT NULL UNIQUE,
    driver_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    status ambulance_status DEFAULT 'available',
    current_latitude DECIMAL(10, 8),
    current_longitude DECIMAL(11, 8),
    equipment TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create emergency requests table
CREATE TABLE public.emergency_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    ambulance_id UUID REFERENCES public.ambulances(id) ON DELETE SET NULL,
    hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
    status request_status DEFAULT 'pending',
    priority priority_level NOT NULL,
    pickup_latitude DECIMAL(10, 8) NOT NULL,
    pickup_longitude DECIMAL(11, 8) NOT NULL,
    pickup_address TEXT NOT NULL,
    destination_latitude DECIMAL(10, 8),
    destination_longitude DECIMAL(11, 8),
    destination_address TEXT,
    patient_condition TEXT,
    notes TEXT,
    estimated_arrival_time TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create emergency contacts table
CREATE TABLE public.emergency_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create medical articles table
CREATE TABLE public.medical_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    image_url TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create community posts table
CREATE TABLE public.community_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    post_type post_type NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    blood_type TEXT,
    location TEXT,
    contact_info TEXT,
    urgent BOOLEAN DEFAULT false,
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
    AND role = _role
  )
$$;

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default patient role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'patient');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Create triggers for updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ambulances_updated_at
  BEFORE UPDATE ON public.ambulances
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_emergency_requests_updated_at
  BEFORE UPDATE ON public.emergency_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medical_articles_updated_at
  BEFORE UPDATE ON public.medical_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON public.community_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for hospitals
CREATE POLICY "Everyone can view hospitals"
  ON public.hospitals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Hospital staff can update their hospital"
  ON public.hospitals FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'hospital_staff') OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for ambulances
CREATE POLICY "Everyone can view available ambulances"
  ON public.ambulances FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Drivers can update their ambulance"
  ON public.ambulances FOR UPDATE
  TO authenticated
  USING (auth.uid() = driver_id OR public.has_role(auth.uid(), 'admin'));

-- RLS Policies for emergency_requests
CREATE POLICY "Users can view their own requests"
  ON public.emergency_requests FOR SELECT
  TO authenticated
  USING (
    auth.uid() = patient_id OR
    auth.uid() IN (SELECT driver_id FROM public.ambulances WHERE id = ambulance_id) OR
    public.has_role(auth.uid(), 'hospital_staff') OR
    public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Patients can create requests"
  ON public.emergency_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patient_id);

CREATE POLICY "Drivers and admins can update requests"
  ON public.emergency_requests FOR UPDATE
  TO authenticated
  USING (
    auth.uid() IN (SELECT driver_id FROM public.ambulances WHERE id = ambulance_id) OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for emergency_contacts
CREATE POLICY "Users can manage their own contacts"
  ON public.emergency_contacts FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for medical_articles
CREATE POLICY "Everyone can view medical articles"
  ON public.medical_articles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and hospital staff can create articles"
  ON public.medical_articles FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR
    public.has_role(auth.uid(), 'hospital_staff')
  );

CREATE POLICY "Authors can update their articles"
  ON public.medical_articles FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = author_id OR
    public.has_role(auth.uid(), 'admin')
  );

-- RLS Policies for community_posts
CREATE POLICY "Everyone can view community posts"
  ON public.community_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create posts"
  ON public.community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON public.community_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON public.community_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.emergency_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.community_posts;

-- Insert some sample data
INSERT INTO public.hospitals (name, address, latitude, longitude, phone, emergency_capacity, available_beds, specialties) VALUES
('City General Hospital', '123 Main St, City Center', 40.7128, -74.0060, '+1-555-0101', 50, 25, ARRAY['Emergency', 'Cardiology', 'Neurology']),
('Metro Medical Center', '456 Park Ave, Downtown', 40.7589, -73.9851, '+1-555-0102', 40, 18, ARRAY['Emergency', 'Pediatrics', 'Orthopedics']),
('Regional Health Institute', '789 Hospital Rd, Suburb', 40.7306, -73.9352, '+1-555-0103', 60, 32, ARRAY['Emergency', 'Surgery', 'ICU']);

INSERT INTO public.medical_articles (title, content, category, tags, image_url) VALUES
('Basic First Aid: CPR', 'Cardiopulmonary resuscitation (CPR) is a lifesaving technique useful in emergencies. Here are the steps: 1. Call emergency services immediately. 2. Place the person on their back on a firm surface. 3. Place your hands in the center of their chest. 4. Push hard and fast at a rate of 100-120 compressions per minute. 5. Continue until help arrives.', 'Emergency Care', ARRAY['CPR', 'First Aid', 'Emergency'], 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800'),
('Managing Heart Attacks', 'Recognizing heart attack symptoms can save lives. Common signs include chest pain, shortness of breath, and pain in arms or jaw. If you suspect a heart attack: 1. Call emergency services immediately. 2. Have the person sit down and rest. 3. If prescribed, help them take nitroglycerin. 4. If they become unconscious, begin CPR.', 'Cardiac Care', ARRAY['Heart', 'Emergency', 'Cardiac'], 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800'),
('Treating Minor Burns', 'For minor burns: 1. Cool the burn under running water for 10-20 minutes. 2. Remove jewelry near the burn. 3. Apply a sterile bandage. 4. Take over-the-counter pain relief if needed. Seek medical help for severe burns, burns on face/hands/feet, or burns larger than 3 inches.', 'First Aid', ARRAY['Burns', 'First Aid', 'Treatment'], 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800'),
('Choking: Heimlich Maneuver', 'If someone is choking: 1. Stand behind the person. 2. Make a fist with one hand and place it above their navel. 3. Grasp your fist with the other hand. 4. Give quick, upward thrusts. 5. Repeat until the object is dislodged. For infants, use back blows and chest thrusts instead.', 'Emergency Care', ARRAY['Choking', 'Emergency', 'First Aid'], 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800'),
('Recognizing Stroke Symptoms', 'Remember FAST: Face (drooping on one side), Arms (weakness in one arm), Speech (slurred or strange), Time (call emergency immediately). Other symptoms include sudden confusion, trouble seeing, severe headache, and loss of balance. Quick action can minimize brain damage.', 'Emergency Care', ARRAY['Stroke', 'Emergency', 'Symptoms'], 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800');