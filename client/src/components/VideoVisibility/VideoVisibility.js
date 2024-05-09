import React, { useEffect } from "react";
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

function VideoVisibility({
  videoThumb,
  videoUploadData,
  setVideoUploadData,
  uploadedVideoUrl,
}) {
  const [visibilityValue, setVisibilityValue] = useState("");

  const handleChange = (e) => {
    setVisibilityValue(e.currentTarget.value);
    setVideoUploadData({ ...videoUploadData, status: e.currentTarget.value });
  };

  useEffect(() => {
    if (videoUploadData.status) {
      setVisibilityValue(videoUploadData.status);
    }
  }, [videoUploadData.status]);

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
            src={uploadedVideoUrl}
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
