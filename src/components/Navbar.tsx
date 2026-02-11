import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, LogOut, User, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-serif text-xl font-bold text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            MRI Scan AI
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            {user && (
              <Link to="/dashboard" className="text-foreground/80 hover:text-primary transition-colors">
                Detect
              </Link>
            )}
          </nav>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden lg:flex items-center gap-3 px-3 border-r pr-4 mr-1">
                 <span className="text-sm font-medium text-muted-foreground">Welcome, {user.fullName.split(' ')[0]}</span>
              </div>
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/10 hover:text-primary">
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t p-4 space-y-4 bg-background">
           <nav className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary">Home</Link>
            {user && (
               <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary">Detect</Link>
            )}
            
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary">Profile</Link>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-sm font-medium text-left text-destructive">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary">Sign In</Link>
                <Link to="/signup" onClick={() => setIsOpen(false)} className="text-sm font-medium hover:text-primary">Get Started</Link>
              </>
            )}
           </nav>
        </div>
      )}
    </header>
  );
}
