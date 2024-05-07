import React from "react";
import {
  Container,
  InfoValue,
  Label,
  LeftHeading,
  LeftSection,
  RightSection,
  VideoInfoContainer,
  VideoMediaContainer,
} from "../UploadVideoDetails/styles";
import {
  LeftLowerSection,
  LeftSubText,
  RadioContainer,
  RadioLabel,
  RadioSubtext,
  RadioTextContent,
  RadioWrap,
  SavePublishInfo,
  SavePublishSubText,
} from "./styles";
import { useState } from "react";

const visibilityTypes = [
  {
    name: "Private",
    value: "private",
    subText: "Only you and people you choose can watch your video",
  },
  {
    name: "Unlisted",
    value: "unlisted",
    subText: "Anyone with the video link can watch your video",
  },
  {
    name: "Public",
    value: "public",
    subText: "Everyone can watch your video",
  },
];

function VideoVisibility({ videoThumb }) {
  const [visibilityValue, setVisibilityValue] = useState("");

  const handleChange = (e) => {
    // string passed in
    // a string returned by default
    console.log(e.currentTarget.value);
    // add + to the event to make the value a number
    setVisibilityValue(e.currentTarget.value);
  };
  return (
    <Container>
      <LeftSection style={{ flex: 0.9 }}>
        <LeftHeading style={{ margin: "0px" }}>Visibility</LeftHeading>
        <LeftSubText>
          Choose when to publish and who can see your video
        </LeftSubText>
        <LeftLowerSection>
          <SavePublishInfo>Save or publish</SavePublishInfo>
          <SavePublishSubText>
            Make your video public, unlisted, or private
          </SavePublishSubText>
          <RadioContainer>
            {visibilityTypes.map((type) => {
              return (
                <RadioWrap>
                  <input
                    type="radio"
                    value={type.value}
                    name={type.name}
                    onChange={handleChange}
                    checked={visibilityValue === type.value}
                  />
                  <RadioTextContent>
                    <RadioLabel>{type.name}</RadioLabel>
                    <RadioSubtext>{type.subText}</RadioSubtext>
                  </RadioTextContent>
                </RadioWrap>
              );
            })}
          </RadioContainer>
        </LeftLowerSection>
      </LeftSection>
      <RightSection style={{ flex: 0.1 }}>
        <VideoMediaContainer>
          <video
            poster={videoThumb}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={
              "https://firebasestorage.googleapis.com/v0/b/clone-771cc.appspot.com/o/videos%2FCandy%20Crush.mp4?alt=media&token=9a88b1bd-16be-4793-a110-bd917495d4f6"
            }
            controls
          />
        </VideoMediaContainer>
        <VideoInfoContainer>
          <Label>Video Link</Label>
          <InfoValue>sdnsdkhsd</InfoValue>
          <Label>Filename</Label>
          <InfoValue>Some file name</InfoValue>
        </VideoInfoContainer>
      </RightSection>
    </Container>
  );
}

export default VideoVisibility;
