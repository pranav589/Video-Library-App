import React from "react";
import {
  Channel,
  ChannelDetail,
  ChannelInfo,
} from "../VideoChannelInfo/styles";
import Skeleton from "react-loading-skeleton";

function SkeletonVideoChannelInfo() {
  return (
    <Channel>
      <ChannelInfo>
        <Skeleton circle width={36} height={36} />
        <ChannelDetail>
          <Skeleton width={200} height={15} />
          <Skeleton width={150} height={15} />
          <Skeleton width={400} height={20} />
        </ChannelDetail>
      </ChannelInfo>
      <Skeleton width={150} height={40} />
    </Channel>
  );
}

export default SkeletonVideoChannelInfo;
