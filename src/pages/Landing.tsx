import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Upload, Cpu, FileText, Shield, ArrowRight, CheckCircle2, Users, Zap, Clock, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from "@/assets/hero-medical.jpg";
import doctorImage from "@/assets/doctor-ai.jpg";
import brainImage from "@/assets/brain-scan.jpg";
import breastImage from "@/assets/breast-scan.jpg";

const steps = [
  { step: "01", icon: Upload, title: "Upload MRI Scan", description: "Simply drag and drop your MRI image or browse files. We accept JPG, PNG, and JPEG formats." },
  { step: "02", icon: Cpu, title: "AI Analysis", description: "Our advanced deep learning model processes the MRI image in seconds using state-of-the-art classification algorithms." },
  { step: "03", icon: FileText, title: "Get Detailed Report", description: "Receive a comprehensive diagnosis with disease details, causes, precautions, remedies, and treatment guidance." },
];

const features = [
  { icon: Zap, title: "Instant Results", description: "Get AI-powered diagnosis in under 30 seconds with detailed medical insights." },
  { icon: Shield, title: "Secure & Private", description: "Your medical data is encrypted and never shared. Complete privacy guaranteed." },
  { icon: Users, title: "Expert-Backed AI", description: "Our model is trained on thousands of expert-annotated medical images." },
  { icon: Clock, title: "24/7 Available", description: "Access diagnostic tools anytime, anywhere. No appointments needed." },
];


