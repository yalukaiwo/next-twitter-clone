import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).end();
    return;
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name || !username) {
      throw new Error("Missing fields");
    }

    const updateUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      },
    });

    res.status(200).json(updateUser);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
