import { fetchHomeDataAction } from "@/store/modules/home";
import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import HomeBanner from "./c-cpns/home-banner";
import HomeLongfor from "./c-cpns/home-longfor";
import HomeSectionV1 from "./c-cpns/home-section-v1";
import HomeSectionV2 from "./c-cpns/home-section-v2";
import HomeSectionV3 from "./c-cpns/home-section-v3";
import { HomeWrapper } from "./style";
const Home = memo(() => {
  const {
    goodPriceInfo,
    highScoreInfo,
    discountInfo,
    hotRecommendInfo,
    longforInfo,
    plusInfo,
  } = useSelector(
    (state) => ({
      goodPriceInfo: state.home.goodPrice,
      highScoreInfo: state.home.highScore,
      discountInfo: state.home.discount,
      hotRecommendInfo: state.home.hotRecommend,
      longforInfo: state.home.longfor,
      plusInfo: state.home.plus,
    }),
    shallowEqual
  );

  // 派发事件，发送请求
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHomeDataAction());
  }, [dispatch]);
  return (
    <HomeWrapper>
      <HomeBanner />
      <div className="content">
        <section className="section section--warm">
          <HomeLongfor initData={longforInfo} />
        </section>

        {Object.keys(discountInfo).length > 0 && (
          <section className="section section--forest">
            <HomeSectionV2 initData={discountInfo} />
          </section>
        )}

        {Object.keys(hotRecommendInfo).length > 0 && (
          <section className="section section--coastal">
            <HomeSectionV2 initData={hotRecommendInfo} />
          </section>
        )}

        <section className="section">
          <HomeSectionV1 initData={goodPriceInfo} />
        </section>

        <section className="section section--rose">
          <HomeSectionV1 initData={highScoreInfo} />
        </section>

        <section className="section section--dusk">
          <HomeSectionV3 initData={plusInfo} />
        </section>
      </div>
    </HomeWrapper>
  );
});

export default Home;
