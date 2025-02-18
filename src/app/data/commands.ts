import { Commands } from "../types";

export const commands: Commands = {
  help: () => ({
    output: [
      {
        type: "section",
        title: "AVAILABLE COMMANDS",
        content: [
          { command: "about", desc: "Display profile information" },
          { command: "experience", desc: "View work experience" },
          { command: "education", desc: "Show educational background" },
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
          "Passionate about creating innovative solutions and continually expanding my knowledge in technology and business.",
      },
    ],
  }),
  // ... rest of the commands
};
