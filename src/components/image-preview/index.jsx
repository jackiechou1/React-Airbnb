import React, { memo, useEffect, useMemo, useRef } from "react";
import { Modal, Carousel } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { PreviewWrapper } from "./style";

const ImagePreview = memo(({ open, images = [], initialIndex = 0, onClose }) => {
  const carouselRef = useRef(null);

  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);

  useEffect(() => {
    if (!open) return;
    const idx = Math.max(0, Math.min(initialIndex, Math.max(0, safeImages.length - 1)));
    const timer = setTimeout(() => {
      try {
        carouselRef.current?.goTo?.(idx, true);
      } catch (_) {}
    }, 0);
    return () => clearTimeout(timer);
  }, [initialIndex, open, safeImages.length]);

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      onCancel={onClose}
      centered
      width="min(980px, 92vw)"
      styles={{
        content: { padding: 0, background: "transparent", boxShadow: "none" },
        body: { padding: 0 },
        mask: { background: "rgba(0,0,0,0.62)" },
      }}
    >
      <PreviewWrapper>
        <button className="close" type="button" onClick={onClose} aria-label="Close">
          <CloseOutlined />
        </button>

        <div className="panel">
          {safeImages.length <= 1 ? (
            <img className="img" src={safeImages[0]} alt="" />
          ) : (
            <Carousel ref={carouselRef} dots>
              {safeImages.map((src) => (
                <div className="slide" key={src}>
                  <img className="img" src={src} alt="" />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </PreviewWrapper>
    </Modal>
  );
});

export default ImagePreview;
