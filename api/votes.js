import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const polls = (await kv.get('polls')) || {}
    return res.status(200).json(polls)
  }

  if (req.method === 'POST') {
    const { user, vote } = req.body        // vote = true/false
    const polls = (await kv.get('polls')) || { votes: {} }

    if (polls.votes[user]) return res.status(409).json({ error: 'already voted' })

    polls.votes[user] = vote
    await kv.set('polls', polls)
    return res.status(200).json({ ok: true })
  }

  res.status(405).end()
}
