"use client";

import { buttonVariants } from "@/components/ui/button";
import { trpc } from "@/trcp/client";
import { Loader2Icon, XCircleIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

export function VerifyEmail({ token }: { token: string }) {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <XCircleIcon className="h-8 w-8 text-red-600" />
        <h3 className="text-xl font-semibold">There was a problem</h3>
        <p className="text-sm text-muted-foreground">
          Token is not valid or might be expired. Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
          {/* TODO: add image */}
          <Image src={""} fill alt="email sent successfully" />
        </div>
        <h3 className="text-2xl font-semibold">You&apos;re all set!</h3>
        <p className="mt-1 text-center text-muted-foreground">
          You can now sign in to your account.
        </p>
        <Link className={buttonVariants({ className: "mt-4" })} href="/sign-in">
          Sign in
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <Loader2Icon className="h-8 w-8 animate-spin text-green-600" />
        <h3 className="text-xl font-semibold">Verifying...</h3>
        <p className="text-sm text-muted-foreground">
          This won&apos;t take long.
        </p>
      </div>
    );
  }
}
