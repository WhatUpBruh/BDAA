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
        .order("validation_count", { ascending: false });

      if (error) throw error;
      return data as Deal[];
    },
  });

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session;
    },
  });

  const { data: userValidations = [] } = useQuery({
    queryKey: ["userValidations", session?.user?.id],
    queryFn: async () => {
      if (!session?.user?.id) return [];
      const { data, error } = await supabase
        .from("deal_validations")
        .select("deal_id")
        .eq("user_id", session.user.id);

      if (error) throw error;
      return data.map(v => v.deal_id);
    },
    enabled: !!session?.user?.id,
  });

  const validateDeal = useMutation({
    mutationFn: async (dealId: string) => {
      if (!session?.user?.id) {
        throw new Error("You must be logged in to validate deals");
      }

      const { error } = await supabase
        .from("deal_validations")
        .insert({ deal_id: dealId, user_id: session.user.id });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["userValidations"] });
      toast({
        title: "Deal validated!",
        description: "Thanks for helping the community.",
      });
    },
    onError: (error: any) => {
      if (error.message.includes("duplicate")) {
        toast({
          title: "Already validated",
          description: "You've already validated this deal.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    },
  });

  const unvalidateDeal = useMutation({
    mutationFn: async (dealId: string) => {
      if (!session?.user?.id) {
        throw new Error("You must be logged in");
      }

      const { error } = await supabase
        .from("deal_validations")
        .delete()
        .eq("deal_id", dealId)
        .eq("user_id", session.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      queryClient.invalidateQueries({ queryKey: ["userValidations"] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const createDeal = useMutation({
    mutationFn: async (dealData: Omit<Deal, 'id' | 'user_id' | 'validation_count' | 'created_at'>) => {
      if (!session?.user?.id) {
        throw new Error("You must be logged in to create a deal");
      }

      const { error } = await supabase
        .from("deals")
        .insert({
          ...dealData,
          user_id: session.user.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deals"] });
      toast({
        title: "Deal posted!",
        description: "Your deal has been posted to the community",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error posting deal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    deals,
    isLoading,
    validateDeal: validateDeal.mutate,
    unvalidateDeal: unvalidateDeal.mutate,
    createDeal: createDeal.mutate,
    userValidations,
    isAuthenticated: !!session?.user,
  };
};
