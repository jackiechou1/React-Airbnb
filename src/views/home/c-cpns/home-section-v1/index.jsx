import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import { HomeSectionWrapper } from "./style";
import SectionHeader from "@/components/section-header";
import SectionRooms from "@/components/section-rooms";
import SectionFooter from "@/components/section-footer";
import ImagePreview from "@/components/image-preview";
const HomeSectionV1 = memo((props) => {
  const { initData } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handlePreview = useCallback((itemData, index = 0) => {
    const imgs = itemData?.picture_urls?.length ? itemData.picture_urls : [itemData?.picture_url];
    setPreviewImages(imgs.filter(Boolean));
    setPreviewIndex(index);
    setPreviewOpen(true);
  }, []);

  return (
    <HomeSectionWrapper>
      <SectionHeader title={initData.title} subtitle={initData.subtitle} />
      <SectionRooms roomList={initData?.list} enableImagePreview onPreview={handlePreview} />
      <SectionFooter />
      <ImagePreview
        open={previewOpen}
        images={previewImages}
        initialIndex={previewIndex}
        onClose={() => setPreviewOpen(false)}
      />
    </HomeSectionWrapper>
  );
});

HomeSectionV1.propTypes = {
  initData: PropTypes.object,
};

export default HomeSectionV1;
