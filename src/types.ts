import type { IconType } from "react-icons";

export interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
}

export interface HeadlineConfig {
  accessibleText: string;
  desktopLines: string[];
}

export interface SiteContent {
  brand: string;
  brandFullName: string;
  brandDescriptor: string;
  navigation: NavigationItem[];
  bookingCTA: string;
  eyebrow?: string;
  headline: HeadlineConfig;
  subheadline: string;
  subheadlineDesktopLines: string[];
  impactHeadline: string;
  impactDescription: string;
  availability: string;
  primaryCTA: string;
}
