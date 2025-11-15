import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketplaceCardProps {
  title: string;
  price: string;
  condition: string;
  image: string;
  category: string;
}

export const MarketplaceCard = ({ title, price, condition, image, category }: MarketplaceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <Badge variant="secondary" className="shrink-0">{category}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">Condition: {condition}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <p className="text-2xl font-bold text-primary">${price}</p>
      </CardFooter>
    </Card>
  );
};
