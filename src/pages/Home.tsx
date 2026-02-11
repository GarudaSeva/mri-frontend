import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, AlertTriangle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";
import brainImage from "@/assets/brain-scan.jpg";
import breastImage from "@/assets/breast-scan.jpg";

const organs = [
  {
    id: "brain",
    title: "Brain MRI Diagnosis",
    description: "Detect brain tumors, gliomas, meningiomas, and other neurological conditions from MRI scans using our advanced deep learning model.",
    icon: Brain,
    image: brainImage,
    route: "/detect/brain",
    diseases: ["Glioma Tumor", "Meningioma", "Pituitary Adenoma"],
    accuracy: "95.2%",
    scans: "5,200+",
  },
  {
    id: "breast",
    title: "Breast MRI Diagnosis",
    description: "Identify breast abnormalities including carcinomas, fibroadenomas, and DCIS from MRI images. Early detection saves lives.",
    icon: Heart,
    image: breastImage,
    route: "/detect/breast",
    diseases: ["Invasive Ductal Carcinoma", "Fibroadenoma", "DCIS"],
    accuracy: "93.8%",
    scans: "4,800+",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="mr-1 h-3 w-3" /> Select Diagnostic Module
          </Badge>
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            AI-Powered <span className="text-primary">MRI Diagnostics</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose an organ type below and upload your MRI scan for an instant AI-assisted analysis with detailed insights.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {organs.map((organ) => (
            <Card
              key={organ.id}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
              onClick={() => navigate(organ.route)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={organ.image}
                  alt={`${organ.title} illustration`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <Badge variant="secondary">{organ.accuracy} Accuracy</Badge>
                  <Badge variant="outline" className="bg-card/80">{organ.scans} Scans</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <organ.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="font-serif text-xl">{organ.title}</CardTitle>
                </div>
                <CardDescription className="text-sm">{organ.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detectable Conditions</p>
                  <ul className="space-y-1.5">
                    {organ.diseases.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button className="w-full">
                  Start Detection <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mx-auto mt-12 max-w-5xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This system is for assistance only and is not a replacement for professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
