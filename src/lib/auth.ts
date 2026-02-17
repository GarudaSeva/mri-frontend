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
  imagePath: string; // Base64 or URL
  diseaseName: string;
  confidence: number;
  causes: string[];
  precautions: string[];
  remedies: string[];
  foodHabits: string[];
  medicines: string[];
  timestamp: string;
}

const API_URL = "http://localhost:5001";
const CURRENT_USER_KEY = "mriscan_current_user";
const TOKEN_KEY = "mriscan_token";

// Helper to keep user logged in on refresh
export function getCurrentUser(): User | null {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export async function signup(fullName: string, email: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Signup failed");
  }

  const data = await res.json();
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
  localStorage.setItem(TOKEN_KEY, data.token);
  return data.user;
}

export async function login(email: string, password: string): Promise<User> {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Login failed");
  }

  const data = await res.json();
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
  localStorage.setItem(TOKEN_KEY, data.token);
  return data.user;
}

export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export async function getDiagnoses(userId: string): Promise<DiagnosisRecord[]> {
  const token = getToken();
  const res = await fetch(`${API_URL}/get_diagnoses/${userId}`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) return [];
  return await res.json();
}

export async function saveDiagnosis(record: DiagnosisRecord): Promise<void> {
  const token = getToken();
  await fetch(`${API_URL}/save_diagnosis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(record),
  });
}
