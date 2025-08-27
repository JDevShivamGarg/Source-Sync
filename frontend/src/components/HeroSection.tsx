import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-primary/30 rounded-lg animate-float"></div>
      <div className="absolute bottom-32 right-16 w-12 h-12 border border-secondary/30 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 right-10 w-8 h-8 bg-primary/20 rounded-lg animate-glow"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight">
            Never Miss a Moment.
            <br />
            <span className="text-foreground">See What the Anime Cut.</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Source Sync uses AI to compare your favorite anime to its source material,
            revealing every skipped scene and hidden arc.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToDemo}
              className="text-lg px-8 py-4 shadow-primary hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Analyze Your Files Now
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-primary/50 text-primary hover:bg-primary/10"
            >
              <a href="https://youtu.be/xf6M4Cyf7-0" target="_blank" rel="noopener noreferrer">
                Watch Demo
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;