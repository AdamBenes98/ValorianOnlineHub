import { readFile } from 'fs/promises'
import { join } from 'path'

const DB = join(process.cwd(),'data','db.json')

async function getDb(){
  try{
    return JSON.parse(await readFile(DB,'utf8'))
  }catch{ return {archive:[]} }
}

export default async function handler(req, res){
  if(req.method!=='GET') return res.status(405).end()
  const db = await getDb()
  res.status(200).json(db.archive||[])
}
