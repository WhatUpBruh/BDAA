import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DealCardProps {
  id: string;
  title: string;
  business: string;
  discount: string;
  location: string;
  validUntil: string;
  image: string | null;
  validationCount: number;
  isValidated: boolean;
  onValidate: () => void;
  onUnvalidate: () => void;
  isAuthenticated: boolean;
}

export const DealCard = ({ 
  id,
  title, 
  business, 
  discount, 
  location, 
  validUntil, 
  image,
  validationCount,
  isValidated,
  onValidate,
  onUnvalidate,
  isAuthenticated
}: DealCardProps) => {
  const navigate = useNavigate();

  const handleValidateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    if (isValidated) {
      onUnvalidate();
    } else {
      onValidate();
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="aspect-video overflow-hidden bg-muted relative">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {discount}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-sm font-medium text-muted-foreground mb-3">{business}</p>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Valid until {new Date(validUntil).toLocaleDateString()}</span>
          </div>
        </div>
        <Button
          variant={isValidated ? "default" : "outline"}
          size="sm"
          className="w-full"
          onClick={handleValidateClick}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          {isValidated ? "Validated" : "Validate"} ({validationCount})
        </Button>
      </CardContent>
    </Card>
  );
};
