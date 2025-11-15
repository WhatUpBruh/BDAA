import { Button } from "@/components/ui/button";
import { Package, Tag, Menu } from "lucide-react";
import { useState } from "react";
import { PostItemDialog } from "@/components/PostItemDialog";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">BuckeDeals</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#marketplace" className="text-foreground/80 hover:text-primary transition-colors">
              Marketplace
            </a>
            <a href="#deals" className="text-foreground/80 hover:text-primary transition-colors">
              Deals
            </a>
            <PostItemDialog>
              <Button>Post Item</Button>
            </PostItemDialog>
            <Button variant="outline" onClick={() => navigate("/auth")}>Log In</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a
                href="#marketplace"
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Marketplace
              </a>
              <a
                href="#deals"
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Deals
              </a>
              <PostItemDialog>
                <Button className="w-full">Post Item</Button>
              </PostItemDialog>
              <Button variant="outline" className="w-full" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>Log In</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
