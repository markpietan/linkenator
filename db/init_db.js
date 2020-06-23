// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    await client.connect();

    // drop tables in correct order
    const response = await client.query(`
    DROP TABLE IF EXISTS links_tags;
    DROP TABLE IF EXISTS links;
    DROP TABLE IF EXISTS tags;
 
    `);
    // build tables in correct order
    const response2 = await client.query(`
   CREATE TABLE links(
   id SERIAL PRIMARY KEY  ,
   name VARCHAR(255) NOT NULL UNIQUE,
   click_count INTEGER DEFAULT 1,
   comment VARCHAR(255),
   date DATE NOT NULL DEFAULT CURRENT_DATE
   );

   CREATE TABLE tags(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL UNIQUE
   
   );
    CREATE TABLE links_tags(
    id SERIAL PRIMARY KEY,
    "link_id" INTEGER,
    "tag_id" INTEGER,
    FOREIGN KEY ("link_id") REFERENCES links (id),
    FOREIGN KEY ("tag_id") REFERENCES tags (id),
    UNIQUE("link_id", "tag_id")
   );
  


   `);
   console.log("Tables Built!")
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
