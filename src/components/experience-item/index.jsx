import React, { memo } from "react";
import { ExperienceItemWrapper } from "./style";

const ExperienceItem = memo(({ data }) => {
  return (
    <ExperienceItemWrapper>
      <div className="cover">
        <img src={data.coverUrl} alt={data.title} />
      </div>
      <div className="content">
        <div className="title">{data.title}</div>
        <div className="meta">
          <span className="city">{data.city}</span>
          <span className="rating">★ {data.rating}</span>
        </div>
        <div className="tags">
          {data.tags?.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="price">¥ {data.price}</div>
      </div>
    </ExperienceItemWrapper>
  );
});

export default ExperienceItem;
