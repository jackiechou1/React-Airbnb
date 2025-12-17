import PropTypes from "prop-types";
import React, { memo, useState, useCallback } from "react";
import { SectionV2Wrapper } from "./style";
import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionTabs from "@/components/section-tabs";
import SectionFooter from "@/components/section-footer";
import ImagePreview from "@/components/image-preview";
const HomeSectionV2 = memo((props) => {
  const { initData } = props;
  const tabsName = initData.dest_address?.map((item) => item.name);
  const initTabName = initData.dest_address?.[0].name;
  const [name, setName] = useState(initTabName);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);
  console.log(name);
  const handleTabClick = useCallback((name) => {
    setName(name);
  }, []);

  const handlePreview = useCallback((itemData, index = 0) => {
    const imgs = itemData?.picture_urls?.length ? itemData.picture_urls : [itemData?.picture_url];
    setPreviewImages(imgs.filter(Boolean));
    setPreviewIndex(index);
    setPreviewOpen(true);
  }, []);

  return (
    <SectionV2Wrapper>
      <SectionHeader title={initData.title} subtitle={initData.subtitle} />
      <SectionTabs tabsName={tabsName} tabClick={handleTabClick} />
      <SectionRooms
        roomList={initData?.dest_list?.[name]}
        itemWidth="33.33%"
        enableImagePreview
        onPreview={handlePreview}
      />
      <SectionFooter name={name} />
      <ImagePreview
        open={previewOpen}
        images={previewImages}
        initialIndex={previewIndex}
        onClose={() => setPreviewOpen(false)}
      />
    </SectionV2Wrapper>
  );
});

HomeSectionV2.propTypes = {
  initData: PropTypes.object,
};

export default HomeSectionV2;
