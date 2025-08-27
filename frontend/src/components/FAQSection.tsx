import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Is this free to use?",
    answer: "Yes, Source Sync is free for analyzing files up to a certain size. We offer premium plans for larger files and advanced features like batch processing and detailed export options."
  },
  {
    question: "What file formats are supported?",
    answer: "We currently support .srt files for subtitles and .txt files for the source material. We're working on adding support for .ass, .vtt subtitle formats and .epub, .pdf for source materials."
  },
  {
    question: "How does the AI work?",
    answer: "We use advanced embedding models and large language models like Google's Gemini to understand the context and narrative structure of the text, not just the words. This allows us to find semantic matches even when the wording differs significantly."
  },
  {
    question: "How accurate are the results?",
    answer: "Our AI achieves over 90% accuracy in identifying corresponding scenes and content. The system is continuously learning and improving with each analysis to provide even better results."
  },
  // {
  //   question: "Can I analyze multiple episodes at once?", 
  //   answer: "Yes! Premium users can upload multiple subtitle files and source chapters for batch analysis. This is perfect for content creators analyzing entire seasons or story arcs."
  // },
  {
    question: "What languages are supported?",
    answer: "Currently, we support English only. We're actively working on expanding language support based on user demand."
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Source Sync
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="gradient-card rounded-2xl border border-primary/20 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-primary/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-primary" />
                  ) : (
                    <Plus className="w-5 h-5 text-primary" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-6 animate-slide-up">
                  <div className="border-t border-primary/10 pt-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have a question that's not answered here?
          </p>
              <a 
            href="mailto:sourcesyncsupp@gmail.com?subject=Support%20Request" 
            className="text-primary hover:text-primary-glow font-medium underline underline-offset-4 transition-colors"
            target="_self"
          >
            Contact our support team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;