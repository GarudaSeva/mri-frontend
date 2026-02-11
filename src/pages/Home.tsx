import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, AlertTriangle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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

        <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
          {organs.map((organ) => (
            <div
              key={organ.id}
              className="group relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border bg-card p-8 text-center transition-all hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
              onClick={() => navigate(organ.route)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative mb-6 h-40 w-40 overflow-hidden rounded-full border-4 border-background shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:border-primary/20">
                <img
                  src={organ.image}
                  alt={organ.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative z-10 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold tracking-tight">{organ.title}</h3>
                  <p className="mx-auto max-w-[250px] text-sm text-muted-foreground">
                    {organ.id === "brain" ? "Advanced tumor detection & classification" : "Early stage breast cancer screening"}
                  </p>
                </div>

                <Button className="w-full min-w-[200px] rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                  Start Analysis <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
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
