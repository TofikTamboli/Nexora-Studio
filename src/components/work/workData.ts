export type WorkProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  image: string;
  href: string;
  theme: "light" | "dark";
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
  },
];
