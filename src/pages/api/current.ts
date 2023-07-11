import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { currentUser } = await serverAuth(req, res);

    res.status(200).json(currentUser);
    return;
  } catch (e) {
    console.log(e);
    res.status(400).end();
    return;
  }
}
