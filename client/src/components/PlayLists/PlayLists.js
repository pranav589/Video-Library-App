import React, { useEffect, useState } from "react";
import CheckBoxComponent from "../CheckBoxComponent/CheckBoxComponent";
import InputBox from "../InputBox/InputBox";
import CustomButton from "../CustomButton/CustomButton";
import Modal from "../Modal/Modal";
import { apiCall } from "../../utils/apiCall";
import { toast } from "react-toastify";
import { PlayListButtons, PlayListsData, Text } from "./styles";
import SmallLoader from "../../SmallLoader/SmallLoader";

function PlayLists({
  data = null,
  showModal = false,
  setShowModal = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [playLists, setPlayLists] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [playListValue, setPlayListValue] = useState("");
  const [triggerPlayListCall, setTriggerPlayListCall] = useState(false);

  useEffect(() => {
    const fetchPlayLists = async () => {
      try {
        setIsLoading(true);
        const res = await apiCall("GET", "playList", token);
        if (res?.data?.status === "success") {
          setIsLoading(false);
          setPlayLists(res?.data?.Data);
          const checkedItems = res?.data?.Data.map((playList) =>
            playList.videos.includes(data?._id) ? playList._id : null
          );
          setCheckedItems(checkedItems.filter((item) => item !== null));
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
        setIsLoading(false);
      }
    };
    showModal && fetchPlayLists();
  }, [token, triggerPlayListCall, data?._id, showModal]);

  const addVideoToPlayList = async (playListId) => {
    try {
      const payLoad = {
        videoId: data?._id,
        playListId: playListId,
      };
      const res = await apiCall(
        "PUT",
        "playList/addToPlayList",
        token,
        payLoad
      );

      if (res?.data?.status === "success") {
        // setCheckBoxState({
        //   ...checkBoxState,
        //   isLoading: false,
        //   isChecked: true,
        // });
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      //   setCheckBoxState({ ...checkBoxState, isLoading: false, isChecked: true });
    }
  };

  const removeVideoFromPlayList = async (playListId) => {
    try {
      //   setCheckBoxState({ ...checkBoxState, isChecked: false, isLoading: true });
      const payLoad = {
        videoId: data?._id,
        playListId: playListId,
      };
      const res = await apiCall(
        "PUT",
        "playList/removeFromPlayList",
        token,
        payLoad
      );

      if (res?.data?.status === "success") {
        // setCheckBoxState({
        //   ...checkBoxState,
        //   isLoading: false,
        //   isChecked: false,
        // });
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      //   setCheckBoxState({
      //     ...checkBoxState,
      //     isLoading: false,
      //     isChecked: false,
      //   });
    }
  };

  const handleCheckboxChange = async (e, playList) => {
    const updatedCheckedItems = [...checkedItems];
    const playlistIndex = updatedCheckedItems.indexOf(playList?._id);

    if (e.target.checked && playlistIndex === -1) {
      // Checkbox is checked and playlist ID is not in the array
      updatedCheckedItems.push(playList?._id);
      await addVideoToPlayList(playList?._id); // Call the API to add the video
    } else if (!e.target.checked && playlistIndex !== -1) {
      // Checkbox is unchecked and playlist ID is in the array
      updatedCheckedItems.splice(playlistIndex, 1);
      await removeVideoFromPlayList(playList?._id); // Call the API to remove the video
    }

    setCheckedItems(updatedCheckedItems);
  };

  console.log({ checkedItems });

  const createNewPlayList = async () => {
    try {
      const payLoad = {
        name: playListValue,
      };
      setIsLoading(true);
      const res = await apiCall("POST", "playList/create", token, payLoad);
      if (res?.data?.status === "success") {
        setIsLoading(false);
        toast.success("New PlayList Created!");
        setTriggerPlayListCall(!triggerPlayListCall);
        setPlayListValue("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.err);
      setIsLoading(false);
    }
  };

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <PlayListsData>
        <Text>PlayLists</Text>
        {isLoading ? (
          <div style={{ margin: "10px auto" }}>
            <SmallLoader />
          </div>
        ) : (
          playLists?.map((playList) => (
            <label key={playList?._id}>
              <CheckBoxComponent
                onChange={(e) => handleCheckboxChange(e, playList)}
                name={playList?.name}
                checked={checkedItems.includes(playList._id)}
              />
              <span style={{ marginLeft: 8 }}>{playList?.name}</span>
            </label>
          ))
        )}
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
    </Modal>
  );
}

export default PlayLists;
