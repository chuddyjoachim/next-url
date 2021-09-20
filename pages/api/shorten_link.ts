// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../util/mongodbConfig";
import { nanoid } from "nanoid";

type shortid = {};

export default async (req: NextApiRequest, res: NextApiResponse<shortid>) => {
  if (req.method === "POST") {
    const { db } = await connectDb();

    if (
      req.body !== "" &&
      req.body.link !== undefined &&
      req.body.link !== ""
    ) {
      let body = JSON.parse(req.body).link;
      const id_ = nanoid(5);

      const entry = await db
        .collection("url")
        .insertOne({ shortid: id_, url: body });
      const reponse = await db.collection("url").findOne({ url: body });

      res.statusCode = 201;
      return res.json({ shortid: reponse.shortid });
    }

    res.statusCode = 409;
    res.json({ error: "no_link_found", error_description: "No link found" });
  }
};
