// Connect to DB
const { Client } = require('pg');
const DB_NAME = 'linkenator'
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ DB_NAME }`;
const client = new Client(DB_URL);

// database methods
async function getAllLinks(){
  try {
    const response = await client.query(`
    SELECT * FROM links;
    `)
    if (response.rows.length > 0) {
      return response.rows
    } else {
      return []
    }
  } catch (error) {
    throw error
  }
}

async function createLink({comment, URL}){
try {
  const response = await client.query(`
  INSERT INTO links (name, comment) VALUES($1, $2)
  ON CONFLICT(name) DO UPDATE SET id = links.id RETURNING *;
  `, [URL, comment])
  return response.rows[0]
} catch (error) {
 throw error 
}

}

async function createTag(name){
  console.log(name)
  try {
    const response = await client.query(`
    INSERT INTO tags (name) VALUES($1)
    ON CONFLICT(name) DO UPDATE SET id = tags.id RETURNING *;
    `, [name])
    return response.rows[0]
  } catch (error) {
   throw error 
  
  }
  
  }


  async function createLinkTags({linkId, tagId}){
    try {
      const response = await client.query(`
      INSERT INTO links_tags ("link_id", "tag_id") VALUES($1, $2)
      ON CONFLICT("link_id", "tag_id") DO UPDATE SET id = links_tags.id RETURNING *;
      `, [linkId, tagId])
      return response.rows[0]
    } catch (error) {
     throw error 
    }
    
    }
// export
module.exports = {
  client, createLink, createLinkTags, createTag, getAllLinks
  // db methods
}