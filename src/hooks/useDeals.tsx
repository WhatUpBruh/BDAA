import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Deal {
  id: string;
  user_id: string;
  title: string;
  business: string;
  discount: string;
  location: string;
  valid_until: string;
  image: string | null;
  category: string | null;
  description: string | null;
  validation_count: number;
  created_at: string;
}

export const useDeals = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: deals = [], isLoading } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*")
        .order("validation_count", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Deal[];
    },
  });

  const createDeal = useMutation({
    mutationFn: async (newDeal: Omit<Deal, "id" | "user_id" | "created_at" | "validation_count">) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Must be logged in to post deals");

      const { data, error } = await supabase
        .from("deals")
        .insert([{ ...newDeal, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast({
        title: "Deal posted!",
        description: "Your deal has been shared with the community.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    deals,
    isLoading,
    createDeal: createDeal.mutate,
  };
};
