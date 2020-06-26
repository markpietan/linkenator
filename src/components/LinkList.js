import React from "react";
import {
  Container,
  Button,
  Header,
  Segment,
  Image,
  Grid,
  Icon,
  Label,
  Divider,
} from "semantic-ui-react";
import TagList from "./TagList"

const LinkList = ({ links }) => {
  return (
    <Container>
      <Segment.Group>
          {
              links.map(function(e){
               return <Segment key= {e.id}>
                   <Header content= {e.url} textAlign= "center"></Header>
              <p>{e.comment}</p>
              <Label>
                  <Icon name = "mouse pointer"></Icon>
                  {e.click_count}
              </Label>
              <Divider></Divider>
              <TagList></TagList>
               </Segment>
              })
          }
      </Segment.Group>
    </Container>
  );
};



export default LinkList