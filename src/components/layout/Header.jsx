import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { Link } from "react-router-dom";

/**
 * Header — SINGLE RESPONSIBILITY: render the top navigation bar.
 * Only layout presentation. Auth state via store.
 */
export function Header() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          TaskFlow
        </Link>
        <nav className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-sm text-muted-foreground">{user?.name}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" size="sm">Login</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
