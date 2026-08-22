import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { LuMenu, LuX } from "react-icons/lu";
import { BrandLogo } from "./BrandLogo";
import type { NavigationItem } from "../types";

const EASE_BEZIER = [0.22, 1, 0.36, 1] as const;

interface HeaderProps {
  brand?: string;
  brandDescriptor?: string;
  navigation: NavigationItem[];
  bookingCTA: string;
  reducedMotion?: boolean;
  canAnimate?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  navigation,
  bookingCTA,
  reducedMotion = false,
  canAnimate = true,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);

  // Manage ESC key, click outside, and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuToggleRef.current &&
        !menuToggleRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);

      // Focus first link inside mobile menu
      setTimeout(() => {
        const firstLink = mobileMenuRef.current?.querySelector<HTMLAnchorElement>("a");
        firstLink?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  const headerVariants: Variants = {
    hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.65,
        ease: EASE_BEZIER,
      },
    },
  };

  const iconVariants: Variants = {
    initial: {
      y: 0,
    },
    hover: reducedMotion
      ? { y: 0 }
      : {
          y: [0, -5, -2, -4, 0],
          transition: {
            duration: 0.5,
            times: [0, 0.28, 0.52, 0.75, 1],
            ease: "easeOut",
          },
        },
  };

  return (
    <motion.header
      initial="hidden"
      animate={canAnimate ? "visible" : "hidden"}
      variants={headerVariants}
      className="site-header"
    >
      {/* 1. Official Nexora Studio Logo */}
      <BrandLogo />

      {/* 2. Desktop Navigation Panel (Right Aligned, No Duplicate Brand Label) */}
      <div className="navigation-panel">
        <nav className="navigation-links" aria-label="Nexora Studio main navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="navigation-link"
                initial="initial"
                animate="initial"
                whileHover="hover"
                whileFocus="hover"
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="navigation-link-icon"
                  variants={iconVariants}
                  aria-hidden="true"
                >
                  <Icon />
                </motion.span>
                <span>{item.label}</span>
              </motion.a>
            );
          })}
        </nav>
      </div>

      {/* 3. Desktop Book-a-Call Button */}
      <a
        href="#contact"
        className="book-call-button"
        aria-label="Book a call with Nexora Studio"
      >
        <span className="book-call-background" aria-hidden="true" />

        <span className="book-call-content book-call-content-base">
          <span>{bookingCTA}</span>
          <span className="book-call-arrow" aria-hidden="true">
            ↗
          </span>
        </span>

        <span
          className="book-call-content book-call-content-inverse"
          aria-hidden="true"
        >
          <span>{bookingCTA}</span>
          <span className="book-call-arrow">
            ↗
          </span>
        </span>
      </a>

      {/* 4. Mobile Header Actions (Below 768px) */}
      <div className="mobile-header-actions">
        <a
          href="#contact"
          className="mobile-book-button"
          aria-label="Book a call with Nexora Studio"
        >
          BOOK ↗
        </a>

        <button
          ref={menuToggleRef}
          type="button"
          className="mobile-menu-toggle"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <LuX aria-hidden="true" /> : <LuMenu aria-hidden="true" />}
        </button>
      </div>

      {/* 5. Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="mobile-menu"
            aria-label="Nexora Studio main navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.3,
              ease: EASE_BEZIER,
            }}
          >
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="mobile-navigation-link"
                  onClick={handleMobileNavClick}
                >
                  <Icon aria-hidden="true" />
                  <span>{item.label}</span>
                  <span
                    className="mobile-navigation-arrow"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
