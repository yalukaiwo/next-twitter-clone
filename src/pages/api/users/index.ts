import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const users = await prisma.user.findMany({
      where: { id: { not: currentUser.id } },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json(users);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }
}
