import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    title: "Latest iPhone 15 Pro Max",
    subtitle: "Revolutionary Performance",
    description: "Experience the power of A17 Pro chip with titanium design",
    price: "$1,199",
    originalPrice: "$1,299",
    image: "/api/placeholder/800/600",
    color: "from-slate-900 to-blue-900",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "MacBook Air M3",
    subtitle: "Supercharged Productivity",
    description: "Ultra-thin design meets incredible performance",
    price: "$1,099",
    originalPrice: "$1,199",
    image: "/api/placeholder/800/600",
    color: "from-purple-900 to-indigo-900",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Gaming Setup Sale",
    subtitle: "Up to 40% Off",
    description: "Complete your gaming setup with premium monitors and accessories",
    price: "From $299",
    image: "/api/placeholder/800/600",
    color: "from-green-900 to-teal-900",
    textColor: "text-white"
  }
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div 
      className="relative h-[600px] overflow-hidden rounded-xl"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color}`}
        >
          <div className="container mx-auto px-6 h-full flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
              {/* Content */}
              <motion.div 
                className={`space-y-6 ${slides[currentSlide].textColor}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    {slides[currentSlide].subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl lg:text-6xl font-bold leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl opacity-90 max-w-md"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-4xl font-bold text-primary">
                    {slides[currentSlide].price}
                  </span>
                  {slides[currentSlide].originalPrice && (
                    <span className="text-xl line-through opacity-60">
                      {slides[currentSlide].originalPrice}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex gap-4"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Shop Now
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </motion.div>
              </motion.div>

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 100 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm p-8">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  ⚡ Fast Delivery
                </motion.div>
                
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  🔒 Secure Payment
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};