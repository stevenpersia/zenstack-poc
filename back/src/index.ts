import {
  // Prisma,
  PrismaClient
} from "@prisma/client";
// import { withPolicy } from "@zenstackhq/runtime";
import express, { Request, Response } from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import RPCApiHandler from "@zenstackhq/server/api/rpc";

import { enhance } from "@zenstackhq/runtime";

const prisma = new PrismaClient({ log: ["info"] });
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(require("../openapi.json")));

app.use((req, res, next) => {
  next();
  // const userId = req.header("X-USER-ID");
  // if (!userId || Number.isNaN(parseInt(userId))) {
  //   res.status(403).json({ error: "unauthorized" });
  // } else {
  //   next();
  // }
});

// function getUserId(req: Request) {
//   return parseInt(req.header("X-USER-ID")!);
// }

// // Gets a Prisma client bound to the current user identity
// function getPrisma(req: Request) {
//   return withPolicy(prisma, {
//     user: { id: getUserId(req) }
//   });
// }

// app.post(`/signup`, async (req, res) => {
//   const { name, email, posts } = req.body;

//   const postData = posts?.map((post: Prisma.PostCreateInput) => {
//     return { title: post?.title, content: post?.content };
//   });

//   const result = await getPrisma(req).user.create({
//     data: {
//       name,
//       email,
//       posts: {
//         create: postData
//       }
//     }
//   });
//   res.json(result);
// });

app.use("/api/model", async (req: Request, res: Response) => {
  const handler = RPCApiHandler();

  // Assignate queries because of Swagger UI (cf. condition)
  let query = req.query.q;

  // Handle queries because of Orval
  if (typeof req.query.q !== "string") {
    query = JSON.stringify(req.query.q)
      ?.replace(/:[ ]*"(true|false)"/g, ":$1")
      ?.replace(/"(\d+[^"]*?)"/g, "$1")
      ?.replace(/\\(")/g, "$1");
  }

  const { status, body } = await handler({
    method: req.method,
    path: req.path,
    query: { q: query } as any,
    requestBody: req.body,
    prisma: enhance(prisma, {}, { logPrismaQuery: true }) as any
  });

  res.status(status).header("x-requested-by", req.header("x-user-id")).json(body);
});

app.listen(3000, () => console.log(`🚀 Server ready at: http://localhost:3000`));
