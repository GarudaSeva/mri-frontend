import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, LogOut, User } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <header className="border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
          <Brain className="h-6 w-6" />
          MediScan AI
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/profile">
              <User className="mr-1 h-4 w-4" />
              Profile
            </Link>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-1 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}
