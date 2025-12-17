import PropTypes from "prop-types";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { ItemWrapper } from "./style";

const LongForItem = memo((props) => {
  const { itemData } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    if (!itemData?.city) return;
    navigate(`/entire?keyword=${encodeURIComponent(itemData.city)}`);
  };
  return (
    <ItemWrapper onClick={handleClick} role="button" tabIndex={0}>
      <div className="inner">
        <img className="cover" src={itemData.picture_url} alt="" />
        <div className="bg-cover"></div>
        <div className="info">
          <div className="city">{itemData.city}</div>
          <div className="price">均价 {itemData.price}</div>
        </div>
      </div>
    </ItemWrapper>
  );
});

LongForItem.propTypes = {
  itemData: PropTypes.object,
};

export default LongForItem;
