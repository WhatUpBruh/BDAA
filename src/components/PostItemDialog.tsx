import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface PostItemDialogProps {
  children: React.ReactNode;
}

export const PostItemDialog = ({ children }: PostItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState([7]);
  const [usageDuration, setUsageDuration] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!itemName || !description || !price || !image) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Handle form submission
    toast({
      title: "Item Posted!",
      description: "Your item has been posted to the marketplace",
    });

    // Reset form
    setItemName("");
    setDescription("");
    setCondition([7]);
    setUsageDuration("");
    setPrice("");
    setImage(null);
    setOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post an Item</DialogTitle>
          <DialogDescription>
            Fill in the details about the item you want to sell
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Item Image *</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {image && (
              <p className="text-sm text-muted-foreground">
                Selected: {image.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Item Name *</Label>
            <Input
              id="name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g., MacBook Pro 2020"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your item, its features, and any important details..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">
              Condition: {condition[0]}/10 (New)
            </Label>
            <Slider
              id="condition"
              min={1}
              max={10}
              step={1}
              value={condition}
              onValueChange={setCondition}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              Rate how new your item is (1 = heavily used, 10 = brand new)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="usage">Usage Duration</Label>
            <Input
              id="usage"
              value={usageDuration}
              onChange={(e) => setUsageDuration(e.target.value)}
              placeholder="e.g., 6 months, 2 years"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Post Item
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
