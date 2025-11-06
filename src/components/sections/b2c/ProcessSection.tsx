import { Card, CardContent } from "@/components/ui/card";

const ProcessSection = () => {

  return (
    <section id="process" className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_60%)]">
      {/* Decorative blobs to match other sections */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-3xl" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500">Verification</span> Process
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground/90 max-w-2xl mx-auto">
            A systematic 5‑step approach ensuring accuracy, security, and reliability in every verification certificate we issue.
          </p>
        </div>

        {/* Illustrated Overview (quick glance) */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Data Collection */}
            <Card className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl overflow-hidden animate-fade-up">
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/30">
                    <img
                      src="/images/process/data-collection.png"
                      alt="Data collection via secure portal and OTP"
                      className="w-full h-full object-contain p-6"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Data Collection</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Submit your IDs, education and work proofs securely through our encrypted portal.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: Cross‑Referencing */}
            <Card className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl overflow-hidden animate-fade-up" style={{animationDelay: '0.1s'}}>
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/30">
                    <img
                      src="/images/process/cross-referencing.png"
                      alt="Cross referencing with trusted databases and institutions"
                      className="w-full h-full object-contain p-6"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Cross‑Referencing</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We match your info against universities, employers, and government records.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Verification */}
            <Card className="relative border border-border/60 ring-1 ring-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/70 rounded-xl shadow-md hover:shadow-xl overflow-hidden animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted/30">
                    <img
                      src="/images/process/verification.png"
                      alt="Final verification on mobile with secure padlock"
                      className="w-full h-full object-contain p-6"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Verification</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Experts validate authenticity. Receive your signed, QR‑secure certificate.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;