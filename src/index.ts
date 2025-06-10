import { AdvancedTaskServer } from './server/advanced-server.js';

// 환경 변수로 서버 타입 결정
const SERVER_TYPE = 'advanced';

async function main() {
  let server: AdvancedTaskServer;

  switch (SERVER_TYPE) {
    case 'advanced':
    default:
      console.error('Starting Advanced Task MCP Server...');
      server = new AdvancedTaskServer();
      break;
  }

  await server.start();
}

// 에러 처리
process.on('SIGINT', async () => {
  console.error('Server shutting down...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.error('Server shutting down...');
  process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

// 서버 실행
main().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});

export { AdvancedTaskServer };
