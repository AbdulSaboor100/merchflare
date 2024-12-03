import React, { useEffect, useRef, useState } from "react";
import styles from "./HomeSideBar.module.scss";
import {
  TextField,
  Typography,
  Box,
  Input,
  InputAdornment,
  MenuItem,
  Button,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const marketPlace = [
  {
    value: "usa",
    label: "United States",
  },
  {
    value: "uk",
    label: "United Kingdom",
  },
  {
    value: "aus",
    label: "Australia",
  },
  {
    value: "ca",
    label: "Canada",
  },
];
const sortBy = [
  {
    value: "bestSellerRank",
    label: "Best Seller Rank",
  },
  {
    value: "leastSellerRank",
    label: "Least Seller Rank",
  },
];

const HomeSideBar = ({
  filters,
  setFilters,
  data,
  merchData,
  setMerchData,
}) => {
  const [isDatePickerActive, setIsDatePickerActive] = useState(false);
  const handleDataMinMax = (filterData, fieldName1, fieldName2) => {
    return filterData?.filter((d, i) => {
      let dField = parseFloat(d[fieldName2]?.replace(/,/g, ""));
      if (
        Number(filters[fieldName1]?.min) > 0 &&
        Number(filters[fieldName1]?.max) <= 0
      ) {
        return Number(dField) >= Number(filters[fieldName1]?.min);
      }
      if (
        Number(filters[fieldName1]?.max) > 0 &&
        Number(filters[fieldName1]?.min) <= 0
      ) {
        return Number(filters[fieldName1]?.max) >= Number(dField);
      }
      if (
        Number(filters[fieldName1]?.min) > 0 &&
        Number(filters[fieldName1]?.max) > 0
      ) {
        return (
          Number(dField) >= Number(filters[fieldName1]?.min) &&
          Number(filters[fieldName1]?.max) >= Number(dField)
        );
      }
    });
  };

  const handleSearchProducts = () => {
    let mainFilterData = [...data];
    if (
      filters?.title &&
      filters?.sortBy?.toUpperCase() != "BESTSELLERRANK" &&
      filters?.sortBy?.toUpperCase() != "LEASTSELLERRANK"
    ) {
      const filteredData = data?.filter((d, i) =>
        d?.title?.toUpperCase()?.includes(filters?.title?.toUpperCase())
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }
    if (filters?.title && filters?.sortBy?.toUpperCase() == "BESTSELLERRANK") {
      const filteredData = data?.filter((d, i) =>
        d?.title?.toUpperCase()?.includes(filters?.title?.toUpperCase())
      );
      filteredData?.sort(
        (a, b) => Number(b?.reviewCount) - Number(a?.reviewCount)
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }
    if (filters?.title && filters?.sortBy?.toUpperCase() == "LEASTSELLERRANK") {
      const filteredData = data?.filter((d, i) =>
        d?.title?.toUpperCase()?.includes(filters?.title?.toUpperCase())
      );
      filteredData?.sort(
        (a, b) => Number(a?.reviewCount) - Number(b?.reviewCount)
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }
    // Title

    if (
      filters?.sortBy?.toUpperCase() == "BESTSELLERRANK" &&
      filters?.sortBy?.toUpperCase() != "LEASTSELLERRANK" &&
      !filters?.title
    ) {
      const filteredData = [...data];
      filteredData?.sort(
        (a, b) => Number(b?.reviewCount) - Number(a?.reviewCount)
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }
    if (
      filters?.sortBy?.toUpperCase() == "BESTSELLERRANK" &&
      filters?.sortBy?.toUpperCase() != "LEASTSELLERRANK" &&
      filters?.title
    ) {
      const filteredData = data?.filter((d, i) =>
        d?.title?.toUpperCase()?.includes(filters?.title?.toUpperCase())
      );
      filteredData?.sort(
        (a, b) => Number(b?.reviewCount) - Number(a?.reviewCount)
      );

      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }

    if (
      filters?.sortBy?.toUpperCase() == "LEASTSELLERRANK" &&
      filters?.sortBy?.toUpperCase() != "BESTSELLERRANK" &&
      !filters?.title
    ) {
      const filteredData = [...data];
      filteredData?.sort(
        (a, b) => Number(a?.reviewCount) - Number(b?.reviewCount)
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }
    if (
      filters?.sortBy?.toUpperCase() == "LEASTSELLERRANK" &&
      filters?.sortBy?.toUpperCase() != "BESTSELLERRANK" &&
      filters?.title
    ) {
      const filteredData = data?.filter((d, i) =>
        d?.title?.toUpperCase()?.includes(filters?.title?.toUpperCase())
      );
      filteredData?.sort(
        (a, b) => Number(a?.reviewCount) - Number(b?.reviewCount)
      );
      mainFilterData = [...filteredData];
      setMerchData(mainFilterData);
    }

    if (
      Number(filters?.priceRange?.min) > 0 ||
      Number(filters?.priceRange?.max) > 0
    ) {
      mainFilterData = [
        ...handleDataMinMax(mainFilterData, "priceRange", "price"),
      ];
    }
    if (
      Number(filters?.avg30Bsr?.min) > 0 ||
      Number(filters?.avg30Bsr?.max) > 0
    ) {
      mainFilterData = [
        ...handleDataMinMax(mainFilterData, "avg30Bsr", "avg30bsr"),
      ];
    }
    if (
      Number(filters?.reviewsRange?.min) > 0 ||
      Number(filters?.reviewsRange?.max) > 0
    ) {
      mainFilterData = [
        ...handleDataMinMax(mainFilterData, "reviewsRange", "reviews"),
      ];
    }
    if (
      Number(filters?.salesRange?.min) > 0 ||
      Number(filters?.salesRange?.max) > 0
    ) {
      mainFilterData = [
        ...handleDataMinMax(mainFilterData, "salesRange", "sales"),
      ];
    }
    if (filters?.publishedAfter) {
      const filteredData = mainFilterData?.filter((d) =>
        dayjs(d?.published)?.isAfter(dayjs(filters?.publishedAfter))
      );
      mainFilterData = [...filteredData];
    }

    setMerchData(mainFilterData);
  };

  useEffect(() => {
    // datePickerRef.current.children[0].children[1].placeholder = "All Time";
  }, []);

  return (
    <div className={styles.home_side_bar_container}>
      <div className={styles.selection_container}>
        <Box className={styles.select_box}>
          <TextField
            label="Title"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
            value={filters?.title}
            onChange={(e) =>
              setFilters((f) => ({ ...f, title: e?.target?.value }))
            }
          />
        </Box>
        <Box className={styles.select_box}>
          <TextField
            label="Marketplace"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
            select
            value={filters?.marketPlace}
            onChange={(e) =>
              setFilters((f) => ({ ...f, marketPlace: e?.target?.value }))
            }
          >
            {marketPlace?.map((option) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box className={styles.select_box}>
          <TextField
            label="Sort By"
            defaultValue=" "
            size="small"
            sx={{ width: "100%" }}
            select
            value={filters?.sortBy}
            onChange={(e) =>
              setFilters((f) => ({ ...f, sortBy: e?.target?.value }))
            }
          >
            {sortBy?.map((option) => (
              <MenuItem key={option?.value} value={option?.value}>
                {option?.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </div>
      <div className={styles.filter_container}>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Price Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
              value={filters?.priceRange?.min}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  priceRange: { ...f?.priceRange, min: e?.target?.value },
                }))
              }
            />
            <TextField
              label="Max"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
              value={filters?.priceRange?.max}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  priceRange: { ...f?.priceRange, max: e?.target?.value },
                }))
              }
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Average 30-Day BSR Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
              value={filters?.avg30Bsr?.min}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  avg30Bsr: { ...f?.avg30Bsr, min: e?.target?.value },
                }))
              }
            />
            <TextField
              label="Max"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
              value={filters?.avg30Bsr?.max}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  avg30Bsr: { ...f?.avg30Bsr, max: e?.target?.value },
                }))
              }
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Reviews Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
              value={filters?.reviewsRange?.min}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  reviewsRange: { ...f?.reviewsRange, min: e?.target?.value },
                }))
              }
            />
            <TextField
              label="Max"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
              value={filters?.reviewsRange?.max}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  reviewsRange: { ...f?.reviewsRange, max: e?.target?.value },
                }))
              }
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Sales Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
              value={filters?.salesRange?.min}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  salesRange: { ...f?.salesRange, min: e?.target?.value },
                }))
              }
            />
            <TextField
              label="Max"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
              value={filters?.salesRange?.max}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  salesRange: { ...f?.salesRange, max: e?.target?.value },
                }))
              }
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Sales Rank Range</Typography>
          <Box className={styles.input_container}>
            <TextField
              label="Min"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%" }}
              value={filters?.salesRankRange?.min}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  salesRankRange: {
                    ...f?.salesRankRange,
                    min: e?.target?.value,
                  },
                }))
              }
            />
            <TextField
              label="Max"
              // defaultValue="0"
              size="small"
              sx={{ width: "100%", marginLeft: "16px" }}
              value={filters?.salesRankRange?.max}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  salesRankRange: {
                    ...f?.salesRankRange,
                    max: e?.target?.value,
                  },
                }))
              }
            />
          </Box>
        </Box>
        <Box className={styles.range_filter}>
          <Typography variant="caption">Published After</Typography>

          <Box className={styles.date_container}>
            <TextField
              size="small"
              sx={{ width: "100%" }}
              value={
                filters?.publishedAfter
                  ? dayjs(filters?.publishedAfter)?.format("DD/MM/YYYY")
                  : "All Time"
              }
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className={styles.start_adornment}
                        onClick={() =>
                          setIsDatePickerActive((isDate) => !isDate)
                        }
                      >
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {isDatePickerActive && (
              <div className={styles.static_date}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <StaticDatePicker
                    onAccept={(e) => {
                      setIsDatePickerActive(false);
                      setFilters((f) => ({
                        ...f,
                        publishedAfter: e.valueOf(),
                      }));
                    }}
                    onError={() => {
                      setIsDatePickerActive(false);
                    }}
                    onClose={() => {
                      setIsDatePickerActive(false);
                    }}
                    // defaultValue={dayjs("2022-04-17")}
                    // value={dayjs(filters?.publishedAfter)}
                    // onChange={(e) => {
                    //   setFilters((f) => ({
                    //     ...f,
                    //     publishedAfter: e.valueOf(),
                    //   }));
                    // }}
                  />
                </LocalizationProvider>
              </div>
            )}
          </Box>
        </Box>
        <Button
          size="large"
          sx={{ width: "100%", marginTop: "16px" }}
          onClick={handleSearchProducts}
        >
          Search Products
        </Button>
      </div>
    </div>
  );
};

export default HomeSideBar;
