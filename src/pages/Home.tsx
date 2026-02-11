import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Heart, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Navbar } from "@/components/Navbar";

const organs = [
  {
    id: "brain",
    title: "Brain MRI Diagnosis",
    description: "Detect brain tumors, gliomas, meningiomas, and other neurological conditions from MRI scans.",
    icon: Brain,
    route: "/detect/brain",
  },
  {
    id: "breast",
    title: "Breast MRI Diagnosis",
    description: "Identify breast abnormalities including carcinomas, fibroadenomas, and other conditions from MRI images.",
    icon: Heart,
    route: "/detect/breast",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
            AI-Powered <span className="text-primary">MRI Diagnostics</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Upload your MRI scan and receive an instant AI-assisted analysis with detailed insights.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {organs.map((organ) => (
            <Card
              key={organ.id}
              className="group cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1"
              onClick={() => navigate(organ.route)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <organ.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl">{organ.title}</CardTitle>
                <CardDescription className="text-sm">{organ.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button>Start Detection</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="mx-auto mt-12 max-w-4xl">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Medical Disclaimer:</strong> This system is for assistance only and is not a replacement for professional medical advice. Always consult a qualified healthcare provider for diagnosis and treatment.
          </AlertDescription>
        </Alert>
      </main>
    </div>
  );
}
