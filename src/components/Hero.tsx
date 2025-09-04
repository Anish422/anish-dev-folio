import { motion } from "framer-motion";
import { ArrowDown, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { Link } from "react-router-dom";
import headshotImage from "@/assets/headshot.jpg";
import { useState, useEffect } from "react";

export function Hero() {
  const [currentEffect, setCurrentEffect] = useState(0);
  
  // Cycle through different visual effects every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEffect((prev) => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    // Link to main resume - will be updated when actual PDFs are added
    const link = document.createElement('a');
    link.href = '/assets/resume/Anish Shah - Software Resume.pdf';
    link.download = 'Anish Shah - Resume.pdf';
    link.click();
  };

  const getImageEffects = (effectIndex: number) => {
    const effects = [
      // Original - clean professional look
      {
        filter: "brightness(1) contrast(1) saturate(1) hue-rotate(0deg)",
        scale: 1,
        rotate: 0,
        borderColor: "border-primary/30"
      },
      // Tech blue - cool coding vibe
      {
        filter: "brightness(1.1) contrast(1.2) saturate(1.3) hue-rotate(200deg)",
        scale: 1.05,
        rotate: 2,
        borderColor: "border-blue-400/50"
      },
      // Warm orange - creative energy
      {
        filter: "brightness(1.2) contrast(1.1) saturate(1.4) hue-rotate(30deg)",
        scale: 0.95,
        rotate: -3,
        borderColor: "border-orange-400/50"
      },
      // High contrast - bold professional
      {
        filter: "brightness(1.3) contrast(1.5) saturate(0.8) hue-rotate(0deg)",
        scale: 1.1,
        rotate: 1,
        borderColor: "border-accent/60"
      },
      // Subtle desaturated - minimalist
      {
        filter: "brightness(0.9) contrast(1.3) saturate(0.6) hue-rotate(270deg)",
        scale: 1,
        rotate: -1,
        borderColor: "border-muted-foreground/40"
      }
    ];
    return effects[effectIndex];
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.p 
              className="text-sm md:text-base font-medium text-primary mb-4 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Welcome to my portfolio
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {profile.heroTitle.split('—').map((part, index) => (
                <span key={index} className={index === 1 ? "gradient-text block" : "block"}>
                  {part.trim()}
                  {index === 0 && "—"}
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {profile.heroSubtitle}
            </motion.p>
          </motion.div>

          {/* Animated Profile Picture */}
          <motion.div
            className="mb-12 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div 
              className="relative"
              animate={{ 
                scale: getImageEffects(currentEffect).scale,
                rotate: getImageEffects(currentEffect).rotate
              }}
              transition={{ 
                duration: 1.5, 
                ease: "easeInOut",
                type: "spring",
                stiffness: 100
              }}
            >
              {/* Animated border ring */}
              <motion.div
                className={`absolute inset-0 rounded-full border-4 ${getImageEffects(currentEffect).borderColor} blur-sm`}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main profile image */}
              <motion.img
                src={headshotImage}
                alt="Anish Shah - Profile"
                className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-2xl relative z-10"
                style={{
                  filter: getImageEffects(currentEffect).filter
                }}
                animate={{ 
                  filter: getImageEffects(currentEffect).filter
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              />
              
              {/* Floating animation dots */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Button size="lg" className="btn-primary" asChild>
              <Link to="/projects" className="inline-flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Projects
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={handleDownloadResume}
              className="group"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce-subtle" />
              Download Resume
            </Button>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {profile.metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="metric-card"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {metric.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}