import { useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { saveDiagnosis, DiagnosisRecord } from "@/lib/auth";
import { getDiseaseDetails, DiagnosisInfo } from "@/lib/diagnosis-data";
import { Upload, Brain, Heart, AlertTriangle, Pill, Apple, Shield, Stethoscope, ChevronLeft, FileImage, X } from "lucide-react";
import { toast } from "sonner";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
    if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
    }
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

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setResult(null);
  }

  const handleAnalyze = async () => {
    if (!imageFile || !user) return;
    setAnalyzing(true);
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      // Simulate progress while uploading/processing
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 500);

      const response = await fetch(`http://localhost:5001/${organType}`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      setProgress(100);
      const data = await response.json();
      
      // Extract label and confidence based on model response format
      let label = "";
      let confidence = 0;

      if (organType === "brain") {
        label = data.prediction_label;
        confidence = Math.round(data.confidence * 100);
      } else {
        // Breast
        label = data.prediction;
        // Find the confidence for the predicted class
        const score = data.confidence_scores[label] || 0;
        confidence = Math.round(score * 100);
      }

      const diagnosisDetails = getDiseaseDetails(organType, label);
      
      // Merge API result with rich data
      const finalResult: DiagnosisInfo = {
        ...diagnosisDetails,
        diseaseName: label, // Use API label or mapped name? user might prefer mapped name if available
        confidence: confidence
      };

      setResult(finalResult);

      const record: DiagnosisRecord = {
        id: crypto.randomUUID(),
        userId: user.id,
        organType,
        imagePath: imagePreview || "",
        diseaseName: finalResult.diseaseName,
        confidence: finalResult.confidence,
        causes: finalResult.causes || [],
        precautions: finalResult.precautions || [],
        remedies: finalResult.remedies || [],
        foodHabits: finalResult.foodHabits || [],
        medicines: finalResult.medicines || [],
        timestamp: new Date().toISOString(),
      };
      
      await saveDiagnosis(record);
      toast.success("Analysis complete");

    } catch (error: any) {
      console.error("Error analyzing image:", error);
      toast.error(error.message || "Failed to analyze image. Please try again.");
      setProgress(0);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8 md:py-12">
        <Button 
          variant="ghost" 
          className="mb-8 text-muted-foreground hover:text-foreground hover:bg-transparent p-0" 
          onClick={() => navigate("/dashboard")}
        >
          <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
        </Button>

        <div className="mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center justify-center text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 shadow-sm border border-primary/20">
              <OrganIcon className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight">{organLabel} MRI Detection</h1>
            <p className="mt-3 max-w-lg text-muted-foreground text-lg">
              Advanced AI-powered analysis for fast and accurate medical insights.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-10">
            {/* Upload & Preview Section */}
            <div className="flex flex-col items-center w-full max-w-md">
              {!imagePreview ? (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/25 bg-muted/5 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <label className="flex h-full w-full flex-col items-center justify-center cursor-pointer">
                    <div className="mb-4 rounded-full bg-background p-5 shadow-sm transition-transform group-hover:scale-110">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Upload MRI Scan</h3>
                    <p className="mt-2 text-sm text-muted-foreground text-center px-6">
                      Drag and drop your image here, or <span className="text-primary font-medium">browse files</span>
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/jpg"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                    />
                  </label>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-8 w-full animate-in zoom-in-95 duration-300">
                  {/* Circular Preview */}
                  <div className="relative h-64 w-64 md:h-80 md:w-80 overflow-hidden rounded-full border-8 border-background shadow-2xl ring-1 ring-primary/20">
                    <img 
                      src={imagePreview} 
                      alt="MRI Preview" 
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-500" 
                    />
                  </div>

                  {/* Buttons Side by Side */}
                  {!result && (
                    <div className="flex w-full gap-4">
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="flex-1 rounded-full border-2" 
                        onClick={removeImage}
                        disabled={analyzing}
                      >
                         Change Image
                      </Button>
                      <Button 
                        size="lg" 
                        className="flex-1 rounded-full shadow-lg shadow-primary/20" 
                        onClick={handleAnalyze} 
                        disabled={analyzing}
                      >
                        {analyzing ? (
                          <span className="flex items-center gap-2">
                            Analyzing... 
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Stethoscope className="h-5 w-5" /> Submit Scan
                          </span>
                        )}
                      </Button>
                    </div>
                  )}

                  {analyzing && (
                    <div className="w-full space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-primary">Processing Image...</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-3 rounded-full overflow-hidden bg-primary/10" />
                    </div>
                  )}
                  
                  {result && (
                     <Button 
                        variant="outline" 
                        className="rounded-full px-8" 
                        onClick={removeImage}
                     >
                        Upload Another Scan
                     </Button>
                  )}
                </div>
              )}
            </div>

            {/* Results Section */}
            {result && (
              <div className="w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <Card className="border-none bg-primary/5 shadow-none overflow-hidden">
                        <CardHeader className="pb-2 text-center relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Brain className="h-24 w-24" />
                            </div>
                            <CardTitle className="font-serif text-3xl font-bold text-primary">{result.diseaseName}</CardTitle>
                            <CardDescription className="text-base">Primary Detection Label</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center pb-8">
                            <div className="relative flex items-center justify-center p-4">
                                <svg className="h-24 w-24 -rotate-90 transform">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-primary/10"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 * (1 - result.confidence / 100)}
                                        className="text-primary transition-all duration-1000 ease-out"
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute text-2xl font-bold">{result.confidence}%</span>
                            </div>
                            <Badge variant="outline" className="mt-2 bg-background/50 backdrop-blur-sm border-primary/20">
                                Confidence Score
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card className="border-none bg-orange-500/5 shadow-none flex flex-col items-center justify-center p-6 text-center">
                         <div className="mb-4 rounded-full bg-orange-500/10 p-4">
                            <AlertTriangle className="h-8 w-8 text-orange-500" />
                         </div>
                         <h4 className="text-lg font-bold text-orange-700">Medical Notice</h4>
                         <p className="mt-2 text-sm text-orange-600/80">
                            The analysis is generated by AI models and should be verified by a medical professional. This is not a final diagnosis.
                         </p>
                    </Card>
                </div>

                <Accordion type="single" collapsible className="space-y-4 w-full border-none">
                  <AccordionItem value="causes" className="border rounded-2xl px-6 bg-card shadow-sm border-slate-100 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-orange-100 p-2.5">
                            <AlertTriangle className="h-5 w-5 text-orange-600"/>
                        </div>
                        <span className="text-lg font-semibold text-slate-800">Potential Causes</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <div className="grid gap-3 sm:grid-cols-2">
                        {result.causes.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="precautions" className="border rounded-2xl px-6 bg-card shadow-sm border-slate-100 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-blue-100 p-2.5">
                            <Shield className="h-5 w-5 text-blue-600"/>
                        </div>
                        <span className="text-lg font-semibold text-slate-800">Safety Precautions</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                       <div className="grid gap-3 sm:grid-cols-2">
                        {result.precautions.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="remedies" className="border rounded-2xl px-6 bg-card shadow-sm border-slate-100 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-green-100 p-2.5">
                            <Stethoscope className="h-5 w-5 text-green-600"/>
                        </div>
                        <span className="text-lg font-semibold text-slate-800">Remedies & Treatment</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                       <div className="grid gap-3 sm:grid-cols-2">
                        {result.remedies.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="diet" className="border rounded-2xl px-6 bg-card shadow-sm border-slate-100 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-red-100 p-2.5">
                            <Apple className="h-5 w-5 text-red-600"/>
                        </div>
                        <span className="text-lg font-semibold text-slate-800">Dietary Recommendations</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                       <div className="grid gap-3 sm:grid-cols-2">
                        {result.foodHabits.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="medicines" className="border rounded-2xl px-6 bg-card shadow-sm border-slate-100 overflow-hidden">
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className="rounded-xl bg-purple-100 p-2.5">
                            <Pill className="h-5 w-5 text-purple-600"/>
                        </div>
                        <span className="text-lg font-semibold text-slate-800">Suggested Medication</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <p className="mb-4 text-xs font-bold uppercase tracking-wider text-purple-600 px-3">Consult your physician before use</p>
                       <div className="grid gap-3 sm:grid-cols-2">
                        {result.medicines.map((c, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 border border-slate-100/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                            {c}
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
