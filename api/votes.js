import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
const DB = join(process.cwd(),'data','db.json')

async function getDb(){ …same… }
async function saveDb(obj){ …same… }

export default async function handler(req, res){
  const db = await getDb()
  if(req.method==='GET'){
    res.status(200).json(db.polls||{})   // {title,end,votes:{}}
  }else if(req.method==='POST'){
    const {user, vote} = req.body        // vote = true/false
    if(!db.polls) db.polls = { votes:{} }
    if(db.polls.votes[user]) return res.status(409).json({error:'already voted'})
    db.polls.votes[user] = vote
    await saveDb(db)
    res.status(200).json({ok:true})
  }
}
