import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!["POST", "DELETE"].includes(req.method ?? "")) {
    res.status(405).end();
    return;
  }

  try {
    const { userId } = req.body;
    const { currentUser } = await serverAuth(req, res);

    if (!userId || typeof userId !== "string") throw new Error("Invalid ID");

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new Error("Invalid ID");

    let updatedFollowingIds: string[] = [...(user.followingIds || [])];

    if (req.method === "POST") {
      updatedFollowingIds.push(userId);

      try {
        await prisma.notification.create({
          data: {
            body: `${currentUser.name} (@${currentUser.username}) started following you!`,
            userId,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { hasNotification: true },
        });
      } catch (e) {
        console.log(e);
      }
    }

    if (req.method === "DELETE") {
      updatedFollowingIds = updatedFollowingIds.filter(
        (item) => item !== userId
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: { followingIds: updatedFollowingIds },
    });

    res.status(200).json(updatedUser);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }
}
