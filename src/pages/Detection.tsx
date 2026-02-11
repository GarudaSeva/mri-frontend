import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { saveDiagnosis, DiagnosisRecord } from "@/lib/auth";
import { getMockDiagnosis, DiagnosisInfo } from "@/lib/diagnosis-data";
import { Upload, Brain, Heart, AlertTriangle, Pill, Apple, Shield, Stethoscope, ChevronLeft } from "lucide-react";

export default function Detection() {
  const { organ } = useParams<{ organ: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<DiagnosisInfo | null>(null);

  const organType = organ as "brain" | "breast";
  const OrganIcon = organType === "brain" ? Brain : Heart;
  const organLabel = organType === "brain" ? "Brain" : "Breast";

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setImageFile(file);
    setResult(null);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleAnalyze = async () => {
    if (!imageFile || !user) return;
    setAnalyzing(true);
    setProgress(0);

    // Simulate analysis
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }

    const diagnosis = getMockDiagnosis(organType);
    setResult(diagnosis);

    const record: DiagnosisRecord = {
      id: crypto.randomUUID(),
      userId: user.id,
      organType,
      imagePath: imagePreview || "",
      diseaseName: diagnosis.diseaseName,
      confidence: diagnosis.confidence,
      causes: diagnosis.causes,
      precautions: diagnosis.precautions,
      remedies: diagnosis.remedies,
      foodHabits: diagnosis.foodHabits,
      medicines: diagnosis.medicines,
      timestamp: new Date().toISOString(),
    };
    saveDiagnosis(record);
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <Button variant="ghost" className="mb-4" onClick={() => navigate("/")}>
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Home
        </Button>

        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <OrganIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold">{organLabel} MRI Detection</h1>
              <p className="text-sm text-muted-foreground">Upload an MRI image for AI-assisted analysis</p>
            </div>
          </div>

          {/* Upload Area */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 text-center transition-colors hover:border-primary/50"
              >
                {imagePreview ? (
                  <img src={imagePreview} alt="MRI Preview" className="mb-4 max-h-64 rounded-lg object-contain" />
                ) : (
                  <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                )}
                <p className="mb-2 font-medium">{imagePreview ? "Image loaded" : "Drag & drop your MRI image here"}</p>
                <p className="mb-4 text-sm text-muted-foreground">Supports JPG, PNG, JPEG</p>
                <label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/jpg"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  />
                  <Button variant="outline" asChild>
                    <span>Browse Files</span>
                  </Button>
                </label>
              </div>

              {imageFile && !analyzing && !result && (
                <Button className="mt-4 w-full" onClick={handleAnalyze}>
                  <Stethoscope className="mr-2 h-4 w-4" /> Analyze MRI Image
                </Button>
              )}

              {analyzing && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Analyzing MRI scan...</p>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          {result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-serif text-xl">{result.diseaseName}</CardTitle>
                    <Badge variant="secondary">{result.confidence}% Confidence</Badge>
                  </div>
                  <CardDescription>AI-assisted diagnosis result</CardDescription>
                </CardHeader>
              </Card>

              <ResultSection icon={AlertTriangle} title="Causes" items={result.causes} />
              <ResultSection icon={Shield} title="Precautions" items={result.precautions} />
              <ResultSection icon={Stethoscope} title="Remedies & Treatment" items={result.remedies} />
              <ResultSection icon={Apple} title="Recommended Food Habits" items={result.foodHabits} />
              <ResultSection icon={Pill} title="Medicines (General Guidance)" items={result.medicines} />

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 text-sm text-muted-foreground">
                  <strong>Disclaimer:</strong> This is an AI-assisted analysis for informational purposes only. Please consult a qualified healthcare professional for accurate diagnosis and treatment.
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ResultSection({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <Icon className="h-4 w-4 text-primary" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
