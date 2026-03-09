import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "./_lib/db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const sql = getDb();

  if (req.method === "GET") {
    const rows = await sql`SELECT id, name, message, password_hash, timestamp FROM guestbook_messages ORDER BY timestamp DESC`;
    const messages = rows.map((row) => ({
      id: row.id,
      name: row.name,
      message: row.message,
      passwordHash: row.password_hash,
      timestamp: Number(row.timestamp),
    }));
    return res.json({ messages });
  }

  if (req.method === "POST") {
    const { name, message, passwordHash, timestamp } = req.body as {
      name: string;
      message: string;
      passwordHash: number;
      timestamp: number;
    };

    if (!name || !message || passwordHash == null || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const rows = await sql`
      INSERT INTO guestbook_messages (name, message, password_hash, timestamp)
      VALUES (${name}, ${message}, ${passwordHash}, ${timestamp})
      RETURNING id, name, message, password_hash, timestamp
    `;
    const row = rows[0];
    return res.json({
      message: {
        id: row.id,
        name: row.name,
        message: row.message,
        passwordHash: row.password_hash,
        timestamp: Number(row.timestamp),
      },
    });
  }

  if (req.method === "DELETE") {
    const { id, passwordHash } = req.body as { id: string; passwordHash: number };
    if (!id || passwordHash == null) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const rows = await sql`SELECT password_hash FROM guestbook_messages WHERE id = ${id}`;
    if (rows.length === 0) {
      return res.json({ success: false });
    }

    if (rows[0].password_hash !== passwordHash) {
      return res.json({ success: false });
    }

    await sql`DELETE FROM guestbook_messages WHERE id = ${id}`;
    return res.json({ success: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
