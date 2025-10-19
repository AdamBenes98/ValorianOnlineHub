iimport { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const archive = (await kv.get('archive')) || []
    archive.unshift(req.body)          // the full poll object
    await kv.set('archive', archive)
    return res.status(201).json({ ok: true })
  }

  if (req.method === 'GET') {
    const archive = (await kv.get('archive')) || []
    return res.status(200).json(archive)
  }

  res.status(405).end()
}
