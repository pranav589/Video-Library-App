import React, { useContext, useEffect, useState } from "react";
import { Button, Buttons, Details, Info } from "./styles";

import SkeletonVideoActions from "../Skeleton/SkeletonVideoActions";
import DateFormatter from "../DateFormatter/DateFormatter";
import LikeDisLike from "../LikeDisLike/LikeDisLike";
import { MdPlaylistAdd } from "react-icons/md";

import PlayLists from "../PlayLists/PlayLists";
import { AuthContext } from "../../context/UserContext";

function VideoActions({ data = {}, loadingState = false }) {
  const [showModal, setShowModal] = useState(false);
  const userState = useContext(AuthContext);
  // Like and DisLike States
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [isDisLikeLoading, setIsDisLikeLoading] = useState(false);

  //PlayLists States

  useEffect(() => {
    const validateIsLiked = data?.likes?.some(
      (like) => like === userState?.userData?.Data?.user?._id
    );

    if (validateIsLiked) {
      setIsLiked(true);
    }
    if (data?.likes) {
      setLikeCount(data?.likes?.length);
    }
  }, [data?.likes, userState?.userData?.Data?.user?._id]);

  useEffect(() => {
    const validateIsDisLiked = data?.disLikes?.some(
      (disLike) => disLike === userState?.userData?.Data?.user?._id
    );
    if (validateIsDisLiked) {
      setIsDisLiked(true);
    }
    if (data?.disLikes) {
      setDisLikeCount(data?.disLikes?.length);
    }
  }, [data?.disLikes, userState?.userData?.Data?.user?._id]);

  if (loadingState) {
    return <SkeletonVideoActions />;
  }

  return (
    <Details>
      <Info>
        {data?.views} views • <DateFormatter date={data?.createdAt} />
      </Info>
      <Buttons>
        <LikeDisLike
          isLiked={isLiked}
          setIsLiked={setIsLiked}
          isDisLiked={isDisLiked}
          setIsDisLiked={setIsDisLiked}
          videoId={data?._id}
          userId={userState?.userData?.Data?.user?._id}
          likeCount={likeCount}
          setLikeCount={setLikeCount}
          disLikeCount={disLikeCount}
          setDisLikeCount={setDisLikeCount}
          isLikeLoading={isLikeLoading}
          setIsLikeLoading={setIsLikeLoading}
          isDisLikeLoading={isDisLikeLoading}
          setIsDisLikeLoading={setIsDisLikeLoading}
        />

        <Button>
          <MdPlaylistAdd size={23} onClick={() => setShowModal(true)} /> Save
        </Button>
      </Buttons>
      <PlayLists
        data={data}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {/* <Modal showModal={showModal} setShowModal={setShowModal}>
        <PlayListsData>
          <Text>PlayLists</Text>
          {playLists?.map((playList) => (
            <label>
              <CheckBoxComponent
                checked={checkBoxState.isChecked}
                onChange={(e) => handleCheckboxChange(e, playList)}
              />
              <span style={{ marginLeft: 8 }}>{playList?.name}</span>
            </label>
          ))}
          <PlayListButtons>
            <InputBox
              name={"Add PlayList"}
              onChange={(e) => setPlayListValue(e.target.value)}
              value={playListValue}
              placeholder="Add PlayList"
            />
            <div style={{ marginLeft: "10px" }}>
              <CustomButton name="Add" handleSubmit={createNewPlayList} />
            </div>
          </PlayListButtons>
        </PlayListsData>
      </Modal> */}
    </Details>
  );
}

export default VideoActions;
