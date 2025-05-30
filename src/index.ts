import { MCPServer } from 'mcp-framework';

const server = new MCPServer();

server.start().catch((error) => {
  console.error('서버 오류:', error);
});
