import fastify, { FastifyPluginAsync } from "fastify";
import AutoLoad, { AutoloadPluginOptions } from "@fastify/autoload";
import { join } from "path";
import cors from "@fastify/cors";

const server = fastify();
server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],

  credentials: true, // Enable credentials (e.g., cookies) for cross-origin requests if needed
});
const app: FastifyPluginAsync<any> = async (fastify, opts): Promise<void> => {
  await fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  await fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};
server.register(app);
server.listen({ port: 8000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
