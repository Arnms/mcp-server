import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import {
  SERVER_INFO,
  TOOLS,
  RESOURCES,
  PROMPTS,
} from '../models/server-config.js';
import { TaskService } from '../services/task-service.js';
import { ToolHandler } from '../handlers/tool-handler.js';
import { ResourceHandler } from '../handlers/resource-handler.js';
import { PromptHandler } from '../handlers/prompt-handler.js';

export class AdvancedTaskServer {
  private server: Server;
  private taskService: TaskService;
  private toolHandler: ToolHandler;
  private resourceHandler: ResourceHandler;
  private promptHandler: PromptHandler;

  constructor() {
    this.server = new Server(SERVER_INFO, {
      capabilities: {
        tools: {},
        resources: {},
        prompts: {},
      },
    });

    // 서비스 및 핸들러 초기화
    this.taskService = new TaskService();
    this.toolHandler = new ToolHandler(this.taskService);
    this.resourceHandler = new ResourceHandler(this.taskService);
    this.promptHandler = new PromptHandler(this.taskService);

    this.setupHandlers();
  }

  private setupHandlers() {
    // Tools 핸들러
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: TOOLS,
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return this.toolHandler.handleToolCall(
        request.params.name,
        request.params.arguments,
      );
    });

    // Resources 핸들러
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => ({
      resources: RESOURCES,
    }));

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        return this.resourceHandler.handleResourceRead(request.params.uri);
      },
    );

    // Prompts 핸들러
    this.server.setRequestHandler(ListPromptsRequestSchema, async () => ({
      prompts: PROMPTS,
    }));

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      return this.promptHandler.handlePromptGet(
        request.params.name,
        request.params.arguments || {},
      );
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Advanced Task MCP server running on stdio');
  }

  getServer(): Server {
    return this.server;
  }

  getTaskService(): TaskService {
    return this.taskService;
  }
}
