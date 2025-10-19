import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const news = (await kv.get('news')) || []
    return res.status(200).json(news)
  }

  if (req.method === 'POST') {
    const news = (await kv.get('news')) || []
    const post = { ...req.body, time: Date.now() }
    news.unshift(post)
    await kv.set('news', news)
    return res.status(201).json({ ok: true })
  }

  res.status(405).end()
}
