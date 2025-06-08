import { Task } from '../models/task.js';
import {
  TaskData,
  TaskStats,
  CreateTaskArgs,
  ListTasksArgs,
  TaskIdArgs,
  TaskStatus,
} from '../types/index.js';

export class TaskService {
  private tasks: Map<string, Task> = new Map();

  constructor() {
    this.initializeSampleData();
  }

  private initializeSampleData(): void {
    const sampleTasks = [
      new Task({
        id: '1',
        title: 'Learn MCP Protocol',
        description: 'Study the Model Context Protocol documentation',
        completed: false,
      }),
      new Task({
        id: '2',
        title: 'Build TypeScript Server',
        description: 'Create a MCP server using TypeScript',
        completed: true,
      }),
    ];

    sampleTasks.forEach((task) => {
      this.tasks.set(task.id, task);
    });
  }

  createTask(args: CreateTaskArgs): Task {
    const task = new Task({
      title: args.title,
      description: args.description || '',
      completed: false,
    });

    this.tasks.set(task.id, task);
    return task;
  }

  listTasks(args: ListTasksArgs = {}): Task[] {
    const { status = 'all' } = args;
    const allTasks = Array.from(this.tasks.values());

    switch (status) {
      case 'completed':
        return allTasks.filter((task) => task.isCompleted());
      case 'pending':
        return allTasks.filter((task) => task.isPending());
      default:
        return allTasks;
    }
  }

  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  completeTask(args: TaskIdArgs): Task {
    const task = this.tasks.get(args.id);
    if (!task) {
      throw new Error(`Task with ID ${args.id} not found`);
    }

    task.complete();
    return task;
  }

  deleteTask(args: TaskIdArgs): Task {
    const task = this.tasks.get(args.id);
    if (!task) {
      throw new Error(`Task with ID ${args.id} not found`);
    }

    this.tasks.delete(args.id);
    return task;
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.listTasks({ status });
  }

  getStats(): TaskStats {
    const allTasks = Array.from(this.tasks.values());
    const completed = allTasks.filter((task) => task.isCompleted()).length;
    const pending = allTasks.filter((task) => task.isPending()).length;
    const total = allTasks.length;

    return {
      total,
      completed,
      pending,
      completionRate:
        total > 0 ? `${((completed / total) * 100).toFixed(1)}%` : '0%',
    };
  }

  getAllTasksAsJSON(): TaskData[] {
    return Array.from(this.tasks.values()).map((task) => task.toJSON());
  }

  getCompletedTasksAsJSON(): TaskData[] {
    return this.getTasksByStatus('completed').map((task) => task.toJSON());
  }

  getPendingTasksAsJSON(): TaskData[] {
    return this.getTasksByStatus('pending').map((task) => task.toJSON());
  }
}
