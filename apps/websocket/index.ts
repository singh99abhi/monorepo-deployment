import { prismaClient } from "db/client";

Bun.serve({
  port: 8081,
  fetch(req, server) {
    // Handle WebSocket upgrade
    if (server.upgrade(req)) {
      return; // Important: must return here if upgrade succeeds
    }

    // Fallback for non-WebSocket requests
    return new Response("Upgrade failed", { status: 400 });
  },

  websocket: {
    async message(ws, message) {
      // Create a new random user in the DB
      await prismaClient.user.create({
        data: {
          username: Math.random().toString(36).substring(2, 15),
          password: Math.random().toString(36).substring(2, 15),
        },
      });

      // Echo message back
      ws.send(`Received: ${message}`);
    },
  },
});
