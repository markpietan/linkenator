const express = require("express");
const linksRouter = express.Router();
const {
  createLink,
  createLinkTags,
  createTag,
  getAllLinks,
  updateLink,
  deleteLinkTags,
  deleteFromLinkTagsByLinkId,
  deleteLinkById,
} = require("./../db/index.js");
linksRouter.get("/", async function (req, res, next) {
  const cleanRows = [];
  const rows = await getAllLinks();
  for (let index = 0; index < rows.length; index++) {
    const element = rows[index];
    console.log(element);
    const found = cleanRows.findIndex(function (e) {
      if (element.id === e.id) {
        return true;
      } else {
        return false;
      }
    });
    if (found === -1) {
      const obj = {
        url: element.url,
        id: element.id,
        click_count: element.click_count,
        comment: element.comment,
        date: element.date,
        tags: [element.name],
      };
      cleanRows.push(obj);
    } else {
      cleanRows[found].tags.push(element.name);
    }
  }
  console.log(cleanRows);
  res.send({ cleanRows });
});

linksRouter.post("/", async function (req, res, next) {
  const { comment, URL, tags } = req.body;
  if (URL === undefined) {
    res.send({ message: "URL is required" });
  }
  const link = await createLink({ comment, URL });
  const linkId = link.id;
  const parsedTags = [];

  for (let index = 0; index < tags.length; index++) {
    const currentTag = tags[index];
    const createdTag = await createTag(currentTag);
    parsedTags.push(createdTag);
  }
  console.log(parsedTags);
  for (let index = 0; index < parsedTags.length; index++) {
    const element = parsedTags[index];
    const createLinkTag = await createLinkTags({ linkId, tagId: element.id });
    console.log(createLinkTag);
  }
  res.send({ link });
});

linksRouter.patch("/:linkid", async function (req, res, next) {
  const { name, comment, tags } = req.body;
  const id = req.params.linkid;
  const linkUpdateObj = {
    id,
    fields: {
      comment,
      name,
    },
  };
  const updatedLink = await updateLink(linkUpdateObj)
  console.log(updatedLink) 
  const parsedTags = [];

  for (let index = 0; index < tags.length; index++) {
    const currentTag = tags[index];
    const createdTag = await createTag(currentTag);
    parsedTags.push(createdTag);
  }
  console.log(parsedTags)
  await deleteLinkTags({tags: parsedTags, linkid: id})
  for (let index = 0; index < parsedTags.length; index++) {
    const element = parsedTags[index];
    const createLinkTag = await createLinkTags({ linkId: id, tagId: element.id });
    console.log(createLinkTag);
  }
  res.send({updatedLink})
});

linksRouter.delete("/:linkid", async function (req, res, next){
    const id = req.params.linkid;
  await deleteFromLinkTagsByLinkId({id})
  const response = await deleteLinkById({id})
  res.send({Message: "Link was successfully deleted"})
})

module.exports = linksRouter;
