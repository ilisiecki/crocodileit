import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";

import { perks } from "@/lib/consts";
import Link from "next/link";
import Balancer from "react-wrap-balancer";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper>
        <section className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center">
          <Balancer>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl">
              Marketplace for high quality{" "}
              <span className="text-green-600">digital assets</span>.
            </h1>
          </Balancer>
          <p className="mt-6 max-w-prose text-lg text-muted-foreground">
            Welcome to Crocodile<span className="text-green-600">IT</span>.
            Every asset on this platform is verified and checked to ensure
            highest quality standards.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <Link href={"/products"} className={buttonVariants()}>
              Browse Trending
            </Link>
            <Button variant={"ghost"}>Our quality promise &rarr;</Button>
          </div>
        </section>

        {/* TODO: List products */}
      </MaxWidthWrapper>

      <section className="border-t border-neutral-200 bg-neutral-50">
        <MaxWidthWrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-center md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shirnk-0 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-900">
                    {<perk.Icon className="h-1/3 w-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-neutral-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWrapper>
      </section>
    </>
  );
}
