import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Globe, TrendingUp } from "lucide-react";

const ProfileVerificationSection = () => {
  const benefits = [
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Protect your organization from credential fraud and identity theft"
    },
    {
      icon: Award,
      title: "Professional Credibility",
      description: "Demonstrate your commitment to hiring qualified professionals"
    },
    {
      icon: Globe,
      title: "Global Compliance",
      description: "Meet international standards for employment verification"
    },
    {
      icon: TrendingUp,
      title: "Improved Hiring",
      description: "Make informed decisions with verified candidate information"
    }
  ];

  return (
    <section className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]">
      {/* Decorative blobs to match other sections */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary border-primary/20 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-primary/10 mb-4">
              Profile Verification Certificate
            </Badge>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6">
              What is <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Profile Verification</span>?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed mb-10">
              A Profile Verification Certificate is a comprehensive document that validates 
              an individual's identity, educational background, employment history, and 
              professional credentials. This certificate serves as proof of authenticity 
              for employers and organizations worldwide.
            </p>
          </div>

          {/* Certificate Preview */}
          <div className="mb-16">
            <Card className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-xl overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-8 lg:p-12">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg">
                      <Shield className="h-10 w-10 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                    Verify Check Profile Verification Certificate
                  </h3>
                  <p className="text-muted-foreground">
                    Official verification document recognized globally
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
                    <div className="text-center rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                      <div className="text-lg font-semibold text-primary">Identity</div>
                      <div className="text-sm text-muted-foreground">Verified ✓</div>
                    </div>
                    <div className="text-center rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                      <div className="text-lg font-semibold text-primary">Education</div>
                      <div className="text-sm text-muted-foreground">Verified ✓</div>
                    </div>
                    <div className="text-center rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                      <div className="text-lg font-semibold text-primary">Employment</div>
                      <div className="text-sm text-muted-foreground">Verified ✓</div>
                    </div>
                    <div className="text-center rounded-lg border border-border/60 bg-background/60 px-4 py-3 shadow-sm">
                      <div className="text-lg font-semibold text-primary">Background</div>
                      <div className="text-sm text-muted-foreground">Verified ✓</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Grid */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">
              Benefits for Organizations & Individuals
            </h3>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 animate-fade-up overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-sky-400 to-indigo-500 flex items-center justify-center shadow-lg flex-shrink-0">
                        <benefit.icon className="h-7 w-7 text-white" />
                      </div>
                      <div className="space-y-2.5">
                        <h4 className="text-lg font-semibold text-foreground">
                          {benefit.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileVerificationSection;