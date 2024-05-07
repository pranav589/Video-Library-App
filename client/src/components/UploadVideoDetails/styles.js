import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  max-height: 500px !important;
  width: 900px;
  padding: 1rem;
  gap: 1rem;
  margin-top: 1rem;
`;

export const LeftSection = styled.aside`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const RightSection = styled.main`
  display: flex;
  flex-direction: column;
`;

export const VideoMediaContainer = styled.div`
  width: 304px;
  height: 171px;
`;

export const VideoInfoContainer = styled.div`
  background-color: #f9f9f9;
  padding: 0px 16px;
`;

export const Label = styled.p`
  font-size: 12px;
  color: #606060;
  margin: 0px;
  margin-top: 8px;
`;

export const InfoValue = styled.p`
  color: #0d0d0d;
  font-size: 15px;
  margin: 0px 0px 8px 0px;
`;

export const LeftHeading = styled.p`
  font-size: 25px;
  color: #212121;
  font-weight: 600;
  margin: 0px 0px 10px 0px;
`;

export const LeftLowerSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ThumbnailContainer = styled.div``;

export const ThumbnailTitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: #0d0d0d;
  padding-bottom: 8px;
  font-weight: 600;
`;

export const ThumbnailSubText = styled.p`
  font-size: 13px;
  color: #606060;
  margin: 0px;
  padding-bottom: 8px;
`;

export const ThumbnailWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ThumbnailUpload = styled.div`
  width: 127px;
  height: 68px;
  border: 1px dashed grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const UploadText = styled.p`
  font-size: 12px;
  color: #606060;
  margin: 5px 0px 0px 0px;
`;

export const ThumbnailsGenerated = styled.div`
  display: flex;
  align-items: center;
`;

export const GeneratedImage = styled.img`
  width: 127px;
  height: 68px;
  margin: 10px;
  cursor: pointer;
  object-fit: contain;
  border: 1px dashed grey;
`;

export const TagsSection = styled.div``;
