import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = getDb();

  if (req.method === "GET") {
    const userId = req.query.userId as string | undefined;

    const countRows = await sql`SELECT count FROM celebrations WHERE id = 1`;
    const count = countRows[0]?.count ?? 0;

    let liked = false;
    if (userId) {
      const userRows = await sql`SELECT 1 FROM celebration_users WHERE user_id = ${userId}`;
      liked = userRows.length > 0;
    }

    return res.json({ count, liked });
  }

  if (req.method === "POST") {
    const { userId } = req.body as { userId: string };
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    await sql`INSERT INTO celebration_users (user_id) VALUES (${userId}) ON CONFLICT DO NOTHING`;
    const rows = await sql`UPDATE celebrations SET count = count + 1 WHERE id = 1 RETURNING count`;
    const count = rows[0]?.count ?? 0;

    return res.json({ count });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
