import React, { useState } from "react";
import { Form, Divider, Header } from "semantic-ui-react";
import { generateLink, getLinks } from "./../api/index";
const Createlink = ({setallLinks, setLinks}) => {
  const [userUrl, setuserUrl] = useState("");
  const [userComment, setuserComment] = useState("");
  const [userTags, setuserTags] = useState("");
  function onInputChange(event) {
    setuserUrl(event.target.value);
  }
  function onInputChange2(event) {
    setuserComment(event.target.value);
  }
  function onInputChange3(event) {
    setuserTags(event.target.value);
  }

  async function preventRefresh(e) {
    e.preventDefault();
    const data = await generateLink({
      URL: userUrl,
      comment: userComment,
      tags: userTags.split(" "),
    });
    console.log(data);
    setuserUrl("")
    setuserComment("")
    setuserTags("")
    alert("Link Created")
    getLinks()
    .then((response) => {
      console.log(response);
      setLinks(response);
      setallLinks(response);
    })
    .catch((error) => {
      throw error;
    });
  }

  return (
    <>
      <Header as="h3" content="Create a new link"></Header>
      <Form onSubmit={preventRefresh}>
        <Form.Field>
          <label>Url</label>
          <input value={userUrl} onChange={onInputChange} required />
        </Form.Field>
        <Form.Field>
          <label>Comment</label>
          <input value={userComment} onChange={onInputChange2} />
        </Form.Field>
        <Form.Field>
          <label>Tags (separate each tag by a space)</label>
          <input value={userTags} onChange={onInputChange3} />
        </Form.Field>
        <Form.Button>submit</Form.Button>
      </Form>
    </>
  );
};

export default Createlink;
