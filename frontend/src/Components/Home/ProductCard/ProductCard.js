import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./ProductCard.module.scss";
import {
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const bsrData = [
  {
    date: "2024-03-17",
    bsr: null,
    price: 21.99,
  },
  {
    date: "2024-04-13",
    bsr: 572137,
    price: 21.99,
  },
  {
    date: "2024-04-14",
    bsr: 736309,
    price: 21.99,
  },
  {
    date: "2024-04-15",
    bsr: 1005891,
    price: 21.99,
  },
  {
    date: "2024-04-16",
    bsr: 1230018,
    price: 21.99,
  },
  {
    date: "2024-04-17",
    bsr: 1468956,
    price: 21.99,
  },
  {
    date: "2024-04-18",
    bsr: 1700111,
    price: 21.99,
  },
  {
    date: "2024-04-19",
    bsr: 1937027,
    price: 21.99,
  },
  {
    date: "2024-04-20",
    bsr: 2159439,
    price: 21.99,
  },
  {
    date: "2024-04-21",
    bsr: 2360583,
    price: 21.99,
  },
  {
    date: "2024-04-22",
    bsr: 2555418,
    price: 21.99,
  },
  {
    date: "2024-04-23",
    bsr: 2701558,
    price: 21.99,
  },
  {
    date: "2024-04-24",
    bsr: 2834576,
    price: 21.99,
  },
  {
    date: "2024-04-25",
    bsr: 2958599,
    price: 21.99,
  },
  {
    date: "2024-04-26",
    bsr: 673133,
    price: 21.99,
  },
  {
    date: "2024-04-27",
    bsr: 947082,
    price: 21.99,
  },
  {
    date: "2024-04-28",
    bsr: 1156779,
    price: 21.99,
  },
  {
    date: "2024-04-29",
    bsr: 1337540,
    price: 21.99,
  },
  {
    date: "2024-04-30",
    bsr: 1606845,
    price: 21.99,
  },
  {
    date: "2024-05-01",
    bsr: 596934,
    price: 21.99,
  },
  {
    date: "2024-05-02",
    bsr: 545249,
    price: 21.99,
  },
  {
    date: "2024-05-03",
    bsr: 791757,
    price: 21.99,
  },
  {
    date: "2024-05-04",
    bsr: 616484,
    price: 21.99,
  },
  {
    date: "2024-05-05",
    bsr: 575140,
    price: 21.99,
  },
  {
    date: "2024-05-06",
    bsr: 534234,
    price: 21.99,
  },
  {
    date: "2024-05-07",
    bsr: 779847,
    price: 21.99,
  },
  {
    date: "2024-05-08",
    bsr: 977531,
    price: 21.99,
  },
  {
    date: "2024-05-09",
    bsr: 712043,
    price: 21.99,
  },
  {
    date: "2024-05-10",
    bsr: 905213,
    price: 21.99,
  },
  {
    date: "2024-05-11",
    bsr: 575664,
    price: 21.99,
  },
  {
    date: "2024-05-12",
    bsr: 417575,
    price: 21.99,
  },
  {
    date: "2024-05-13",
    bsr: 733523,
    price: 21.99,
  },
  {
    date: "2024-05-14",
    bsr: 410067,
    price: 21.99,
  },
  {
    date: "2024-05-15",
    bsr: 754589,
    price: 21.99,
  },
  {
    date: "2024-05-16",
    bsr: 321322,
    price: 21.99,
  },
  {
    date: "2024-05-17",
    bsr: 318517,
    price: 21.99,
  },
  {
    date: "2024-05-18",
    bsr: 582024,
    price: 21.99,
  },
  {
    date: "2024-05-19",
    bsr: 728355,
    price: 21.99,
  },
  {
    date: "2024-05-20",
    bsr: 494786,
    price: 21.99,
  },
  {
    date: "2024-05-21",
    bsr: 746933,
    price: 21.99,
  },
  {
    date: "2024-05-22",
    bsr: 444649,
    price: 21.99,
  },
  {
    date: "2024-05-23",
    bsr: 730705,
    price: 21.99,
  },
  {
    date: "2024-05-24",
    bsr: 634049,
    price: 21.99,
  },
  {
    date: "2024-05-25",
    bsr: 796203,
    price: 21.99,
  },
  {
    date: "2024-05-26",
    bsr: 397274,
    price: 21.99,
  },
  {
    date: "2024-05-27",
    bsr: 376502,
    price: 21.99,
  },
  {
    date: "2024-05-28",
    bsr: 696779,
    price: 21.99,
  },
  {
    date: "2024-05-29",
    bsr: 426602,
    price: 21.99,
  },
  {
    date: "2024-05-30",
    bsr: 720080,
    price: 21.99,
  },
  {
    date: "2024-05-31",
    bsr: 463068,
    price: 21.99,
  },
  {
    date: "2024-06-01",
    bsr: 729503,
    price: 21.99,
  },
  {
    date: "2024-06-02",
    bsr: 359788,
    price: 21.99,
  },
  {
    date: "2024-06-03",
    bsr: 437420,
    price: 21.99,
  },
  {
    date: "2024-06-04",
    bsr: 330051,
    price: 21.99,
  },
  {
    date: "2024-06-05",
    bsr: 264206,
    price: 21.99,
  },
  {
    date: "2024-06-06",
    bsr: 422262,
    price: 21.99,
  },
  {
    date: "2024-06-07",
    bsr: 632463,
    price: 21.99,
  },
  {
    date: "2024-06-08",
    bsr: 755883,
    price: 21.99,
  },
  {
    date: "2024-06-09",
    bsr: 391327,
    price: 21.99,
  },
  {
    date: "2024-06-10",
    bsr: 293592,
    price: 21.99,
  },
  {
    date: "2024-06-11",
    bsr: 245083,
    price: 21.99,
  },
  {
    date: "2024-06-12",
    bsr: 374840,
    price: 21.99,
  },
  {
    date: "2024-06-13",
    bsr: 286093,
    price: 21.99,
  },
  {
    date: "2024-06-14",
    bsr: 313632,
    price: 21.99,
  },
  {
    date: "2024-06-15",
    bsr: 443658,
    price: 21.99,
  },
  {
    date: "2024-06-16",
    bsr: 289288,
    price: 21.99,
  },
  {
    date: "2024-06-17",
    bsr: 507118,
    price: 21.99,
  },
  {
    date: "2024-06-18",
    bsr: 365346,
    price: 21.99,
  },
  {
    date: "2024-06-19",
    bsr: 272207,
    price: 21.99,
  },
  {
    date: "2024-06-20",
    bsr: 234406,
    price: 21.99,
  },
  {
    date: "2024-06-21",
    bsr: 284809,
    price: 21.99,
  },
  {
    date: "2024-06-22",
    bsr: 278724,
    price: 21.99,
  },
  {
    date: "2024-06-23",
    bsr: 295262,
    price: 21.99,
  },
  {
    date: "2024-06-24",
    bsr: 554671,
    price: 21.99,
  },
  {
    date: "2024-06-25",
    bsr: 676532,
    price: 21.99,
  },
  {
    date: "2024-06-26",
    bsr: 311122,
    price: 21.99,
  },
  {
    date: "2024-06-27",
    bsr: 331880,
    price: 21.99,
  },
  {
    date: "2024-06-28",
    bsr: 574184,
    price: 21.99,
  },
  {
    date: "2024-06-29",
    bsr: 686947,
    price: 21.99,
  },
  {
    date: "2024-06-30",
    bsr: 336801,
    price: 21.99,
  },
  {
    date: "2024-07-01",
    bsr: 573547,
    price: 21.99,
  },
  {
    date: "2024-07-02",
    bsr: 231065,
    price: 21.99,
  },
  {
    date: "2024-07-03",
    bsr: 277895,
    price: 21.99,
  },
  {
    date: "2024-07-04",
    bsr: 221723,
    price: 21.99,
  },
  {
    date: "2024-07-05",
    bsr: 211228,
    price: 21.99,
  },
  {
    date: "2024-07-06",
    bsr: 475304,
    price: 21.99,
  },
  {
    date: "2024-07-07",
    bsr: 252741,
    price: 21.99,
  },
  {
    date: "2024-07-08",
    bsr: 522463,
    price: 21.99,
  },
  {
    date: "2024-07-09",
    bsr: 324441,
    price: 21.99,
  },
  {
    date: "2024-07-10",
    bsr: 588532,
    price: 21.99,
  },
  {
    date: "2024-07-11",
    bsr: 705834,
    price: 21.99,
  },
  {
    date: "2024-07-12",
    bsr: 830216,
    price: 21.99,
  },
  {
    date: "2024-07-13",
    bsr: 380446,
    price: 21.99,
  },
  {
    date: "2024-07-14",
    bsr: 636343,
    price: 21.99,
  },
  {
    date: "2024-07-15",
    bsr: 203951,
    price: 21.99,
  },
  {
    date: "2024-07-16",
    bsr: 433224,
    price: 21.99,
  },
  {
    date: "2024-07-17",
    bsr: 299905,
    price: 21.99,
  },
  {
    date: "2024-07-18",
    bsr: 369368,
    price: 21.99,
  },
  {
    date: "2024-07-19",
    bsr: 295510,
    price: 21.99,
  },
  {
    date: "2024-07-20",
    bsr: 295231,
    price: 21.99,
  },
  {
    date: "2024-07-21",
    bsr: 450051,
    price: 21.99,
  },
  {
    date: "2024-07-22",
    bsr: 626503,
    price: 21.99,
  },
  {
    date: "2024-07-23",
    bsr: 395713,
    price: 21.99,
  },
  {
    date: "2024-07-24",
    bsr: 264337,
    price: 21.99,
  },
  {
    date: "2024-07-25",
    bsr: 297241,
    price: 21.99,
  },
  {
    date: "2024-07-26",
    bsr: 311439,
    price: 21.99,
  },
  {
    date: "2024-07-27",
    bsr: 277135,
    price: 21.99,
  },
  {
    date: "2024-07-28",
    bsr: 518249,
    price: 21.99,
  },
  {
    date: "2024-07-29",
    bsr: 651024,
    price: 21.99,
  },
  {
    date: "2024-07-30",
    bsr: 318164,
    price: 21.99,
  },
  {
    date: "2024-07-31",
    bsr: 533224,
    price: 21.99,
  },
  {
    date: "2024-08-01",
    bsr: 309876,
    price: 21.99,
  },
  {
    date: "2024-08-02",
    bsr: 351541,
    price: 21.99,
  },
  {
    date: "2024-08-03",
    bsr: 174906,
    price: 21.99,
  },
  {
    date: "2024-08-04",
    bsr: 340889,
    price: 21.99,
  },
  {
    date: "2024-08-05",
    bsr: 304879,
    price: 21.99,
  },
  {
    date: "2024-08-06",
    bsr: 515368,
    price: 21.99,
  },
  {
    date: "2024-08-07",
    bsr: 312508,
    price: 21.99,
  },
  {
    date: "2024-08-08",
    bsr: 312235,
    price: 21.99,
  },
  {
    date: "2024-08-10",
    bsr: 204426,
    price: 21.99,
  },
  {
    date: "2024-08-11",
    bsr: 261077,
    price: 21.99,
  },
  {
    date: "2024-08-12",
    bsr: 240566,
    price: 21.99,
  },
  {
    date: "2024-08-13",
    bsr: 324106,
    price: 21.99,
  },
  {
    date: "2024-08-14",
    bsr: 452076,
    price: 21.99,
  },
  {
    date: "2024-08-15",
    bsr: 337366,
    price: 21.99,
  },
  {
    date: "2024-08-16",
    bsr: 258352,
    price: 21.99,
  },
  {
    date: "2024-08-19",
    bsr: 212439,
    price: 21.99,
  },
  {
    date: "2024-08-20",
    bsr: 284065,
    price: 21.99,
  },
  {
    date: "2024-08-22",
    bsr: 356279,
    price: 21.99,
  },
  {
    date: "2024-08-23",
    bsr: 203203,
    price: 21.99,
  },
  {
    date: "2024-08-24",
    bsr: 408669,
    price: 21.99,
  },
  {
    date: "2024-08-25",
    bsr: 258531,
    price: 21.99,
  },
  {
    date: "2024-08-26",
    bsr: 377965,
    price: 21.99,
  },
  {
    date: "2024-08-27",
    bsr: 314258,
    price: 21.99,
  },
  {
    date: "2024-08-28",
    bsr: 526638,
    price: 21.99,
  },
  {
    date: "2024-08-29",
    bsr: 582610,
    price: 21.99,
  },
  {
    date: "2024-08-30",
    bsr: 677933,
    price: 21.99,
  },
  {
    date: "2024-08-31",
    bsr: 332948,
    price: 21.99,
  },
  {
    date: "2024-09-01",
    bsr: 338445,
    price: 21.99,
  },
  {
    date: "2024-09-02",
    bsr: 394752,
    price: 21.99,
  },
  {
    date: "2024-09-03",
    bsr: 333082,
    price: 21.99,
  },
  {
    date: "2024-09-04",
    bsr: 271298,
    price: 21.99,
  },
  {
    date: "2024-09-05",
    bsr: 274227,
    price: 21.99,
  },
  {
    date: "2024-09-06",
    bsr: 173835,
    price: 21.99,
  },
  {
    date: "2024-09-07",
    bsr: 318978,
    price: 21.99,
  },
  {
    date: "2024-09-08",
    bsr: 410089,
    price: 21.99,
  },
  {
    date: "2024-09-09",
    bsr: 261303,
    price: 21.99,
  },
  {
    date: "2024-09-10",
    bsr: 398376,
    price: 21.99,
  },
  {
    date: "2024-09-11",
    bsr: 234142,
    price: 21.99,
  },
  {
    date: "2024-09-12",
    bsr: 239325,
    price: 21.99,
  },
  {
    date: "2024-09-13",
    bsr: 207882,
    price: 21.99,
  },
  {
    date: "2024-09-14",
    bsr: 197865,
    price: 21.99,
  },
  {
    date: "2024-09-15",
    bsr: 372442,
    price: 21.99,
  },
  {
    date: "2024-09-16",
    bsr: 570924,
    price: 21.99,
  },
  {
    date: "2024-09-17",
    bsr: 335287,
    price: 21.99,
  },
  {
    date: "2024-09-18",
    bsr: 404805,
    price: 21.99,
  },
  {
    date: "2024-09-19",
    bsr: 216557,
    price: 21.99,
  },
  {
    date: "2024-09-20",
    bsr: 280556,
    price: 21.99,
  },
  {
    date: "2024-09-21",
    bsr: 229180,
    price: 21.99,
  },
  {
    date: "2024-09-22",
    bsr: 181528,
    price: 21.99,
  },
  {
    date: "2024-09-23",
    bsr: 363370,
    price: 21.99,
  },
  {
    date: "2024-09-24",
    bsr: 239984,
    price: 21.99,
  },
  {
    date: "2024-09-25",
    bsr: 151242,
    price: 21.99,
  },
  {
    date: "2024-09-26",
    bsr: 190070,
    price: 21.99,
  },
  {
    date: "2024-09-27",
    bsr: 213839,
    price: 21.99,
  },
  {
    date: "2024-09-28",
    bsr: 161302,
    price: 21.99,
  },
  {
    date: "2024-09-29",
    bsr: 121562,
    price: 21.99,
  },
  {
    date: "2024-09-30",
    bsr: 101960,
    price: 21.99,
  },
  {
    date: "2024-10-01",
    bsr: 116777,
    price: 21.99,
  },
  {
    date: "2024-10-02",
    bsr: 137712,
    price: 21.99,
  },
  {
    date: "2024-10-03",
    bsr: 141898,
    price: 21.99,
  },
  {
    date: "2024-10-04",
    bsr: 198527,
    price: 21.99,
  },
  {
    date: "2024-10-05",
    bsr: 184191,
    price: 21.99,
  },
  {
    date: "2024-10-06",
    bsr: 176854,
    price: 21.99,
  },
  {
    date: "2024-10-07",
    bsr: 110421,
    price: 21.99,
  },
  {
    date: "2024-10-08",
    bsr: 119670,
    price: 21.99,
  },
  {
    date: "2024-10-09",
    bsr: 82705,
    price: 21.99,
  },
  {
    date: "2024-10-10",
    bsr: 97760,
    price: 21.99,
  },
  {
    date: "2024-10-11",
    bsr: 96449,
    price: 21.99,
  },
  {
    date: "2024-10-12",
    bsr: 144486,
    price: 21.99,
  },
  {
    date: "2024-10-13",
    bsr: 179423,
    price: 21.99,
  },
  {
    date: "2024-10-14",
    bsr: 177292,
    price: 21.99,
  },
  {
    date: "2024-10-15",
    bsr: 145939,
    price: 21.99,
  },
  {
    date: "2024-10-16",
    bsr: 169445,
    price: 21.99,
  },
  {
    date: "2024-10-17",
    bsr: 253498,
    price: 21.99,
  },
  {
    date: "2024-10-18",
    bsr: 255165,
    price: 21.99,
  },
  {
    date: "2024-10-19",
    bsr: 197544,
    price: 21.99,
  },
  {
    date: "2024-10-20",
    bsr: 223297,
    price: 21.99,
  },
  {
    date: "2024-10-21",
    bsr: 259201,
    price: 21.99,
  },
  {
    date: "2024-10-22",
    bsr: 193109,
    price: 22.97,
  },
  {
    date: "2024-10-23",
    bsr: 181510,
    price: 22.97,
  },
  {
    date: "2024-10-24",
    bsr: 211489,
    price: 22.97,
  },
  {
    date: "2024-10-25",
    bsr: 285791,
    price: 22.97,
  },
  {
    date: "2024-10-26",
    bsr: 251443,
    price: 22.97,
  },
  {
    date: "2024-10-27",
    bsr: 185838,
    price: 22.97,
  },
  {
    date: "2024-10-28",
    bsr: 258959,
    price: 22.97,
  },
  {
    date: "2024-10-29",
    bsr: 287558,
    price: 22.97,
  },
  {
    date: "2024-10-30",
    bsr: 215953,
    price: 22.97,
  },
  {
    date: "2024-10-31",
    bsr: 171262,
    price: 22.97,
  },
  {
    date: "2024-11-01",
    bsr: 221485,
    price: 22.97,
  },
  {
    date: "2024-11-02",
    bsr: 194572,
    price: 22.97,
  },
  {
    date: "2024-11-03",
    bsr: 214529,
    price: 22.97,
  },
  {
    date: "2024-11-04",
    bsr: 121577,
    price: 22.97,
  },
  {
    date: "2024-11-05",
    bsr: 147322,
    price: 22.97,
  },
  {
    date: "2024-11-06",
    bsr: 216890,
    price: 22.97,
  },
  {
    date: "2024-11-07",
    bsr: 239637,
    price: 22.97,
  },
  {
    date: "2024-11-08",
    bsr: 216847,
    price: 22.97,
  },
  {
    date: "2024-11-09",
    bsr: 98469,
    price: 22.97,
  },
  {
    date: "2024-11-10",
    bsr: 225271,
    price: 22.97,
  },
  {
    date: "2024-11-11",
    bsr: 184521,
    price: 22.97,
  },
  {
    date: "2024-11-12",
    bsr: 135753,
    price: 22.97,
  },
  {
    date: "2024-11-13",
    bsr: 239337,
    price: 22.97,
  },
  {
    date: "2024-11-14",
    bsr: 260588,
    price: 22.97,
  },
  {
    date: "2024-11-15",
    bsr: 112773,
    price: 22.97,
  },
  {
    date: "2024-11-16",
    bsr: 151971,
    price: 22.97,
  },
  {
    date: "2024-11-17",
    bsr: 178949,
    price: 22.97,
  },
  {
    date: "2024-11-18",
    bsr: 181197,
    price: 22.97,
  },
  {
    date: "2024-11-19",
    bsr: 174480,
    price: 22.97,
  },
  {
    date: "2024-11-20",
    bsr: 148444,
    price: 22.97,
  },
  {
    date: "2024-11-21",
    bsr: 105808,
    price: 22.97,
  },
  {
    date: "2024-11-22",
    bsr: 169079,
    price: 22.97,
  },
  {
    date: "2024-11-23",
    bsr: 114532,
    price: 22.97,
  },
  {
    date: "2024-11-24",
    bsr: 53204,
    price: 22.97,
  },
  {
    date: "2024-11-25",
    bsr: 55110,
    price: 22.97,
  },
  {
    date: "2024-11-26",
    bsr: 40777,
    price: 22.97,
  },
  {
    date: "2024-11-27",
    bsr: 41003,
    price: 22.97,
  },
  {
    date: "2024-11-28",
    bsr: 29904,
    price: 22.97,
  },
  {
    date: "2024-11-29",
    bsr: 31435,
    price: 22.97,
  },
  {
    date: "2024-11-30",
    bsr: 18715,
    price: 22.97,
  },
];

const ProductCard = ({ data }) => {
  const elementRef = useRef(null);

  const adjustPosition = () => {
    if (elementRef.current) {
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();

      const r = window.innerWidth - rect.left;
      if (rect?.width > r) {
        element.style.left = `-${rect.width}px`;
      }
    }
  };

  useEffect(() => {
    // Attach listeners to adjust position on resize and scroll
    window.addEventListener("resize", adjustPosition);
    window.addEventListener("scroll", adjustPosition);

    // Initial adjustment
    adjustPosition();

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("resize", adjustPosition);
      window.removeEventListener("scroll", adjustPosition);
    };
  }, []);
  return (
    <Fragment>
      {/* <Popper
        // onMouseEnter={() => setAnchorEl(anchorEl)}
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="left-start"
        sx={{ transform: "translate(-202px, 160px) !important" }}
      >
        <Paper>
          <Box className={styles.chart_container}>
            <div className={styles.title_container}>
              <Typography variant="h5">BSR History</Typography>
              <Typography variant="caption">Last 500 days</Typography>
            </div>
            <LineChart
              width={500}
              height={250}
              data={data}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="bsr" />
              <Tooltip
                formatter={(value, name) => [value, name?.toUpperCase()]}
              />
              <Line
                type="monotone"
                dataKey="bsr"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </Box>
        </Paper>
      </Popper> */}

      <div
        className={styles.main_product_card_container}
        // onMouseEnter={handleClick}
        // onMouseLeave={() => {
        //   setAnchorEl(null);
        // }}
      >
        <Paper className={styles.chart_paper_container} ref={elementRef}>
          <Box className={styles.chart_container}>
            <div className={styles.title_container}>
              <Typography variant="h5">BSR History</Typography>
              <Typography variant="caption">Last 500 days</Typography>
            </div>
            <LineChart
              width={500}
              height={250}
              data={bsrData}
              // margin={{
              //   top: 5,
              //   right: 30,
              //   left: 20,
              //   bottom: 5,
              // }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="bsr" />
              <Tooltip
                formatter={(value, name) => [value, name?.toUpperCase()]}
              />
              <Line
                type="monotone"
                dataKey="bsr"
                stroke="#8884d8"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </Box>
        </Paper>
        <Paper className={styles.product_card_container}>
          <div className={styles.image_container}>
            <Box component={"img"} src={data?.imageUrl} alt={"Product image"} />
          </div>
          <div className={styles.title_container}>
            <Typography variant="h6">{data?.title}</Typography>
            <Typography variant="body1">
              {/* <Typography variant="caption">by</Typography>Geni Game */}
            </Typography>
          </div>
          <Divider></Divider>
          <div className={styles.details_container}>
            <Box className={styles.color_strip}></Box>
            <div className={styles.side}>
              <Typography className={styles.text_1}>
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
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>{" "}
                {data?.bsr}
              </Typography>
              <Typography className={styles.text_2}>
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
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>{" "}
                {data?.reviews}
              </Typography>
            </div>
            <div className={styles.side}>
              <Typography className={styles.text_1}>
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
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>{" "}
                {data?.avg30bsr}
              </Typography>
              <Typography className={styles.text_2}>
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
                >
                  <circle cx="8" cy="21" r="1"></circle>
                  <circle cx="19" cy="21" r="1"></circle>
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                </svg>{" "}
                {data?.sales}
              </Typography>
            </div>
            <div className={styles.side}>
              <Typography className={styles.text_1}>${data?.price}</Typography>
            </div>
            <div className={styles.side}>
              <Typography className={styles.text_1}>
                {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M8 2v4"></path>
              <path d="M16 2v4"></path>
              <rect width="18" height="18" x="3" y="4" rx="2"></rect>
              <path d="M3 10h18"></path>
            </svg>{" "} */}
                {data?.published}
              </Typography>
            </div>
          </div>
        </Paper>
      </div>
    </Fragment>
  );
};

export default ProductCard;
