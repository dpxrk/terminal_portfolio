import { CommandResult } from "../types";

export const commands: Record<string, () => CommandResult> = {
  help: () => ({
    output: [
      {
        type: "section",
        title: "AVAILABLE COMMANDS",
        content: [
          { command: "about", desc: "Display profile information" },
          { command: "experience", desc: "View professional experience" },
          { command: "education", desc: "View educational background" },
          { command: "skills", desc: "List technical capabilities" },
          { command: "contact", desc: "Show contact details" },
          { command: "clear", desc: "Clear terminal history" },
          { command: "help", desc: "Show this help message" },
        ],
      },
    ],
  }),

  about: () => ({
    output: [
      { type: "header", content: "PROFILE_INFORMATION" },
      { type: "text", content: "Software Engineer | Entrepreneur | Learner" },
      {
        type: "text",
        content:
          "Innovative software engineer with a unique blend of technical expertise and business acumen. Experienced in full-stack development, procurement systems, and AI implementation.",
      },
    ],
  }),

  experience: () => ({
    output: [
      { type: "header", content: "PROFESSIONAL_EXPERIENCE" },
      {
        type: "section",
        title: "RICHEMONT NORTH AMERICA",
        content: [
          "Position: Procurement Specialist (August 2024 - Present)",
          "Engineered AI-powered Teams Bot for procurement intelligence",
          "Created executive-level presentations for CFO",
          "Managed Purchase Orders ($5K-$5M) through SAP",
          "Led Vendor Due Diligence initiatives",
        ],
      },
      {
        type: "section",
        title: "VISIONABLE GLOBAL INC",
        content: [
          "Position: Full Stack Developer (August 2021 - August 2023)",
          "Led codebase modernization to Next.js and TypeScript",
          "Developed WebRTC-based video conferencing features",
          "Implemented AWS-Amplify for secure user authentication",
          "Created Customer Portal for account management",
        ],
      },
      {
        type: "section",
        title: "BANK OF AMERICA-MERRILL",
        content: [
          "Position: Life Services Associate (January 2018 - February 2020)",
          "Managed asset transitions for 40+ cases quarterly",
          "Transitioned over $10M in new assets",
          "Provided expert guidance in securities management",
        ],
      },
    ],
  }),

  education: () => ({
    output: [
      { type: "header", content: "EDUCATIONAL_BACKGROUND" },
      {
        type: "section",
        title: "STEVENS INSTITUTE OF TECHNOLOGY",
        content: ["Masters in Computer Science", "May 2024 - December 2025"],
      },
      {
        type: "section",
        title: "RUTGERS UNIVERSITY",
        content: [
          "Bachelors of Science in Finance",
          "September 2013 - December 2017",
        ],
      },
    ],
  }),

  skills: () => ({
    output: [
      { type: "header", content: "TECHNICAL_CAPABILITIES" },
      {
        type: "section",
        title: "PROGRAMMING_LANGUAGES",
        content: ["TypeScript", "JavaScript", "Java", "Python"],
      },
      {
        type: "section",
        title: "FRONTEND",
        content: [
          "Next.JS",
          "React.JS",
          "Material UI",
          "HTML5",
          "CSS3",
          "Figma",
        ],
      },
      {
        type: "section",
        title: "BACKEND",
        content: ["Spring", "Node.JS", "Express", "Flask", "WebRTC"],
      },
      {
        type: "section",
        title: "DATABASE_AND_TOOLS",
        content: [
          "PostgreSQL",
          "MySQL",
          "TensorFlow",
          "AWS-Amplify",
          "Zustand",
          "SAP",
          "Microsoft 365",
        ],
      },
    ],
  }),

  contact: () => ({
    output: [
      { type: "header", content: "CONTACT_INFORMATION" },
      {
        type: "section",
        title: "CONNECT",
        content: [
          "Phone: (908).239.4019",
          "Email: danielpark0503@gmail.com",
          "LinkedIn: linkedin.com/in/yourprofile",
          "Github: github.com/yourprofile",
          "Personal Website: yourwebsite.com",
        ],
      },
    ],
  }),
};
