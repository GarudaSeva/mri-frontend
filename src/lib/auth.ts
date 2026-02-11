export interface User {
  id: string;
  fullName: string;
  email: string;
  joinedDate: string;
}

export interface DiagnosisRecord {
  id: string;
  userId: string;
  organType: "brain" | "breast";
  imagePath: string;
  diseaseName: string;
  confidence: number;
  causes: string[];
  precautions: string[];
  remedies: string[];
  foodHabits: string[];
  medicines: string[];
  timestamp: string;
}

const USERS_KEY = "mediscan_users";
const CURRENT_USER_KEY = "mediscan_current_user";
const DIAGNOSES_KEY = "mediscan_diagnoses";

function getUsers(): User[] {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function saveDiagnoses(diagnoses: DiagnosisRecord[]) {
  localStorage.setItem(DIAGNOSES_KEY, JSON.stringify(diagnoses));
}

export function signup(fullName: string, email: string, password: string): User {
  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("Email already registered");
  }
  const user: User = {
    id: crypto.randomUUID(),
    fullName,
    email,
    joinedDate: new Date().toISOString(),
  };
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Store password hash (simplified)
  localStorage.setItem(`mediscan_pw_${email}`, password);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function login(email: string, password: string): User {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("User not found");
  const storedPw = localStorage.getItem(`mediscan_pw_${email}`);
  if (storedPw !== password) throw new Error("Invalid password");
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function getDiagnoses(userId: string): DiagnosisRecord[] {
  const all: DiagnosisRecord[] = JSON.parse(localStorage.getItem(DIAGNOSES_KEY) || "[]");
  return all.filter((d) => d.userId === userId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export function saveDiagnosis(record: DiagnosisRecord) {
  const all: DiagnosisRecord[] = JSON.parse(localStorage.getItem(DIAGNOSES_KEY) || "[]");
  all.push(record);
  saveDiagnoses(all);
}
