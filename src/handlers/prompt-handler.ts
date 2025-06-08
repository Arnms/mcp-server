import { TaskService } from '../services/task-service.js';
import { PromptArgs } from '../types/index.js';

export class PromptHandler {
  constructor(private taskService: TaskService) {}

  async handlePromptGet(name: string, args: PromptArgs) {
    try {
      switch (name) {
        case 'task_summary':
          return this.getTaskSummaryPrompt(args);
        case 'task_reminder':
          return this.getTaskReminderPrompt(args);
        default:
          throw new Error(`Unknown prompt: ${name}`);
      }
    } catch (error) {
      throw new Error(
        `Failed to get prompt ${name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  private getTaskSummaryPrompt(args: PromptArgs) {
    const { format = 'brief' } = args;
    const stats = this.taskService.getStats();
    const tasks = this.taskService.getAllTasksAsJSON();

    let prompt = `You have ${stats.total} total tasks: ${stats.completed} completed, ${stats.pending} pending.\n\n`;

    if (format === 'detailed') {
      prompt += 'Detailed task breakdown:\n';
      tasks.forEach((task) => {
        prompt += `- ${task.title} (${task.completed ? 'Completed' : 'Pending'}): ${task.description}\n`;
      });
    }

    prompt +=
      '\nPlease provide a summary and recommendations for task management.';

    return {
      description: 'Task summary prompt',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: prompt,
          },
        },
      ],
    };
  }

  private getTaskReminderPrompt(args: PromptArgs) {
    const { urgency = 'medium' } = args;
    const pendingTasks = this.taskService.getPendingTasksAsJSON();

    let reminderPrompt = `You have ${pendingTasks.length} pending tasks that need attention.\n\n`;

    if (pendingTasks.length > 0) {
      reminderPrompt += 'Pending tasks:\n';
      pendingTasks.forEach((task) => {
        reminderPrompt += `- ${task.title}: ${task.description}\n`;
      });
    }

    reminderPrompt += `\nPlease create a ${urgency} urgency reminder message to help prioritize and complete these tasks.`;

    return {
      description: 'Task reminder prompt',
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: reminderPrompt,
          },
        },
      ],
    };
  }
}
