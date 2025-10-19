// read / write the news array inside data/db.json
import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'

const DB = join(process.cwd(),'data','db.json')

async function getDb(){
  try{
    return JSON.parse(await readFile(DB,'utf8'))
  }catch{ return {news:[], polls:{}, vault:[]} }
}

async function saveDb(obj){
  await writeFile(DB, JSON.stringify(obj,null,2))
}

export default async function handler(req, res){
  const db = await getDb()
  if(req.method==='GET'){
    res.status(200).json(db.news||[])
  }else if(req.method==='POST'){
    const post = req.body
    post.time = Date.now()
    db.news = [post, ...(db.news||[])]
    await saveDb(db)
    res.status(201).json({ok:true})
  }else{
    res.status(405).end()
  }
}
