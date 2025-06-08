import { TaskService } from '../services/task-service.js';

export class ResourceHandler {
  constructor(private taskService: TaskService) {}

  async handleResourceRead(uri: string) {
    try {
      switch (uri) {
        case 'task://all':
          return this.getAllTasksResource(uri);
        case 'task://completed':
          return this.getCompletedTasksResource(uri);
        case 'task://pending':
          return this.getPendingTasksResource(uri);
        case 'task://stats':
          return this.getStatsResource(uri);
        default:
          throw new Error(`Resource not found: ${uri}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to read resource ${uri}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private getAllTasksResource(uri: string) {
    const tasks = this.taskService.getAllTasksAsJSON();

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(tasks, null, 2),
        },
      ],
    };
  }

  private getCompletedTasksResource(uri: string) {
    const completedTasks = this.taskService.getCompletedTasksAsJSON();

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(completedTasks, null, 2),
        },
      ],
    };
  }

  private getPendingTasksResource(uri: string) {
    const pendingTasks = this.taskService.getPendingTasksAsJSON();

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(pendingTasks, null, 2),
        },
      ],
    };
  }

  private getStatsResource(uri: string) {
    const stats = this.taskService.getStats();

    return {
      contents: [
        {
          uri,
          mimeType: 'application/json',
          text: JSON.stringify(stats, null, 2),
        },
      ],
    };
  }
}
