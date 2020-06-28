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
import addClick from "./../api/index"
const LinkList = ({ links, setLinks, onTagClick }) => {
    async function onLinkClick(id){
     const response = await addClick(id)
     console.log(response)
     const linksCopy = Array.from(links)
     const clickLink = linksCopy.find(function(e){
         if (id===e.id) {
            return true 
         }
     })
     clickLink.click_count++
     console.log(clickLink)
     setLinks(linksCopy)
    }
  return (
    <Container>
      {/* <Segment.Group> */}
          {
              links.map(function(e){
               return <Segment key= {e.id}>
                   <Header content= {e.url} textAlign= "center" as= "a" href= {"https://www."+e.url} onClick = {() => {onLinkClick(e.id)}} target= "_blank"></Header>
              <p>{e.comment}</p>
              <Label>
                  <Icon name = "mouse pointer"></Icon>
                  {e.click_count}
              </Label>
              <Divider></Divider>
              <TagList tags= {e.tags} onTagClick= {onTagClick}></TagList>
               </Segment>
              })
          }
      {/* </Segment.Group> */}
    </Container>
  );
};



export default LinkList