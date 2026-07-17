import { LoginForm } from "@/components/auth/LoginForm";

/**
 * LoginPage — SINGLE RESPONSIBILITY: compose the login page.
 * Only page composition. No logic.
 */
export function LoginPage() {
  return <LoginForm />;
}
