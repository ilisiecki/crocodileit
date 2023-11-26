"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/valiadtors/account-credentials-validator";

import { toast } from "sonner";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trcp/client";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Sign in successfully.");

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      if (isSeller) {
        router.push("/sell");
        return;
      }

      router.push("/");
      router.refresh();
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid error or password.");
      }
    },
  });

  function onSubmit({ email, password }: TAuthCredentialsValidator) {
    signIn({ email, password });
  }

  function continueAsSeller() {
    router.push("?as=seller");
  }

  function continueAsBuyer() {
    router.push("/sign-in", undefined);
  }

  return (
    <>
      <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            {/* TODO: Add logo switch with div */}
            <div className="h-20 w-20 rounded-full bg-green-600"></div>
            <h1 className="text-2xl font-bold">
              Sign in to your {isSeller ? "seller" : null} account
            </h1>
            <Link
              href={"/sign-up"}
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
            >
              Don&apos;t have account?
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    autoComplete="on"
                    id="email"
                    {...register("email")}
                    placeholder="email@example.com"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
                className="hover:bg-neutral-200"
              >
                Continue as customer
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
                className="hover:bg-neutral-200"
              >
                Continue as seller
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
