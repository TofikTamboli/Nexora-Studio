export type WorkProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
  theme: "light" | "dark";
  aspectRatio?: string;
  altText: string;
};

export const topRowProjects: WorkProject[] = [
  {
    id: "solapur-cbct",
    number: "01",
    title: "SOLAPUR CBCT",
    category: "Healthcare Platform",
    year: "2026",
    image: "/work/solapur-cbct.webp",
    href: "#contact",
    theme: "light",
    aspectRatio: "4 / 5",
    altText: "Solapur CBCT healthcare imaging and diagnostic platform interface showcase",
  },
  {
    id: "horizon-lands",
    number: "02",
    title: "HORIZON LANDS",
    category: "Real Estate Experience",
    year: "2026",
    image: "/work/horizon-lands.webp",
    href: "#contact",
    theme: "light",
    aspectRatio: "1 / 1",
    altText: "Horizon Lands interactive luxury real estate visual showcase",
  },
  {
    id: "reviewpilot",
    number: "03",
    title: "REVIEWPILOT",
    category: "AI Code Review SaaS",
    year: "2025",
    image: "/work/reviewpilot.webp",
    href: "#contact",
    theme: "dark",
    aspectRatio: "3 / 4",
    altText: "ReviewPilot autonomous AI developer code review dashboard",
  },
];

export const bottomRowProjects: WorkProject[] = [
  {
    id: "ashiyana-digital",
    number: "04",
    title: "ASHIYANA DIGITAL",
    category: "Local Service Brand",
    year: "2025",
    image: "/work/ashiyana-digital.webp",
    href: "#contact",
    theme: "light",
    aspectRatio: "4 / 3",
    altText: "Ashiyana Digital service branding and web platform interface",
  },
  {
    id: "growtha-ai",
    number: "05",
    title: "GROWTHA AI",
    category: "Agentic Marketing",
    year: "2026",
    image: "/work/growtha-ai.webp",
    href: "#contact",
    theme: "light",
    aspectRatio: "5 / 7",
    altText: "Growtha AI high-conversion agentic marketing platform",
  },
  {
    id: "nexora-labs",
    number: "06",
    title: "NEXORA LABS",
    category: "Digital Experiments",
    year: "2026",
    image: "/work/nexora-labs.webp",
    href: "#contact",
    theme: "dark",
    aspectRatio: "1 / 1",
    altText: "Nexora Labs creative interactive web experiments and shaders",
  },
];

export const allProjects: WorkProject[] = [
  ...topRowProjects,
  ...bottomRowProjects,
];
