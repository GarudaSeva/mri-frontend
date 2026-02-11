import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Upload, Cpu, FileText, Shield, ArrowRight, CheckCircle2, Users, Zap, Clock, ChevronRight } from "lucide-react";
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

const stats = [
  { value: "95%+", label: "Accuracy Rate" },
  { value: "10K+", label: "Scans Analyzed" },
  { value: "50+", label: "Disease Types" },
  { value: "<30s", label: "Analysis Time" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
            <Brain className="h-6 w-6" />
            MediScan AI
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">How It Works</a>
            <a href="#diagnostics" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Diagnostics</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Get Started <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="AI Medical Technology" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="container relative py-20 md:py-32">
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
                <Link to="/signup">Start Free Diagnosis <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-card/50">
        <div className="container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-serif text-3xl font-bold text-primary md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3">Features</Badge>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Why Choose MediScan AI?</h2>
          <p className="mt-3 text-muted-foreground">
            Combining cutting-edge deep learning with medical expertise to bring you reliable, fast, and secure diagnostics.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="text-center transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-card/50 py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-3">Process</Badge>
            <h2 className="font-serif text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mt-3 text-muted-foreground">
              Three simple steps to get your AI-assisted MRI diagnosis
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <s.icon className="h-7 w-7" />
                </div>
                <span className="font-mono text-xs font-bold text-primary">STEP {s.step}</span>
                <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                {i < steps.length - 1 && (
                  <ChevronRight className="absolute -right-4 top-7 hidden h-6 w-6 text-muted-foreground md:block" />
                )}
              </div>
            ))}
          </div>

          {/* Doctor image section */}
          <div className="mt-16 grid items-center gap-8 md:grid-cols-2">
            <img src={doctorImage} alt="Doctor using AI diagnostics" className="rounded-2xl shadow-lg" />
            <div>
              <h3 className="font-serif text-2xl font-bold">Trusted by Medical Professionals</h3>
              <p className="mt-3 text-muted-foreground">
                Our AI model has been trained on extensive datasets of expert-annotated MRI scans, 
                ensuring reliable and clinically relevant results.
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  "Trained on 50,000+ annotated MRI images",
                  "Validated against clinical diagnostic standards",
                  "Continuous learning and model improvement",
                  "Comprehensive disease information database",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostics / Products */}
      <section id="diagnostics" className="container py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="outline" className="mb-3">Diagnostics</Badge>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Available MRI Diagnostics</h2>
          <p className="mt-3 text-muted-foreground">
            Choose the organ type and upload your MRI for instant AI analysis
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Brain Card */}
          <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
              <img src={brainImage} alt="Brain MRI Scan" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <Badge className="absolute right-3 top-3">Brain</Badge>
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-bold">Brain MRI Diagnosis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Detect brain tumors including Gliomas, Meningiomas, and Pituitary Adenomas. 
                Our AI analyzes structural patterns in brain MRI scans to identify abnormalities 
                with high accuracy.
              </p>
              <ul className="mt-3 space-y-1.5">
                {["Glioma Detection", "Meningioma Identification", "Pituitary Tumor Analysis", "Healthy Brain Confirmation"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-primary" /> {d}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full" asChild>
                <Link to="/signup">Start Brain Detection <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>

          {/* Breast Card */}
          <Card className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-56 overflow-hidden">
              <img src={breastImage} alt="Breast MRI Scan" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
              <Badge className="absolute right-3 top-3">Breast</Badge>
            </div>
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-bold">Breast MRI Diagnosis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Identify breast abnormalities including Invasive Ductal Carcinoma, Fibroadenomas, 
                and Ductal Carcinoma In Situ. Early detection can save lives.
              </p>
              <ul className="mt-3 space-y-1.5">
                {["Invasive Ductal Carcinoma (IDC)", "Fibroadenoma Detection", "DCIS Identification", "Benign vs Malignant Analysis"].map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3 w-3 text-primary" /> {d}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full" asChild>
                <Link to="/signup">Start Breast Detection <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
          <p className="mt-4 text-muted-foreground">
            Create your free account and upload your first MRI scan for an instant AI-assisted diagnosis. 
            No credit card required.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link to="/signup">Create Free Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-10">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2 font-serif text-lg font-bold text-primary">
              <Brain className="h-5 w-5" />
              MediScan AI
            </div>
            <p className="max-w-md text-center text-xs text-muted-foreground">
              <strong>Medical Disclaimer:</strong> This system is for assistance only and is not a replacement 
              for professional medical advice. Always consult a qualified healthcare provider.
            </p>
            <p className="text-xs text-muted-foreground">© 2026 MediScan AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
