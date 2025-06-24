import { CommandResult } from "../types";

export const commands: Record<string, () => CommandResult> = {
  help: () => ({
    output: [
      {
        type: "section",
        title: "AVAILABLE COMMANDS",
        content: [
          { command: "/about", desc: "Display profile information" },
          { command: "/experience", desc: "View professional experience" },
          { command: "/education", desc: "View educational background" },
          { command: "/skills", desc: "List technical capabilities" },
          { command: "/projects", desc: "View my project portfolio" },
          { command: "/contact", desc: "Show contact details" },
          { command: "/resume", desc: "Download my resume" },
          { command: "/clear", desc: "Clear terminal history" },
          { command: "/help", desc: "Show this help message" },
        ],
      },
    ],
  }),

  resume: () => {
    // Trigger download
    const link = document.createElement("a");
    link.href = "/dpark_resume.pdf";
    link.download = "dpark_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return {
      output: [
        { type: "header", content: "RESUME_DOWNLOAD" },
        {
          type: "text",
          content: "📄 Initiating download of my resume...",
        },
        {
          type: "section",
          title: "DOWNLOAD_INFO",
          content: [
            "File: dpark_resume.pdf",
            "Your download should begin automatically.",
            "If the download doesn't start, please check your browser settings.",
          ],
        },
      ],
    };
  },

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
          "Position: P2P Operational Specialist (August 2024 - Present)",
          "Engineered AI-powered Microsoft Teams Bot for 500+ users using Power Virtual Agent",
          "Created executive-level presentations for CFO influencing strategic decisions",
          "Managed Purchase Orders ($5K-$5M+) through SAP ensuring SOX compliance",
          "Led strategic Vendor Due Diligence initiatives with comprehensive risk assessments",
          "Delivered process improvements for executive-level projects in luxury goods environment",
        ],
      },
      {
        type: "section",
        title: "VISIONABLE GLOBAL INC",
        content: [
          "Position: Full Stack Developer (August 2021 - August 2023)",
          "Spearheaded codebase modernization to Next.js and TypeScript for improved scalability",
          "Developed real-time video conferencing features using WebRTC API",
          "Led creation of MVPs using CRUD methodology and MaterialUI components",
          "Implemented AWS-Amplify for secure user authentication and user pool management",
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
      {
        type: "section",
        title: "Noah Bank",
        content: [
          "Position: Loan Officer (May 2017 - December 2017)",
          "Conducted Financial Analysis on loan applications",
          "Handled $1M+ in loan applications",
          "Provided support in SBA and Commercial Loans Applications",
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
        content: [
          "Masters in Computer Science",
          "May 2024 - May 2026 (Expected)",
        ],
      },
      {
        type: "section",
        title: "APP ACADEMY",
        content: [
          "Software Development Bootcamp",
          "October 2020 - April 2021",
        ],
      },
      {
        type: "section",
        title: "RUTGERS UNIVERSITY",
        content: [
          "Bachelor of Science in Finance",
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

  projects: () => ({
    output: [
      { type: "header", content: "PROJECTS" },
      {
        type: "section",
        title: "PACTWISE - AI-POWERED CONTRACT MANAGEMENT PLATFORM",
        content: [
          "Architected full-stack AI-driven contract and vendor management application",
          "Built with Next.js, React, TypeScript, and Convex backend-as-a-service",
          "Engineered multi-agent AI system (Manager, Financial, Legal, Secretary agents)",
          "Automated contract analysis, risk assessment, and compliance verification",
          "Implemented secure file uploads and version management for contracts",
          "Designed comprehensive backend with robust database schema and CRUD APIs",
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
          "LinkedIn: linkedin.com/in/danielpark0503",
          "Github: github.com/dpxrk",
          "Personal Website: dpxrk.vercel.app",
        ],
      },
    ],
  }),
};
