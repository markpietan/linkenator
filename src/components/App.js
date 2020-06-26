import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Image,
  Grid,
} from "semantic-ui-react";
import { getLinks } from "../api";
import "semantic-ui-css/semantic.min.css";
import LinkList from "./LinkList";

const App = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then((response) => {
        console.log(response)
        setLinks(response);
      })
      .catch((error) => {
        setLinks(error);
      });
  }, []);

  return (
    <main>
      <Header as="h1" content="Linkenator" textAlign="center"></Header>
      <Container>
        <LinkList links={links}></LinkList>
      </Container>
    </main>
  );
};

export default App;
