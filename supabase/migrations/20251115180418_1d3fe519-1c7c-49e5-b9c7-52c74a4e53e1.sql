-- Update function to have proper search_path
CREATE OR REPLACE FUNCTION update_deal_validation_count()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
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
$$;