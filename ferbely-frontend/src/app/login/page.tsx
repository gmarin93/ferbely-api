"use client";

import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import { pageVariants, containerVariants } from "@/styles/variants";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();

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
