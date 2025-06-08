import { TaskData } from '../types/index.js';

export class Task implements TaskData {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;

  constructor(data: Omit<TaskData, 'id' | 'createdAt'> & { id?: string }) {
    this.id = data.id || this.generateId();
    this.title = data.title;
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.createdAt = new Date().toISOString();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  complete(): void {
    this.completed = true;
  }

  isCompleted(): boolean {
    return this.completed;
  }

  isPending(): boolean {
    return !this.completed;
  }

  toJSON(): TaskData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
    };
  }
}
