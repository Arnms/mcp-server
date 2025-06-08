export interface TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export interface ServerInfo {
  [key: string]: unknown;
  name: string;
  version: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: string;
}

export interface CreateTaskArgs {
  title: string;
  description?: string;
}

export interface ListTasksArgs {
  status?: 'all' | 'completed' | 'pending';
}

export interface TaskIdArgs {
  id: string;
}

export interface PromptArgs {
  format?: 'brief' | 'detailed';
  urgency?: 'low' | 'medium' | 'high';
}

export type TaskStatus = 'all' | 'completed' | 'pending';
