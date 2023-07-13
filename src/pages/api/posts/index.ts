import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@prisma/client";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!["POST", "GET"].includes(req.method ?? "")) {
    res.status(405).end();
    return;
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;

      const post = await prisma.post.create({
        data: { body, userId: currentUser.id },
      });

      res.status(200).json(post);
      return;
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts: Post[];

      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId: userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: { user: true, comments: true },
          orderBy: { createdAt: "desc" },
        });
      }

      res.status(200).json(posts);
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }
}
