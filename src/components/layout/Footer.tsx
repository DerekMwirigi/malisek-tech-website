import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate newsletter subscription
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail('');
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  const categories = [
    { name: 'Smartphones', href: '/category/smartphones' },
    { name: 'Laptops', href: '/category/laptops' },
    { name: 'Tablets', href: '/category/tablets' },
    { name: 'Wearables', href: '/category/wearables' },
    { name: 'Cameras', href: '/category/cameras' },
    { name: 'Office Tech', href: '/category/office' }
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/assets/malisek-logo.jpg" 
                alt="Malisek Tech Solutions" 
                className="h-12 w-auto"
              />
            </div>
            
            <p className="text-sm opacity-80">
              Your trusted partner for premium electronics and technology solutions. 
              We deliver quality products with exceptional customer service.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+254 700 123 456</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@malisektech.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link
                    to={category.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to our newsletter for the latest deals and tech updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-card/50 rounded-lg">
              <h4 className="font-medium text-sm mb-2">🎁 Special Offers</h4>
              <p className="text-xs opacity-80">
                Get exclusive deals and early access to new products!
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-8 opacity-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© 2024 Malisek Tech Solutions Ltd. All rights reserved.</p>
          
          <div className="flex items-center gap-6">
            <span>🔒 Secure Shopping</span>
            <span>🚚 Fast Delivery</span>
            <span>💯 Quality Guaranteed</span>
          </div>
        </div>
      </div>
    </footer>
  );
};