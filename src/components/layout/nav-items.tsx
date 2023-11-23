"use client";

import { PRODUCT_CATEGORIES } from "@/lib/consts";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "@/components/layout/nav-item";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export function NavItems() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handleEvent);

    return () => {
      document.removeEventListener("keydown", handleEvent);
    };
  }, []);

  const isAnyOpen = activeIndex !== null;

  const navRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex h-full gap-4" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, idx) => {
        function handleOpen() {
          if (activeIndex === idx) {
            setActiveIndex(null);
          } else {
            setActiveIndex(idx);
          }
        }

        const isOpen = idx === activeIndex;

        return (
          <NavItem
            key={category.value}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
}