export default function Landing() {
  const { user } = useAuth();
  const detectionPath = user ? "/dashboard" : "/signup";

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="AI Medical Technology" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative py-20 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Cpu className="mr-1 h-3 w-3" /> AI-Powered Medical Diagnostics
            </Badge>
            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Detect Diseases from <span className="text-primary">MRI Scans</span> with AI Precision
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Upload your MRI image and receive an instant, AI-assisted diagnosis with detailed insights 
              on causes, precautions, remedies, and treatment guidance — all in under 30 seconds.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link to={detectionPath}>
                  {user ? "Go to Dashboard" : "Start Free Diagnosis"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-10">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3">Features</Badge>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Why Choose MRI Scan AI?</h2>
          <p className="mt-3 text-muted-foreground">
            Combining cutting-edge deep learning with medical expertise to bring you reliable, fast, and secure diagnostics.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="relative overflow-hidden border-none text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-b from-card to-card/50 rounded-3xl group">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              <CardContent className="pt-10 pb-8 px-6">
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-transform group-hover:rotate-12 group-hover:scale-110">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">{f.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works (Roadmap Style) */}
      <section id="how-it-works" className="bg-card/20 py-24 overflow-hidden">
        <div className="container relative">
          <div className="mx-auto max-w-2xl text-center mb-24">
            <Badge variant="outline" className="mb-3">Process</Badge>
            <h2 className="font-serif text-3xl font-bold md:text-5xl">Diagnostic Journey</h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Simple, transparent, and built for speed
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">
            {/* Center Vertical Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 hidden w-0.5 bg-slate-200 -translate-x-1/2 md:block" />

            <div className="space-y-24 md:space-y-8">
              {steps.map((s, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div key={s.step} className={`relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 ${!isLeft ? 'md:flex-row-reverse' : ''}`}>
                    {/* Icon Circle Symbol (ON THE LINE) */}
                    <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-10 flex h-24 w-24 items-center justify-center rounded-full bg-background border-4 border-slate-100 shadow-2xl transition-transform hover:scale-110 duration-500">
                        <div className="h-16 w-16 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30">
                            <s.icon className="h-8 w-8" />
                        </div>
                        <div className="absolute -top-1 -right-1 h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white border-2 border-background shadow-md">
                            0{i + 1}
                        </div>
                    </div>

                    {/* Content Block (Beside the circle) */}
                    <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? 'md:pr-32 md:items-end md:text-right' : 'md:pl-32 md:items-start md:text-left'} text-center`}>
                        <div className="max-w-md">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{s.title}</h3>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {s.description}
                            </p>
                        </div>
                    </div>

                    {/* Spacer for the other side */}
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expert Info Section */}
          <div className="mt-28 grid items-center gap-16 md:grid-cols-2 max-w-5xl mx-auto px-4">
            <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -left-10 h-32 w-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl" />
                
                <div className="relative group overflow-hidden rounded-[2.5rem] border-8 border-white shadow-2xl">
                    <img src={doctorImage} alt="Expert Medical AI" className="relative h-[350px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-bottom p-8">
                        <div className="mt-auto">
                            <div className="flex items-center gap-2 text-white/90 font-medium mb-1">
                                <Shield className="h-4 w-4" /> HIPAA Compliant
                            </div>
                            <p className="text-white/60 text-xs uppercase tracking-[0.2em]">Verified Secure System</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/10 hover:bg-blue-500/20">Accuracy Benchmarks</Badge>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-[1.1]">Trusted by Clinicians Globally</h3>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed italic">
                "Our AI model delivers expert-level classification by cross-referencing thousands of clinically confirmed datasets."
              </p>
             
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostics / Products */}
      <section id="diagnostics" className="container py-12">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-3">Diagnostics</Badge>
          <h2 className="font-serif text-3xl font-bold md:text-5xl">Available MRI Diagnostics</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Choose the organ type and upload your MRI for instant AI analysis
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Brain Card */}
          <Card className="group overflow-hidden border-none bg-gradient-to-br from-background to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl p-8 text-center flex flex-col items-center border border-slate-100">
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-8 border-background shadow-xl ring-1 ring-primary/10">
                    <img src={brainImage} alt="Brain MRI" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <Badge className="absolute -right-2 top-10 shadow-lg px-4 py-1.5 rounded-full bg-primary text-white border-0">Brain</Badge>
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                    <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Brain MRI Diagnosis</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Identify various brain tumor types and structural abnormalities with precision.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["No Tumor", "Pituitary", "Glioma", "Meningioma", "Other"].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary text-[10px] py-1 px-3 uppercase tracking-wider font-semibold border-primary/10">{tag}</Badge>
                ))}
              </div>
              <Button className="w-full mt-8 h-12 rounded-full text-lg shadow-lg group-hover:scale-[1.02] transition-transform bg-primary" asChild>
                <Link to={user ? "/detect/brain" : "/signup"}>
                  {user ? "Start Detection" : "Sign Up to Start"} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>

          {/* Breast Card */}
          <Card className="group overflow-hidden border-none bg-gradient-to-br from-background to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl p-8 text-center flex flex-col items-center border border-slate-100">
             <div className="relative mb-8">
                <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-2xl group-hover:bg-pink-500/10 transition-all" />
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-8 border-background shadow-xl ring-1 ring-primary/10">
                    <img src={breastImage} alt="Breast MRI" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <Badge className="absolute -right-2 top-10 shadow-lg bg-pink-500 hover:bg-pink-600 px-4 py-1.5 rounded-full text-white border-0">Breast</Badge>
            </div>
            
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-xl">
                    <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900">Breast MRI Diagnosis</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Classify breast tissue findings into benign or malignant categories instantly.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {["Benign", "Malignant"].map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-pink-500/5 text-pink-500 text-[10px] py-1 px-3 uppercase tracking-wider font-semibold border-pink-500/10">{tag}</Badge>
                ))}
              </div>
              <Button className="w-full mt-8 h-12 rounded-full text-lg shadow-lg group-hover:scale-[1.02] transition-transform bg-pink-600 hover:bg-pink-700 text-white border-0" asChild>
                <Link to={user ? "/detect/breast" : "/signup"}>
                  {user ? "Start Detection" : "Sign Up to Start"} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-24">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-4xl font-bold md:text-5xl">Ready to Get Started?</h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Create your free account and upload your first MRI scan for an instant AI-assisted diagnosis. 
            No credit card required.
          </p>
          <Button size="lg" className="mt-10 h-14 px-10 rounded-full text-lg shadow-xl" asChild>
            <Link to={detectionPath}>
              {user ? "Go to Dashboard" : "Create Free Account"} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
