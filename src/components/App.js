import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Image,
  Grid,
  Form,
  Divider,
} from "semantic-ui-react";
import { getLinks } from "../api";
import "semantic-ui-css/semantic.min.css";
import LinkList from "./LinkList";
import Searchbar from "./Searchbar";
import CreateLink from "./Createlink";

const App = () => {
  const [links, setLinks] = useState([]);
  const [allLinks, setallLinks] = useState([]);
  useEffect(() => {
    getLinks()
      .then((response) => {
        console.log(response);
        setLinks(response);
        setallLinks(response);
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  function onFormSubmit(userText, buttonChoice, popularChoice) {
    const searched = allLinks.filter(function (e) {
      if (buttonChoice === "urls") {
        if (e.url.includes(userText)) {
          return true;
        }
      } else {
        const found = e.tags.find(function (tag) {
          if (tag.includes(userText)) {
            return true;
          }
        });
        return found;
      }
    });
    console.log(searched);
    if (popularChoice === true) {
      searched.sort(function (a, b) {
        if (a.click_count < b.click_count) {
          return 1;
        }
        if (a.click_count > b.click_count) {
          return -1;
        }
        return 0
      });
    }
    console.log(searched)
    setLinks(searched);
  }

  function onTagClick(name) {
    const searched = allLinks.filter(function (e) {
      const found = e.tags.find(function (tag) {
        if (tag.includes(name)) {
          return true;
        }
      });
      return found;
    });
    setLinks(searched);
  }

  return (
    <main>
      <Header as="h1" content="Linkenator" textAlign="center"></Header>
      <Container>
        <Searchbar onFormSubmit={onFormSubmit}></Searchbar>
        <Divider></Divider>
        <CreateLink setallLinks={setallLinks} setLinks={setLinks}></CreateLink>
        <Divider></Divider>
        <LinkList
          links={links}
          setLinks={setLinks}
          onTagClick={onTagClick}
        ></LinkList>
      </Container>
    </main>
  );
};

const FormExampleField = () => (
  <Form>
    <Form.Field>
      <label>User Input</label>
      <input />
    </Form.Field>
  </Form>
);

export default App;
