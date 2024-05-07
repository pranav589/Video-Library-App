import React, { useEffect, useRef, useState } from "react";

import ShortsVideo from "../../components/ShortsVideo/ShortsVideo";
import { ShortsContainer } from "./styles";
import { toast } from "react-toastify";
import { apiCall } from "../../utils/apiCall";

function Shorts() {
  const shortContainerRef = useRef();
  const [shortVideos, setShortVideos] = useState(null);

  useEffect(() => {
    const fetchAllShorts = async () => {
      try {
        const res = await apiCall("GET", `shorts`);
        if (res?.data?.status === "success") {
          setShortVideos(res?.data?.Data);
        }
      } catch (error) {
        toast.error(error?.response?.data?.err);
      }
    };
    fetchAllShorts();
  }, []);

  return (
    <>
      <ShortsContainer ref={shortContainerRef}>
        {shortVideos?.map((short) => (
          <ShortsVideo
            key={short?._id}
            shortContainerRef={shortContainerRef}
            short={short}
          />
        ))}
      </ShortsContainer>
    </>
  );
}

export default Shorts;
