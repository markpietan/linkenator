import React, { useState } from "react";
import { Form, FormButton } from "semantic-ui-react";
const Searchbar = ({ onFormSubmit }) => {
  const [userText, setuserText] = useState("");
  const [buttonChoice, setbuttonChoice] = useState("");
  const [popularChoice, setPopularChoice] = useState(false);
  function onInputChange(event) {
    setuserText(event.target.value);
  }
  function onButtonChange(event) {
    setbuttonChoice(event.target.id);
  }
  function onPopularChange(event) {
      console.log(event.target.checked)
    setPopularChoice(event.target.checked);
  }

  function preventRefresh(e) {
    e.preventDefault();
    onFormSubmit(userText, buttonChoice, popularChoice);
  }

  return (
    <Form onSubmit={preventRefresh}>
      <Form.Field>
        <label>User Input</label>
        <input value={userText} onChange={onInputChange} />
      </Form.Field>
      <Form.Button>submit</Form.Button>
      <Form.Group grouped>
        <label>HTML radios</label>
        <Form.Field
          label="Tags"
          control="input"
          type="radio"
          name="htmlRadios"
          onChange={onButtonChange}
          id="tags"
        />
        <Form.Field
          label="Urls"
          control="input"
          type="radio"
          name="htmlRadios"
          onChange={onButtonChange}
          id="urls"
        />
      </Form.Group>
      <Form.Group grouped>
        <label>Sort by Popularity</label>
        <Form.Field label="" control="input" type="checkbox" onChange= {onPopularChange}/>
      </Form.Group>
    </Form>
  );
};

export default Searchbar;
