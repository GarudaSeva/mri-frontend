import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDiagnoses, DiagnosisRecord } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { User, Calendar, Brain, Heart, AlertTriangle, Shield, Stethoscope, Apple, Pill, FileText } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>([]);

  useEffect(() => {
    if (user) {
      getDiagnoses(user.id).then(setDiagnoses);
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container py-8 md:py-12">
        <div className="mx-auto max-w-4xl">
          {/* User Profile Header */}
          <div className="mb-12 flex flex-col md:flex-row items-center gap-8 justify-center md:justify-start">
             <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 border-4 border-background shadow-xl">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-background flex items-center justify-center shadow-md">
                    <div className="h-5 w-5 rounded-full bg-green-500" />
                </div>
             </div>
             <div className="text-center md:text-left">
                <h1 className="font-serif text-3xl font-bold tracking-tight">{user.fullName}</h1>
                <p className="text-muted-foreground flex items-center gap-2 justify-center md:justify-start">
                    {user.email} • <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {new Date(user.joinedDate).toLocaleDateString()}</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="bg-primary/5 text-primary border-primary/10">Total Scans: {diagnoses.length}</Badge>
                    {/* <Badge variant="secondary" className="bg-blue-500/5 text-blue-600 border-blue-500/10">Premium Member</Badge> */}
                </div>
             </div>
          </div>

          {/* Diagnosis History */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" /> Diagnosis History
            </h2>
          </div>

          {diagnoses.length === 0 ? (
            <Card className="border-dashed py-16">
              <CardContent className="flex flex-col items-center justify-center text-center text-muted-foreground">
                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 opacity-20" />
                </div>
                <p className="text-lg">No diagnoses yet.</p>
                <Button variant="link" onClick={() => window.location.href = '/dashboard'}>Start your first analysis</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
              {diagnoses.map((d) => {
                const OrganIcon = d.organType === "brain" ? Brain : Heart;
                return (
                  <Card key={d.id} className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 border-slate-100">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-4 p-5">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-background shadow-md">
                            <img src={d.imagePath} alt="MRI" className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <OrganIcon className="h-4 w-4 text-primary" />
                            <span className="font-bold truncate text-slate-800">{d.diseaseName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <Badge variant="secondary" className="text-[10px] uppercase px-1.5 py-0 leading-tight h-4">{d.organType}</Badge>
                             <span className="text-[10px] text-muted-foreground">{new Date(d.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedRecord(d)} className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20 px-3">
                           Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Detail Sheet (Side Drawer) */}
      <Sheet open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <SheetContent side="right" className="sm:max-w-xl w-[90%] sm:w-[50%] overflow-y-auto p-0 border-l shadow-2xl">
          {selectedRecord && (
            <div className="flex flex-col min-h-full">
              <SheetHeader className="p-8 pb-4 bg-primary/5 text-left border-b border-primary/10">
                <div className="flex items-center gap-4 mb-3">
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                        {selectedRecord.organType === "brain" ? <Brain className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                    </div>
                    <Badge variant="outline" className="border-primary/20 bg-background/50">
                        {selectedRecord.organType === "brain" ? "Brain MRI" : "Breast MRI"}
                    </Badge>
                </div>
                <SheetTitle className="font-serif text-3xl font-bold text-slate-900 leading-tight">
                    {selectedRecord.diseaseName}
                </SheetTitle>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 pt-1">
                    <Calendar className="h-3.5 w-3.5" /> Analysed on {new Date(selectedRecord.timestamp).toLocaleString()}
                </p>
              </SheetHeader>

              <div className="p-8 space-y-8 flex-1">
                {/* Circular Image Preview */}
                <div className="flex justify-center">
                    <div className="relative h-64 w-64 overflow-hidden rounded-full border-8 border-background shadow-2xl ring-1 ring-primary/20 transition-transform hover:scale-105 duration-500">
                        <img src={selectedRecord.imagePath} alt="MRI" className="h-full w-full object-cover" />
                    </div>
                </div>

                <div className="grid gap-6">
                    <DetailItem icon={AlertTriangle} title="Potential Causes" items={selectedRecord.causes} color="orange" />
                    <DetailItem icon={Shield} title="Safety Precautions" items={selectedRecord.precautions} color="blue" />
                    <DetailItem icon={Stethoscope} title="Remedies & Treatment" items={selectedRecord.remedies} color="green" />
                    <DetailItem icon={Apple} title="Dietary Advice" items={selectedRecord.foodHabits} color="red" />
                    <DetailItem icon={Pill} title="Suggested Medicines" items={selectedRecord.medicines} color="purple" />
                </div>
              </div>

              <div className="p-8 border-t bg-slate-50">
                   <p className="text-xs text-muted-foreground">
                       <strong>Medical Disclaimer:</strong> This AI-generated report is for assistance only. Please verify these findings with a qualified oncologist or neurologist.
                   </p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function DetailItem({ icon: Icon, title, items, color }: { icon: any; title: string; items: string[]; color: string }) {
  const colors = {
    orange: "bg-orange-100 text-orange-600 border-orange-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    green: "bg-green-100 text-green-600 border-green-200",
    red: "bg-red-100 text-red-600 border-red-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200"
  };

  const dotColors = {
    orange: "bg-orange-400",
    blue: "bg-blue-400",
    green: "bg-green-400",
    red: "bg-red-400",
    purple: "bg-purple-400"
  };

  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-3 text-lg font-bold text-slate-800">
        <div className={`p-2 rounded-xl border ${colors[color as keyof typeof colors]}`}>
            <Icon className="h-4 w-4" />
        </div>
        {title}
      </h4>
      <div className="grid gap-2 pl-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm text-slate-600 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${dotColors[color as keyof typeof dotColors]}`} />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
