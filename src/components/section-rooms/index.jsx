import PropTypes from "prop-types";
import React, { memo } from "react";
import RoomItem from "@/components/room-item";
import { RoomListWrapper } from "./style";
const SectionRooms = memo((props) => {
  const { roomList = [], itemWidth, enableImagePreview, onPreview } = props;
  return (
    <RoomListWrapper>
      {roomList?.slice(0, 8).map((item) => {
        return (
          <RoomItem
            itemData={item}
            key={item.id}
            itemWidth={itemWidth}
            enableImagePreview={enableImagePreview}
            onPreview={onPreview}
          />
        );
      })}
    </RoomListWrapper>
  );
});

SectionRooms.propTypes = {
  roomList: PropTypes.array,
  enableImagePreview: PropTypes.bool,
  onPreview: PropTypes.func,
};

export default SectionRooms;
