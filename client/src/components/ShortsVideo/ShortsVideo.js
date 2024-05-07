import { useContext, useEffect, useRef, useState } from "react";
import {
  Controls,
  DisLike,
  Foot,
  Like,
  Reaction,
  Reel,
  ReelVideo,
  Title,
  UserInfo,
  Video,
} from "./styles";
import {
  IoPlayOutline,
  IoPauseOutline,
  IoVolumeHighOutline,
  IoVolumeOffOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import _debounce from "lodash/debounce";
import { AuthContext } from "../../context/UserContext";
import SubscriptionButton from "../SubscriptionButton/SubscriptionButton";

function ShortsVideo({ short, shortContainerRef }) {
  const userState = useContext(AuthContext);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const playPauseRef = useRef();
  const videoRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(true);

  useEffect(() => {
    const debouncedHandleVideo = _debounce(handleVideo, 300);
    shortContainerRef.current.addEventListener("scroll", debouncedHandleVideo);
    setIsPlaying(!videoRef.current.paused);
    setIsMuted(videoRef.current.muted);

    window.addEventListener("blur", () => {
      if (isActiveVideo(videoRef)) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    });

    window.addEventListener("focus", () => {
      if (isActiveVideo(videoRef)) {
        const resp = videoRef.current.play();
        if (resp !== undefined) {
          resp
            .then((_) => {
              // autoplay starts!
              setIsPlaying(true);
            })
            .catch((error) => {
              //show error
              setIsPlaying(true);
            });
        }
      }
    });

    const copy = shortContainerRef.current;
    return () => {
      // Clean up event listeners
      copy.removeEventListener("scroll", debouncedHandleVideo);
    };
  }, [shortContainerRef]);

  async function handleVideo() {
    if (!videoRef.current) return;
    const videoTop = videoRef?.current?.getBoundingClientRect()?.top;

    if (videoTop > 0 && videoTop <= 150) {
      try {
        const promise = videoRef?.current?.play();
        if (promise !== undefined) {
          promise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(() => {
              videoRef.current.muted = true;
              videoRef?.current?.play();
              setIsPlaying(true);
            });
        }
      } catch (error) {
        setIsPlaying(false);
        videoRef?.current?.pause();
      }
    } else {
      videoRef.current.currentTime = 0;
      videoRef?.current?.pause();
    }
  }

  const [isUnSubscribeLoading, setIsUnSubscribeLoading] = useState(false);

  useEffect(() => {
    const validateIsSubscribed =
      userState?.userData?.Data?.user?.subscribedUsers?.some(
        (user) => user === short?.author?._id
      );

    if (validateIsSubscribed) {
      setIsSubscribed(true);
    }
  }, [
    short?.author?._id,
    userState?.userData?.Data?.user._id,
    userState?.userData?.Data?.user?.subscribedUsers,
  ]);

  return (
    <Reel className="reel">
      <ReelVideo className="reel-video">
        <Video className="video">
          {/* <div className="video-con"> */}
          <video
            style={{
              height: "100%",
              width: "100%",
            }}
            ref={videoRef}
            onClick={function (e) {
              if (!isPlaying) {
                videoRef.current.play();
                setIsPlaying(true);
              } else {
                videoRef.current.pause();
                setIsPlaying(false);
              }
            }}
            disableRemotePlayback
            playsInline
            loop
            src={short?.shortsURL ?? ""}
          ></video>
          {/* </div> */}
          <Controls className="controls">
            <span
              onClick={() => {
                if (!isPlaying) {
                  videoRef.current.play();
                  setIsPlaying(true);
                } else {
                  videoRef.current.pause();
                  setIsPlaying(false);
                }
              }}
            >
              {isPlaying ? (
                <IoPauseOutline color="#fff" fontSize={"1.5rem"} />
              ) : (
                <IoPlayOutline color="#fff" fontSize={"1.5rem"} />
              )}
            </span>
            <span
              onClick={() => {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
              }}
            >
              {isMuted ? (
                <IoVolumeOffOutline color="#fff" fontSize={"1.5rem"} />
              ) : (
                <IoVolumeHighOutline color="#fff" fontSize={"1.5rem"} />
              )}
            </span>
          </Controls>
          <div
            ref={playPauseRef}
            onClick={() => {
              videoRef.current.play();
              setIsPlaying(true);
            }}
            className={`play-pause ${isPlaying ? "" : "show-play-pause"}`}
          >
            <IoPlayOutline color="#fff" fontSize={"1.5rem"} />
          </div>
          <Foot className="foot">
            <Title className="title">{short?.title}</Title>
            <UserInfo className="user-info">
              <div>
                <img src={short?.author?.avatar} alt="" />
                <span>{short?.author?.name}</span>
              </div>
              <SubscriptionButton
                channelId={short?.author?._id}
                isSubscribed={isSubscribed}
                setIsSubscribed={setIsSubscribed}
                loadingState={isUnSubscribeLoading}
                setIsLoadingState={setIsUnSubscribeLoading}
              />
            </UserInfo>
          </Foot>
        </Video>
        <Reaction className="reaction">
          <div
            className=""
            onClick={() => {
              setIsLiked(!isLiked);
            }}
          >
            {isLiked ? (
              <Like className="like">
                <IoHeart name="heart" fontSize={"1.5rem"}></IoHeart>
              </Like>
            ) : (
              <DisLike className="unlike">
                <IoHeartOutline
                  name="heart-outline"
                  fontSize={"1.5rem"}
                ></IoHeartOutline>
              </DisLike>
            )}

            <span className="value">{123}</span>
          </div>
        </Reaction>
      </ReelVideo>
    </Reel>
  );
}

function isActiveVideo(videoRef) {
  if (!videoRef?.current) return;
  const videoTop = videoRef?.current?.getBoundingClientRect()?.top;
  return videoTop > 0 && videoTop <= 150;
}

export default ShortsVideo;
