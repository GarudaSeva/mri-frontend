import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getDiagnoses, DiagnosisRecord } from "@/lib/auth";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, Calendar, Brain, Heart, AlertTriangle, Shield, Stethoscope, Apple, Pill } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [selectedRecord, setSelectedRecord] = useState<DiagnosisRecord | null>(null);

  if (!user) return null;

  const diagnoses = getDiagnoses(user.id);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-8">
        <div className="mx-auto max-w-3xl">
          {/* User Info */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <CardTitle className="font-serif text-xl">{user.fullName}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Joined {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Diagnosis History */}
          <h2 className="mb-4 font-serif text-xl font-semibold">Diagnosis History</h2>
          {diagnoses.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No diagnoses yet. Upload an MRI to get started.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {diagnoses.map((d) => {
                const OrganIcon = d.organType === "brain" ? Brain : Heart;
                return (
                  <Card key={d.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="flex items-center gap-4 p-4">
                      {d.imagePath && (
                        <img src={d.imagePath} alt="MRI" className="h-16 w-16 rounded-lg object-cover" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <OrganIcon className="h-4 w-4 text-primary" />
                          <span className="font-medium">{d.diseaseName}</span>
                          <Badge variant="outline" className="text-xs capitalize">{d.organType}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(d.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => setSelectedRecord(d)}>
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRecord} onOpenChange={() => setSelectedRecord(null)}>
        <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
          {selectedRecord && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif">{selectedRecord.diseaseName}</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {selectedRecord.organType === "brain" ? "Brain" : "Breast"} MRI • {new Date(selectedRecord.timestamp).toLocaleString()}
                </p>
              </DialogHeader>
              <div className="space-y-4">
                {selectedRecord.imagePath && (
                  <img src={selectedRecord.imagePath} alt="MRI" className="w-full rounded-lg object-contain" />
                )}
                <DetailSection icon={AlertTriangle} title="Causes" items={selectedRecord.causes} />
                <DetailSection icon={Shield} title="Precautions" items={selectedRecord.precautions} />
                <DetailSection icon={Stethoscope} title="Remedies" items={selectedRecord.remedies} />
                <DetailSection icon={Apple} title="Food Habits" items={selectedRecord.foodHabits} />
                <DetailSection icon={Pill} title="Medicines" items={selectedRecord.medicines} />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailSection({ icon: Icon, title, items }: { icon: any; title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
        <Icon className="h-3.5 w-3.5 text-primary" /> {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
