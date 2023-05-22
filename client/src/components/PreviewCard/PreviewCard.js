import React from "react";
import {
  PreviewImage,
  PreviewVideo,
  PreviewCardWrapper,
  Badge,
} from "./styles";

function PreviewCard(props) {
  const { type, src, onBadgeClick } = props;
  return (
    <PreviewCardWrapper>
      <Badge onClick={() => onBadgeClick(type)}>x</Badge>
      {type === "Thumbnail" ? (
        <PreviewImage src={src} {...props} />
      ) : (
        <PreviewVideo src={src} {...props} autoPlay controls />
      )}
    </PreviewCardWrapper>
  );
}

export default PreviewCard;
