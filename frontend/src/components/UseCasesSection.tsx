import { Video, Users, BookMarked } from "lucide-react";

const useCases = [
  {
    icon: Video,
    title: "Content Creators",
    subtitle: "Fuel your next YouTube video",
    description: "Get accurate data for 'Manga vs. Anime' comparison videos. No more spending hours manually checking differences.",
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Users,
    title: "Passionate Fans",
    subtitle: "Settle debates with friends", 
    description: "Finally have concrete evidence about what was cut or changed. Share detailed analysis with your community.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: BookMarked,
    title: "New Readers",
    subtitle: "Decide if the manga is worth reading",
    description: "See exactly what extra content awaits in the source material before committing to reading it.",
    gradient: "from-green-500 to-teal-500"
  }
];

const UseCasesSection = () => {
  return (
    <section className="py-24 px-6 gradient-hero">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            For the Fans, <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">By the Fans</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're creating content, settling debates, or exploring new stories, 
            Source Sync has you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="group relative overflow-hidden">
              {/* Card */}
              <div className="relative gradient-card rounded-2xl p-8 shadow-card border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-primary h-full">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-r ${useCase.gradient} opacity-20 rounded-xl blur-sm group-hover:opacity-30 transition-opacity`}></div>
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-xl bg-background/50 backdrop-blur-sm">
                    <useCase.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {useCase.title}
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  {useCase.subtitle}
                </p>
                
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>

                {/* Hover Effect Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="gradient-card rounded-2xl p-8 border border-primary/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to discover what you've been missing?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of fans who are already using Source Sync to enhance their anime and manga experience.
            </p>
            <button 
              onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              Start Your Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;