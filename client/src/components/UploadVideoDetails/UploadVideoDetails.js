import React from "react";
import {
  Container,
  GeneratedImage,
  InfoValue,
  Label,
  LeftHeading,
  LeftLowerSection,
  LeftSection,
  RightSection,
  TagsSection,
  ThumbnailContainer,
  ThumbnailSubText,
  ThumbnailTitle,
  ThumbnailUpload,
  ThumbnailWrapper,
  ThumbnailsGenerated,
  UploadText,
  VideoInfoContainer,
  VideoMediaContainer,
} from "./styles";
import InputBox from "../InputBox/InputBox";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import { IoImagesOutline } from "react-icons/io5";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  generateVideoThumbnails,
  importFileandPreview,
} from "../../utils/generateThumbnail";
import InputTags from "../InputTags/InputTags";
function UploadVideoDetails({ videoFile, setVideoFile }) {
  const ref = useRef();
  const [file, setFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [thumbnails, setThumbnails] = useState([]);

  const handleSelectFile = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setVideoThumb(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (videoFile) {
      importFileandPreview(videoFile).then((res) => {
        setVideoUrl(res);
      });

      generateVideoThumbnails(videoFile, 2).then((thumbs) => {
        setThumbnails(thumbs);
      });
    }
  }, [videoFile]);

  return (
    <Container>
      <LeftSection>
        <LeftHeading>Details</LeftHeading>
        <LeftLowerSection>
          <InputBox placeholder="Title (required)" required={true} />
          <CustomTextArea placeholder={"Description"} />
          <ThumbnailContainer>
            <ThumbnailTitle>Thumbnail</ThumbnailTitle>
            <ThumbnailSubText>
              Select or upload a picture that shows what's in your video. A good
              thumbnail stands out and draws viewers' attention.
            </ThumbnailSubText>
            <ThumbnailWrapper>
              <input
                type="file"
                id="uploadBtn"
                hidden
                ref={ref}
                onChange={handleSelectFile}
              />
              <ThumbnailUpload onClick={() => ref.current.click()}>
                <IoImagesOutline color="#606060" />
                <UploadText>Upload Thumbnail</UploadText>
              </ThumbnailUpload>
              <ThumbnailsGenerated>
                {thumbnails.map((item) => {
                  return (
                    <GeneratedImage
                      src={item}
                      alt=""
                      onClick={() => {
                        setVideoThumb(item);
                        // window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  );
                })}
              </ThumbnailsGenerated>
            </ThumbnailWrapper>
            <TagsSection>
              <ThumbnailTitle>Tags</ThumbnailTitle>
              <InputTags />
            </TagsSection>
          </ThumbnailContainer>
        </LeftLowerSection>
      </LeftSection>
      <RightSection>
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

export default UploadVideoDetails;
