import React, { memo } from "react";
import { PaginationWrapper } from "./style";
import { Pagination } from "@mui/material";
import { useI18n } from "@/i18n";

const EntirePagination = memo(({ currentPage, totalCount, pageSize, onChange }) => {
  const { t } = useI18n();
  const pages = Math.max(1, Math.ceil(totalCount / pageSize));
  if (!totalCount) return null;
  const startCount = (currentPage - 1) * pageSize + 1;
  const endCount = Math.min(totalCount, startCount + pageSize - 1);

  const handleChange = (e, val) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    onChange(val);
  };

  return (
    <PaginationWrapper>
      <div className="pagination">
        <Pagination count={pages} page={currentPage} onChange={handleChange} />
        <div className="info">
          {t("entire.paginationInfoPrefix")} {startCount} - {endCount} {t("entire.paginationInfoSuffix")} {totalCount}
          {t("entire.paginationInfoTotalSuffix")}
        </div>
      </div>
    </PaginationWrapper>
  );
});

export default EntirePagination;
