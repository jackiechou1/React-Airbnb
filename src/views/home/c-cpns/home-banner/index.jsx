import React, { memo } from "react";
import Slider from "react-slick";
import { BannerWrapper } from "./style";

const images = [
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=2400&q=80",
  "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=2400&q=80",
];

const HomeBanner = memo(() => {
  return (
    <BannerWrapper>
      <Slider dots infinite autoplay autoplaySpeed={4000} speed={600} arrows={false} pauseOnHover>
        {images.map((src) => (
          <div className="slide" key={src}>
            <img src={src} alt="banner" />
          </div>
        ))}
      </Slider>
    </BannerWrapper>
  );
});

export default HomeBanner;
