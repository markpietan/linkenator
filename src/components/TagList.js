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
} from "semantic-ui-react";

const TagList = ({ tags, onTagClick }) => {
  return (
    <div>
      {tags.map(function (e, index) {
        return <Label key= {index} onClick= {() => {onTagClick(e)}} cursor= "pointer">{e}</Label>;
      })}
    </div>
  );
};

export default TagList;
