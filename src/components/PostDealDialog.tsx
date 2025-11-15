import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useDeals } from "@/hooks/useDeals";
import { useNavigate } from "react-router-dom";

export const PostDealDialog = () => {
  const [open, setOpen] = useState(false);
  const { createDeal, isAuthenticated } = useDeals();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    business: "",
    discount: "",
    location: "",
    valid_until: "",
    image: "",
    category: "",
    description: "",
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isAuthenticated) {
      navigate("/auth");
      return;
    }
    setOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createDeal(formData);
    setOpen(false);
    setFormData({
      title: "",
      business: "",
      discount: "",
      location: "",
      valid_until: "",
      image: "",
      category: "",
      description: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Post a Deal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Share a Deal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Deal Title*</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., 50% Off All Textbooks"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="business">Business Name*</Label>
            <Input
              id="business"
              required
              value={formData.business}
              onChange={(e) => setFormData({ ...formData, business: e.target.value })}
              placeholder="e.g., Target, Walmart, Local Coffee Shop"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discount">Discount*</Label>
            <Input
              id="discount"
              required
              value={formData.discount}
              onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
              placeholder="e.g., 20% OFF, $5 OFF"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location*</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., High St, Campus Area"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="valid_until">Valid Until*</Label>
            <Input
              id="valid_until"
              type="date"
              required
              value={formData.valid_until}
              onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="e.g., Food, Shopping, Entertainment"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any additional details about this deal..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">Post Deal</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
