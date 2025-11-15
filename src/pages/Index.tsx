import { Navbar } from "@/components/Navbar";
import { MarketplaceCard } from "@/components/MarketplaceCard";
import { DealCard } from "@/components/DealCard";
import { PostDealDialog } from "@/components/PostDealDialog";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Package } from "lucide-react";
import heroBg from "@/assets/osu-campus.png";
import { useDeals } from "@/hooks/useDeals";

const Index = () => {
  const { deals, isLoading, validateDeal, unvalidateDeal, userValidations, isAuthenticated } = useDeals();
  
  // Mock data for marketplace items
  const marketplaceItems = [
    {
      id: 1,
      title: "Calculus Textbook",
      price: "45",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
      category: "Books"
    },
    {
      id: 2,
      title: "Mini Fridge",
      price: "80",
      condition: "Good",
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&h=400&fit=crop",
      category: "Furniture"
    },
    {
      id: 3,
      title: "Gaming Chair",
      price: "120",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=400&fit=crop",
      category: "Furniture"
    },
    {
      id: 4,
      title: "Laptop Stand",
      price: "25",
      condition: "Like New",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      category: "Electronics"
    },
    {
      id: 5,
      title: "Desk Lamp",
      price: "15",
      condition: "Good",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      category: "Furniture"
    },
    {
      id: 6,
      title: "Backpack",
      price: "30",
      condition: "Excellent",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      category: "Accessories"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 min-h-[600px] flex items-center">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.4)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Buy, Sell, Save. Your OSU Hub.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Buy and sell items with other OSU students. Discover exclusive deals around campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8">
                <Search className="mr-2 h-5 w-5" />
                Browse Items
              </Button>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Package className="mr-2 h-5 w-5" />
                Sell Something
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section id="marketplace" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Student Marketplace</h2>
              <p className="text-muted-foreground text-lg">Find great deals on items from fellow students</p>
            </div>
            <Button variant="outline">View All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item) => (
              <MarketplaceCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section id="deals" className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-4xl font-bold mb-2">Campus Deals</h2>
              <p className="text-muted-foreground text-lg">Exclusive discounts for OSU students</p>
            </div>
            <PostDealDialog />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading ? (
              <p className="col-span-full text-center text-muted-foreground">Loading deals...</p>
            ) : deals.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground">No deals yet. Be the first to post one!</p>
            ) : (
              deals.map((deal) => (
                <DealCard
                  key={deal.id}
                  id={deal.id}
                  title={deal.title}
                  business={deal.business}
                  discount={deal.discount}
                  location={deal.location}
                  validUntil={deal.valid_until}
                  image={deal.image}
                  validationCount={deal.validation_count}
                  isValidated={userValidations.includes(deal.id)}
                  onValidate={() => validateDeal(deal.id)}
                  onUnvalidate={() => unvalidateDeal(deal.id)}
                  isAuthenticated={isAuthenticated}
                />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">BuckeDeals</span>
            </div>
            <p className="text-muted-foreground">© 2025 BuckeDeals. For OSU students, by OSU students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
