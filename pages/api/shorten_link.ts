// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDb } from "../../util/mongodbConfig";
import { nanoid } from "nanoid";
type shortid = {};

export default async (req: NextApiRequest, res: NextApiResponse<shortid>) => {
  await connectDb();
  if (req.method === "POST") {
    try {
      const { db } = await connectDb();
      if (
        req.body !== "" &&
        req.body.link !== undefined &&
        req.body.link !== ""
      ) {
        let body = JSON.parse(req.body).link;
        const id_ = nanoid(5);

        let reponse = await db.collection("url").findOne({ url: body });

        if (!reponse) {
          const entry = db
            .collection("url")
            .insertOne({ shortid: id_, url: body });
          reponse = await db.collection("url").findOne({ url: body });
        }

        if (reponse) {
          res.statusCode = 201;
          res.json({ shortid: reponse.shortid });
        }
      }
    } catch (error) {
      res.statusCode = 409;
      res.json({ error: "no_link_found", error_description: "No link found" });
    }
  }
};
