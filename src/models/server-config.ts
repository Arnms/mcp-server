import { ServerInfo } from '../types/index.js';
import { Tool, Resource, Prompt } from '@modelcontextprotocol/sdk/types.js';

export const SERVER_INFO: ServerInfo = {
  name: 'task-manager-server',
  version: '1.0.0',
  description:
    'Advanced MCP server with task management, resources, and prompts',
};

export const TOOLS: Tool[] = [
  {
    name: 'create_task',
    description: 'Create a new task',
    inputSchema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Task title' },
        description: { type: 'string', description: 'Task description' },
      },
      required: ['title'],
    },
  },
  {
    name: 'list_tasks',
    description: 'List all tasks',
    inputSchema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          enum: ['all', 'completed', 'pending'],
          description: 'Filter tasks by status',
        },
      },
    },
  },
  {
    name: 'complete_task',
    description: 'Mark a task as completed',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'delete_task',
    description: 'Delete a task',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Task ID' },
      },
      required: ['id'],
    },
  },
];

export const RESOURCES: Resource[] = [
  {
    uri: 'task://all',
    name: 'All Tasks',
    description: 'Complete list of all tasks',
    mimeType: 'application/json',
  },
  {
    uri: 'task://completed',
    name: 'Completed Tasks',
    description: 'List of completed tasks',
    mimeType: 'application/json',
  },
  {
    uri: 'task://pending',
    name: 'Pending Tasks',
    description: 'List of pending tasks',
    mimeType: 'application/json',
  },
  {
    uri: 'task://stats',
    name: 'Task Statistics',
    description: 'Task completion statistics',
    mimeType: 'application/json',
  },
];

export const PROMPTS: Prompt[] = [
  {
    name: 'task_summary',
    description: 'Generate a summary of tasks',
    arguments: [
      {
        name: 'format',
        description: 'Output format (brief|detailed)',
        required: false,
      },
    ],
  },
  {
    name: 'task_reminder',
    description: 'Generate a reminder for pending tasks',
    arguments: [
      {
        name: 'urgency',
        description: 'Urgency level (low|medium|high)',
        required: false,
      },
    ],
  },
];
