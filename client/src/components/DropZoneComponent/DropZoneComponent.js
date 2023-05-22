import React from "react";
import Dropzone from "react-dropzone";
import { DroppableArea, Wrapper } from "./styles";
import { MdPublish } from "react-icons/md";
import PreviewCard from "../PreviewCard/PreviewCard";

function DropZoneComponent({
  text,
  type,
  onDrop,
  accept,
  preview,
  removePreview,
}) {
  const previewType = {
    Thumbnail: (
      <PreviewCard
        type={"Thumbnail"}
        src={preview}
        onBadgeClick={removePreview}
      />
    ),
    Video: (
      <PreviewCard type={"Video"} src={preview} onBadgeClick={removePreview} />
    ),
  };
  return (
    <Wrapper>
      {preview ? (
        [type] && previewType[type]
      ) : (
        <Dropzone
          onDrop={onDrop}
          multiple={false}
          maxSize={800000000}
          style={{ height: "240px" }}
          accept={accept}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <DroppableArea>
                <input {...getInputProps()} />
                <h2>{type}</h2>
                <div
                  style={{
                    backgroundColor: "#EBEBEB",
                    borderRadius: "50%",
                    padding: 30,
                  }}
                >
                  <MdPublish size={32} color="#949494" />
                </div>
                <h4>{text}</h4>
              </DroppableArea>
            </div>
          )}
        </Dropzone>
      )}
    </Wrapper>
  );
}

export default DropZoneComponent;
