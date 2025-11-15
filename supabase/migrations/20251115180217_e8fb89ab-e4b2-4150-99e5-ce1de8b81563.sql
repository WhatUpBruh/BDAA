-- Create deals table
CREATE TABLE public.deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  business text NOT NULL,
  discount text NOT NULL,
  location text NOT NULL,
  valid_until date NOT NULL,
  image text,
  category text,
  description text,
  validation_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create deal_validations table
CREATE TABLE public.deal_validations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id uuid REFERENCES public.deals(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(deal_id, user_id)
);

-- Enable RLS on deals
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- RLS policies for deals
CREATE POLICY "Anyone can view deals"
  ON public.deals FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create deals"
  ON public.deals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own deals"
  ON public.deals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own deals"
  ON public.deals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enable RLS on deal_validations
ALTER TABLE public.deal_validations ENABLE ROW LEVEL SECURITY;

-- RLS policies for deal_validations
CREATE POLICY "Anyone can view validations"
  ON public.deal_validations FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can validate deals"
  ON public.deal_validations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their validations"
  ON public.deal_validations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update validation count
CREATE OR REPLACE FUNCTION update_deal_validation_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.deals
    SET validation_count = validation_count + 1
    WHERE id = NEW.deal_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.deals
    SET validation_count = validation_count - 1
    WHERE id = OLD.deal_id;
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update validation count
CREATE TRIGGER update_deal_validation_count_trigger
AFTER INSERT OR DELETE ON public.deal_validations
FOR EACH ROW
EXECUTE FUNCTION update_deal_validation_count();