import React, { memo } from "react";
import { FooterWrapper } from "./style";
import footerData from "@/assets/data/footer.json";

const FOOTER_LINKS = [
  // 爱彼迎
  [
    "https://careers.airbnb.com/", // 工作机会
    "https://news.airbnb.com/", // 爱彼迎新闻
    "https://www.airbnb.com/help", // 政策
    "https://www.airbnb.com/accessibility", // 无障碍设施
  ],
  // 发现
  [
    "https://www.airbnb.com/trust", // 信任与安全
    "https://www.airbnb.com/", // 旅行基金（占位）
    "https://www.airbnb.com/work", // 商务差旅
    "https://news.airbnb.com/", // 爱彼迎杂志（占位）
    "https://www.airbnb.org/", // Airbnb.org
  ],
  // 出租
  [
    "https://www.airbnb.com/host/homes", // 为什么要出租
    "https://www.airbnb.com/resources/hosting-homes", // 待客之道
    "https://www.airbnb.com/help/article/1385", // 房东义务
    "https://www.airbnb.com/host/experiences", // 开展体验
    "https://www.airbnb.com/resources", // 资源中心
  ],
  // 客服支持
  [
    "https://www.airbnb.com/help", // 帮助
    "https://www.airbnb.com/neighbors", // 邻里支持
  ],
];

function getFooterHref(sectionIndex, itemIndex) {
  return FOOTER_LINKS?.[sectionIndex]?.[itemIndex] || "https://www.airbnb.com/";
}

const AppFooter = memo(() => {
  return (
    <FooterWrapper>
      <div className="wrapper">
        <div className="service">
          {footerData.map((item, sectionIndex) => {
            return (
              <div className="item" key={item.name}>
                <div className="name">{item.name}</div>
                <div className="list">
                  {item.list.map((iten, itemIndex) => {
                    return (
                      <a
                        className="iten"
                        key={iten}
                        href={getFooterHref(sectionIndex, itemIndex)}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {iten}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="statement">
          © 2022 Airbnb, Inc. All rights reserved.条款 · 隐私政策 · 网站地图 ·
          全国旅游投诉渠道 12301
        </div>
      </div>
    </FooterWrapper>
  );
});

export default AppFooter;
