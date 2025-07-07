"use client";

import LoginForm from "@/components/forms/LoginForm";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pageVariants, containerVariants } from "@/styles/variants";
import Loading from "@/components/common/Loading";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return <Loading />;
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div
      className={pageVariants({
        background: "white",
        padding: "sm",
        className: "flex items-center justify-center h-screen",
      })}
    >
      <div
        className={containerVariants({
          size: "sm",
          className: "w-full max-w-md",
        })}
      >
        <LoginForm
          onSuccess={() => router.push("/")}
          onCancel={() => router.push("/login")}
        />
      </div>
    </div>
  );
}
