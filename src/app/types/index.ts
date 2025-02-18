export type OutputType = "header" | "text" | "section";

export interface CommandOutput {
  type: OutputType;
  title?: string;
  content: string | string[] | CommandHelp[];
}

export interface CommandHelp {
  command: string;
  desc: string;
}

export interface HistoryEntry {
  command: string;
  path: string;
  output: CommandOutput[] | null;
  error: boolean;
  timestamp: string;
}

export interface Command {
  output: CommandOutput[];
}

export interface Commands {
  [key: string]: () => { output: CommandOutput[] };
}
