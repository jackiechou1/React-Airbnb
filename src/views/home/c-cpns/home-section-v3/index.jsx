import ScrollView from "@/base-ui/scroll-view";
import RoomItem from "@/components/room-item";
import SectionFooter from "@/components/section-footer";
import SectionHeader from "@/components/section-header";
import PropTypes from "prop-types";
import React, { memo, useCallback, useState } from "react";
import { SectionWrapper } from "./style";
import ImagePreview from "@/components/image-preview";
const HomeSectionV3 = memo((props) => {
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
    <SectionWrapper>
      <SectionHeader title={initData.title} subtitle={initData.subtitle} />
      <ScrollView>
        {initData?.list?.map((item) => {
          return (
            <RoomItem
              itemData={item}
              itemWidth="20%"
              key={item.id}
              enableImagePreview
              onPreview={handlePreview}
            />
          );
        })}
      </ScrollView>

      <SectionFooter name="Plus" />
      <ImagePreview
        open={previewOpen}
        images={previewImages}
        initialIndex={previewIndex}
        onClose={() => setPreviewOpen(false)}
      />
    </SectionWrapper>
  );
});

HomeSectionV3.propTypes = {
  initData: PropTypes.object,
};

export default HomeSectionV3;
