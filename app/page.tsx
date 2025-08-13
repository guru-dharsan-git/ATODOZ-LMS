"use client"
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/dist/server/request/headers";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LoginForm } from "./(auth)/login/_components/LoginForm";
import Link from "next/link";
import { toast } from "sonner";


// ThemeToggle
export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession()
  
  async function signOut() {
    await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/");
      toast.success("Successfully signed out");
    },
  },
});
  }
  return (
    <div>
      <ThemeToggle />
      {session ? (
        <div>
          <h1>Welcome back! {session.user.name}</h1>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ) : (
      <div>
        <p>You are not logged in. Please log in to continue.</p>
            <Link href={"/login"}>
            <Button>Login</Button>
            </Link>
      </div>
    )}
  </div>
);
}
