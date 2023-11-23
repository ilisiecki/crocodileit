"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemsProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

export function NavItem({
  category,
  handleOpen,
  isOpen,
  isAnyOpen,
}: NavItemsProps) {
  return (
    <div className="flex ">
      <div className="relative flex items-center">
        <Button
          variant={isOpen ? "secondary" : "ghost"}
          onClick={handleOpen}
          className="gap-1.5"
        >
          {category.label}
          <ChevronDownIcon
            className={cn("h-4 w-4 text-muted-foreground transition-all", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>
      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            },
          )}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 top-1/2 bg-white shadow"
          />
          <div className="relative bg-white">
            <div className="mx-auto max-w-7xl px-8">
              <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                <div className="col-span-4 col-start-1 grid grid-cols-3 gap-x-8">
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className="group relative text-base sm:text-sm"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-lg bg-neutral-100 group-hover:opacity-75">
                        <Image
                          src={item.imageSrc}
                          alt="product category image"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-neutral-900"
                      >
                        {item.name}
                      </Link>
                      <p aria-hidden="true" className="mt-1">
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
