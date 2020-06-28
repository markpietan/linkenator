// Connect to DB
const { Client } = require("pg");
const DB_NAME = "linkenator";
const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const { generateUpdateString } = require("./../src/api/utils");
// database methods
async function getAllLinks() {
  try {
    const response = await client.query(`
    SELECT links.name AS url, links.id, links.click_count, links.comment, links.date, tags.name
    FROM links
    JOIN links_tags ON links.id = links_tags."link_id"
    JOIN tags ON tags.id = links_tags."tag_id";
    `);
    if (response.rows.length > 0) {
      return response.rows;
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
}

async function createLink({ comment, URL }) {
  try {
    const response = await client.query(
      `
  INSERT INTO links (name, comment) VALUES($1, $2)
  ON CONFLICT(name) DO UPDATE SET id = links.id RETURNING *;
  `,
      [URL, comment]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function createTag(name) {
  console.log(name);
  try {
    const response = await client.query(
      `
    INSERT INTO tags (name) VALUES($1)
    ON CONFLICT(name) DO UPDATE SET id = tags.id RETURNING *;
    `,
      [name]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function createLinkTags({ linkId, tagId }) {
  try {
    const response = await client.query(
      `
      INSERT INTO links_tags ("link_id", "tag_id") VALUES($1, $2)
      ON CONFLICT("link_id", "tag_id") DO UPDATE SET id = links_tags.id RETURNING *;
      `,
      [linkId, tagId]
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function updateLink({ id, fields }) {
  try {
    const updateString = generateUpdateString(fields);
    console.log(updateString);
    const response = await client.query(
      `UPDATE links SET ${updateString}
      WHERE id = ${id} RETURNING *;
      `,
      Object.values(fields)
    );
    return response.rows[0];
  } catch (error) {
    throw error;
  }
}

async function deleteLinkTags({ tags, linkid }) {
  try {
    console.log(tags);
    let tagString = "(";
    for (let index = 0; index < tags.length; index++) {
      const element = tags[index];
      console.log(element);
      tagString += ` ${element.id},`;
    }
    let finishedTagString = tagString.replace(/,$/, ")");
    console.log(finishedTagString);
    const response = await client.query(
      `
    DELETE FROM links_tags
    WHERE "tag_id"
    NOT IN ${finishedTagString}
    AND "link_id" = $1;
    
    `,
      [linkid]
    );
    console.log(response.rows);
  } catch (error) {
    throw error;
  }
}

async function deleteFromLinkTagsByLinkId({ id }) {
  try {
    console.log(id);
    const response = await client.query(
      `
  DELETE FROM links_tags
  WHERE "link_id" = $1;
  `,
      [id]
    );
    return;
  } catch (error) {
    throw error;
  }
}

async function deleteLinkById({ id }) {
  try {
    const response = await client.query(
      `
    DELETE FROM links
    WHERE id = $1;
    `,
      [id]
    );
    return;
  } catch (error) {
    throw error;
  }
}

async function addClick({ id }) {
  try {
    const response = await client.query(
      `
    UPDATE links 
    SET click_count = click_count + 1
    WHERE id = $1 RETURNING *;
    `,[id]
    );
    console.log(response.rows);
    return;
  } catch (error) {
    throw error;
  }
}

// export
module.exports = {
  client,
  createLink,
  createLinkTags,
  createTag,
  getAllLinks,
  updateLink,
  deleteLinkTags,
  deleteFromLinkTagsByLinkId,
  deleteLinkById,
  addClick,
  // db methods
};
