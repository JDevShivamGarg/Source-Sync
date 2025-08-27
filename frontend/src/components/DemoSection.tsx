import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle, Download, TrendingDown, Users, Heart, Zap, BookOpen, Crown, Star } from "lucide-react";

const DemoSection = () => {
  const [srtFile, setSrtFile] = useState(null);
  const [txtFile, setTxtFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);

  const getCategoryIcon = (title) => {
    const iconMap = {
      "Character Development": Users,
      "World Building": Crown,
      "Side Character Arcs": Heart,
      "Romantic Subplots": Heart,
      "Action Sequences": Zap,
      "Political Context": Crown,
      "Backstory": BookOpen,
      "Internal Monologue": Users,
      "World Context": Crown,
      "Character Backstory": Users,
      "Romance": Heart,
      "Action": Zap,
      "Politics": Crown,
      "Dialogue": Users,
      "Narrative": BookOpen
    };
    
    // Find matching icon or use default
    const IconComponent = Object.entries(iconMap).find(([key]) => 
      title.toLowerCase().includes(key.toLowerCase())
    )?.[1] || Star;
    
    return IconComponent;
  };

  const handleAnalyze = async () => {
    if (!srtFile || !txtFile) return;

    setIsLoading(true);
    setReport(null);
    setError(null);

    const formData = new FormData();
    formData.append("subtitle_file", srtFile);
    formData.append("source_file", txtFile);

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occurred on the backend.");
      }

      setReport(data);

    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Try It <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Now</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Upload your files and see the magic happen
          </p>
        </div>

        <div className="gradient-card rounded-3xl p-8 shadow-card border border-primary/20">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* SRT File Upload */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-foreground">Anime Subtitles (.srt)</label>
              <div className="relative">
                <input type="file" accept=".srt" onChange={(e) => setSrtFile(e.target.files[0])} className="hidden" id="srt-upload" />
                <label htmlFor="srt-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-primary/30 rounded-xl hover:border-primary/60 transition-colors cursor-pointer group">
                  {srtFile ? (
                    <div className="text-center"><CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" /><span className="text-primary font-medium">{srtFile.name}</span></div>
                  ) : (
                    <div className="text-center"><Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-2" /><span className="text-muted-foreground group-hover:text-foreground transition-colors">Click to upload subtitle file</span></div>
                  )}
                </label>
              </div>
            </div>

            {/* TXT File Upload */}
            <div className="space-y-4">
              <label className="block text-lg font-semibold text-foreground">Source Material (.txt)</label>
              <div className="relative">
                <input type="file" accept=".txt" onChange={(e) => setTxtFile(e.target.files[0])} className="hidden" id="txt-upload" />
                <label htmlFor="txt-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-secondary/30 rounded-xl hover:border-secondary/60 transition-colors cursor-pointer group">
                  {txtFile ? (
                    <div className="text-center"><CheckCircle className="w-8 h-8 text-secondary mx-auto mb-2" /><span className="text-secondary font-medium">{txtFile.name}</span></div>
                  ) : (
                    <div className="text-center"><FileText className="w-8 h-8 text-muted-foreground group-hover:text-secondary transition-colors mx-auto mb-2" /><span className="text-muted-foreground group-hover:text-foreground transition-colors">Click to upload source text</span></div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <div className="text-center mb-8">
            <Button variant="hero" size="lg" onClick={handleAnalyze} disabled={!srtFile || !txtFile || isLoading} className="px-12 py-4 text-lg">
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin mr-2" />Analyzing... Please Wait</>
              ) : ("Generate Report")}
            </Button>
          </div>

          {/* Error Message Display */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center text-destructive">
                <AlertCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {report && (
            <div className="border-t border-primary/20 pt-8 animate-slide-up">
              {/* Results Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {report.summary || "Analysis Complete"}
                </h3>
                <p className="text-lg text-muted-foreground">
                  Discovered {report.categories?.length || 0} areas of difference
                </p>
              </div>

              {/* Summary Stats */}
              {report.categories && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                  <div className="text-center p-4 bg-background/30 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-primary">
                      {report.categories.reduce((sum, cat) => sum + (cat.missing || 0), 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Missing</div>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-secondary">
                      {report.categories.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-accent">
                      {Math.round((report.categories.reduce((sum, cat) => sum + (cat.missing || 0), 0) / Math.max(report.categories.length, 1)) * 10) / 10}
                    </div>
                    <div className="text-sm text-muted-foreground">Avg per Category</div>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-xl border border-primary/10">
                    <div className="text-2xl font-bold text-foreground">
                      {Math.max(...(report.categories.map(cat => cat.missing || 0)))}
                    </div>
                    <div className="text-sm text-muted-foreground">Highest Impact</div>
                  </div>
                </div>
              )}

              {/* Category Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {report.categories?.map((category, index) => {
                  const IconComponent = getCategoryIcon(category.title);
                  const missingCount = category.missing || 0;
                  const severity = missingCount > 5 ? 'high' : missingCount > 2 ? 'medium' : 'low';
                  
                  return (
                    <div key={index} className="group bg-gradient-to-br from-background/80 to-background/40 rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 rounded-xl ${
                          severity === 'high' ? 'bg-destructive/20 text-destructive' :
                          severity === 'medium' ? 'bg-secondary/20 text-secondary' :
                          'bg-primary/20 text-primary'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {category.title}
                            </h4>
                            {missingCount > 0 && (
                              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                                severity === 'high' ? 'bg-destructive/30 text-destructive' :
                                severity === 'medium' ? 'bg-secondary/30 text-secondary' :
                                'bg-primary/30 text-primary'
                              }`}>
                                {missingCount} missing
                              </div>
                            )}
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Severity indicator bar */}
                      <div className="w-full bg-muted/30 rounded-full h-1.5 mb-2">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            severity === 'high' ? 'bg-destructive' :
                            severity === 'medium' ? 'bg-secondary' :
                            'bg-primary'
                          }`}
                          style={{ width: `${Math.min((missingCount / 10) * 100, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Impact: <span className="capitalize font-medium">{severity}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 border-t border-primary/10">
                <Button 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary/10 px-8"
                  onClick={() => {
                    // Create downloadable report
                    const reportText = `Analysis Report\n\n${report.summary}\n\n${report.categories?.map(cat => 
                      `${cat.title}: ${cat.missing || 0} missing\n${cat.description}`
                    ).join('\n\n')}`;
                    const blob = new Blob([reportText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'source-sync-report.txt';
                    a.click();
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setReport(null);
                    setSrtFile(null);
                    setTxtFile(null);
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Analyze Another Pair
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DemoSection;