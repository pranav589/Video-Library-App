import React, { useState } from "react";
import { Input } from "../CommentList/styles";
import { CloseIcon, InputTag, Tag, TagTitle, Tags } from "./styles";
import InputBox from "../InputBox/InputBox";
const InputTags = ({ tags, setTags }) => {
  const [text, setText] = useState("");

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      setText("");
    }
  };
  return (
    <InputTag>
      <InputBox
        type="text"
        value={text}
        name="Enter your tag and press enter"
        onChange={(e) => setText(e.target.value)}
        onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
        placeholder="Press enter to add tags"
      />
      {tags?.length > 0 && (
        <Tags>
          {tags.map((tag, index) => (
            <Tag key={index} className="tag">
              <TagTitle className="tag-title">{tag}</TagTitle>
              <CloseIcon
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </CloseIcon>
            </Tag>
          ))}
        </Tags>
      )}
    </InputTag>
  );
};

export default InputTags;
