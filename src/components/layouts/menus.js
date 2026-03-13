import resumeOne from "../../assets/resume/resume.pdf";

const menus = [
  {
    id: "about",
    label: "About",
    href: "#about",
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
  },
  {
    id: "credentials",
    label: "Credentials",
    children: [
      {
        id: "education",
        label: "Education",
        href: "#education",
      },
      {
        id: "certificates",
        label: "Certificates",
        href: "#certificates",
      },
    ],
  },
  {
    id: "testimonial",
    label: "Testimonial",
    href: "#recommendations",
  },
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "loaders",
        label: "Loaders",
        children: [
          {
            id: "loader-neo-orbit",
            label: "Neo Orbit",
            href: "/loader/neo-orbit",
          },
          {
            id: "loader-terminal-boot",
            label: "Terminal Boot",
            href: "/loader/terminal-boot",
          },
          {
            id: "loader-glass-reveal",
            label: "Glass Reveal",
            href: "/loader/glass-reveal",
          },
          {
            id: "loader-node-network",
            label: "Node Network",
            href: "/loader/node-network",
          },
          // {
          //   id: "loader-combined",
          //   label: "Combined",
          //   href: "/loader/combined",
          // },
        ],
      },
    ],
  },
  {
    id: "resume",
    label: "Resume",
    href: resumeOne,
    external: true,
    download: true,
  },
];

export default menus;