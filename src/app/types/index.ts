export type CommandOutput = {
  type: "header" | "text" | "section";
  content: string | Array<string | CommandItem>;
  title?: string;
  animated?: boolean;
};

export type CommandItem = {
  command: string;
  desc: string;
};

export type HistoryEntry = {
  command: string;
  path: string;
  output: CommandOutput[] | null;
  error: boolean;
  timestamp: string;
};

export type CommandResult = {
  output: CommandOutput[];
};
