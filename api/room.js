import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);
let ready;

export default async function handler(req, res) {
  if (!ready) ready = sql`create table if not exists hdc_rooms (
    code text primary key, state jsonb not null, updated_at timestamptz not null default now())`;
  await ready;

  const code = String(req.query.code || '').toUpperCase();
  if (!/^[A-Z0-9]{4,8}$/.test(code)) return res.status(400).json({ error: 'bad code' });

  if (req.method === 'POST') {
    const state = req.body;
    if (!state || typeof state !== 'object' || !state.phase) return res.status(400).json({ error: 'bad state' });
    await sql`insert into hdc_rooms (code, state, updated_at) values (${code}, ${JSON.stringify(state)}, now())
              on conflict (code) do update set state = excluded.state, updated_at = now()`;
    return res.json({ ok: true });
  }

  const rows = await sql`select state from hdc_rooms where code = ${code}`;
  res.setHeader('Cache-Control', 'no-store');
  return res.json(rows[0] ? rows[0].state : null);
}
