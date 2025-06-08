import { TaskService } from '../services/task-service.js';
import { CreateTaskArgs, ListTasksArgs, TaskIdArgs } from '../types/index.js';

export class ToolHandler {
  constructor(private taskService: TaskService) {}

  async handleToolCall(name: string, args: any) {
    try {
      switch (name) {
        case 'create_task':
          return this.createTask(args as CreateTaskArgs);
        case 'list_tasks':
          return this.listTasks(args as ListTasksArgs);
        case 'complete_task':
          return this.completeTask(args as TaskIdArgs);
        case 'delete_task':
          return this.deleteTask(args as TaskIdArgs);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }

  private createTask(args: CreateTaskArgs) {
    const task = this.taskService.createTask(args);

    return {
      content: [
        {
          type: 'text',
          text: `Task created successfully: "${task.title}" (ID: ${task.id})`,
        },
      ],
    };
  }

  private listTasks(args: ListTasksArgs) {
    const tasks = this.taskService.listTasks(args);

    if (tasks.length === 0) {
      return {
        content: [
          {
            type: 'text',
            text: 'No tasks found.',
          },
        ],
      };
    }

    const taskList = tasks
      .map(
        (task) =>
          `${task.id}. ${task.title} ${task.completed ? '✓' : '○'} - ${task.description}`,
      )
      .join('\n');

    return {
      content: [
        {
          type: 'text',
          text: taskList,
        },
      ],
    };
  }

  private completeTask(args: TaskIdArgs) {
    const task = this.taskService.completeTask(args);

    return {
      content: [
        {
          type: 'text',
          text: `Task "${task.title}" marked as completed!`,
        },
      ],
    };
  }

  private deleteTask(args: TaskIdArgs) {
    const task = this.taskService.deleteTask(args);

    return {
      content: [
        {
          type: 'text',
          text: `Task "${task.title}" deleted successfully!`,
        },
      ],
    };
  }
}

// 계산기 도구 핸들러
export class CalculatorHandler {
  async handleToolCall(name: string, args: any) {
    try {
      switch (name) {
        case 'add':
          return this.handleAdd(args);
        case 'multiply':
          return this.handleMultiply(args);
        case 'divide':
          return this.handleDivide(args);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ],
        isError: true,
      };
    }
  }

  private handleAdd(args: any) {
    const { a, b } = args;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }

    const result = a + b;
    return {
      content: [
        {
          type: 'text',
          text: `${a} + ${b} = ${result}`,
        },
      ],
    };
  }

  private handleMultiply(args: any) {
    const { a, b } = args;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }

    const result = a * b;
    return {
      content: [
        {
          type: 'text',
          text: `${a} × ${b} = ${result}`,
        },
      ],
    };
  }

  private handleDivide(args: any) {
    const { a, b } = args;
    if (typeof a !== 'number' || typeof b !== 'number') {
      throw new Error('Both arguments must be numbers');
    }

    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }

    const result = a / b;
    return {
      content: [
        {
          type: 'text',
          text: `${a} ÷ ${b} = ${result}`,
        },
      ],
    };
  }
}
