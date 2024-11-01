import resumeOne from "../../assets/resume/resume.pdf";

const menus = [
  {
    id: 1,
    tomenu: "#about",
    namemenu: "About",
  },
  {
    id: 2,
    tomenu: "#experience",
    namemenu: "Experience",
  },
  {
    id: 3,
    tomenu: "#education",
    namemenu: "Education",
  },
  {
    id: 4,
    tomenu: "#recommendations",
    namemenu: "Recommendations",
  },
  {
    id: 5,
    tomenu: resumeOne,
    namemenu: "Resume",
    external: true,
    download: true, 
  },
];

export default menus;
