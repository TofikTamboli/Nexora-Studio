import {
  LuBriefcaseBusiness,
  LuLayers3,
  LuUserRound,
  LuMail,
} from "react-icons/lu";
import type { SiteContent } from "./types";

export const content: SiteContent = {
  brand: "Nexora",
  brandFullName: "Nexora Studio",
  brandDescriptor: "DIGITAL STUDIO",

  navigation: [
    {
      label: "WORK",
      href: "#work",
      icon: LuBriefcaseBusiness,
    },
    {
      label: "SERVICES",
      href: "#services",
      icon: LuLayers3,
    },
    {
      label: "ABOUT",
      href: "#about",
      icon: LuUserRound,
    },
    {
      label: "CONTACT",
      href: "#contact",
      icon: LuMail,
    },
  ],

  bookingCTA: "BOOK A CALL",
  eyebrow: "[INDEPENDENT DIGITAL AGENCY]",

  headline: {
    accessibleText: "We turn bold ideas into digital experiences that grow.",
    desktopLines: [
      "We turn bold ideas",
      "into digital experiences",
      "that grow.",
    ],
  },

  subheadline:
    "Strategy, design and development for ambitious brands ready to move forward.",
  subheadlineDesktopLines: [
    "Strategy, design and development for",
    "ambitious brands ready to move forward.",
  ],

  impactHeadline: "IDEAS → IMPACT",
  impactDescription: "Built with clarity. Designed for growth.",

  availability: "AVAILABLE FOR SELECT PROJECTS — 2026",
  primaryCTA: "DISCUSS YOUR PROJECT",
};
