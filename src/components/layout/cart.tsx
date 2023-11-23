"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ShoppingCartIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

export function Cart() {
  const itemCount = 0;
  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCartIcon
          aria-hidden="true"
          className="flex-shring-0 h-6 w-6 text-neutral-400 group-hover:text-neutral-500"
        />
        <span className="ml-2 text-sm font-medium text-neutral-700 group-hover:text-neutral-800">
          {itemCount}
        </span>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              {/* TODO: Cart logic */}
              cart items
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 pr-6 text-sm">
                <div className="flex text-muted-foreground">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href={"/cart"}
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continoue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60  w-60 text-muted-foreground"
            >
              {/* TODO: Create empty cart image */}
              <Image src="" fill alt="empty cart image" />
            </div>
            <div className="text-xl font-semibold text-muted-foreground">
              Your cart is empty
            </div>
            <SheetTrigger asChild>
              <Link
                href={"/products"}
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm",
                })}
              >
                Add items to your cart to Checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
