import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Button asChild size="lg" className="btn-primary">
            <a href="/">Return Home</a>
          </Button>
          <div className="text-sm text-muted-foreground">
            <p>Looking for something specific? Try:</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="/projects">Projects</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/experience">Experience</a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="/contact">Contact</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
