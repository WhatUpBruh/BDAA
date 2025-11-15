import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useDealValidations = (dealId: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userValidation } = useQuery({
    queryKey: ["deal-validation", dealId],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from("deal_validations")
        .select("*")
        .eq("deal_id", dealId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const toggleValidation = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Must be logged in to validate deals");

      if (userValidation) {
        // Remove validation
        const { error } = await supabase
          .from("deal_validations")
          .delete()
          .eq("id", userValidation.id);

        if (error) throw error;
      } else {
        // Add validation
        const { error } = await supabase
          .from("deal_validations")
          .insert([{ deal_id: dealId, user_id: user.id }]);

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deal-validation", dealId] });
      queryClient.invalidateQueries({ queryKey: ["deals"] });
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
    isValidated: !!userValidation,
    toggleValidation: toggleValidation.mutate,
    isLoading: toggleValidation.isPending,
  };
};
