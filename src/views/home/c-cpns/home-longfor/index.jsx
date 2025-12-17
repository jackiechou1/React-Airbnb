import LongForItem from "@/components/longfor-item";
import SectionHeader from "@/components/section-header";
import PropTypes from "prop-types";
import React, { memo } from "react";
import Slider from "react-slick";
import { LongforWrapper } from "./style";

const HomeLongfor = memo((props) => {
  const { initData } = props;
  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <LongforWrapper>
      <SectionHeader title={initData.title} subtitle={initData.subtitle} />
      <Slider {...settings}>
        {initData.list?.map((item, idx) => {
          return (
            <div className="slide" key={idx}>
              <LongForItem itemData={item} />
            </div>
          );
        })}
      </Slider>
    </LongforWrapper>
  );
});

HomeLongfor.propTypes = {
  initData: PropTypes.object,
};

export default HomeLongfor;
