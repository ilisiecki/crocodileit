import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { NavItems } from "@/components/layout/nav-items";
import { buttonVariants } from "@/components/ui/button";
import { Cart } from "@/components/layout/cart";
import { getServersideUser } from "@/lib/payload-utlis";
import { cookies } from "next/headers";

export async function Navbar() {
  const nextCookies = cookies();
  const { user } = await getServersideUser(nextCookies);

  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-16 bg-white">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-neutral-200">
            <div className="flex h-16 items-center">
              {/* TODO: Mobile menu */}
              <div className="ml-4 flex lg:ml-0">
                <Link href={"/"}>
                  {/* TODO: Add Logo */}
                  <div className="h-10 w-10 rounded-full bg-green-600"></div>
                </Link>
              </div>
              <div className="z-50 hidden lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>
              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign in
                    </Link>
                  )}

                  {user ? null : (
                    <span
                      aria-hidden="true"
                      className="h-6 w-px bg-neutral-200"
                    ></span>
                  )}

                  {user ? (
                    ""
                  ) : (
                    <Link
                      href={"/sign-up"}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create account
                    </Link>
                  )}

                  {user ? (
                    <span
                      aria-hidden="true"
                      className="h-6 w-px bg-neutral-200"
                    ></span>
                  ) : null}

                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        aria-hidden="true"
                        className="h-6 w-px bg-neutral-200"
                      ></span>
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </nav>
  );
}
