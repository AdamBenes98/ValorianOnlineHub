import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const vault = (await kv.get('vault')) || []
    return res.status(200).json(vault)
  }

  if (req.method === 'POST') {
    const vault = (await kv.get('vault')) || []
    const memo = { ...req.body, time: Date.now() }
    vault.unshift(memo)
    await kv.set('vault', vault)
    return res.status(201).json({ ok: true })
  }

  res.status(405).end()
}
