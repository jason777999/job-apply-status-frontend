import PerfectScrollbar from "react-perfect-scrollbar";
import { styled } from "@mui/material/styles";

const Scrollbar = styled(PerfectScrollbar)(({}) => ({
  paddingRight: 12,
  "& .ps__rail-y.ps--clicking": {
    "& .ps__thumb-y": {
      width: 6,
      background: "#414245",
    },
  },
  "& .ps__rail-y": {
    background: "rgba(0,0,0,0.08) !important",
    display: "block !important",
    opacity: "1",
    width: "12px",
    "&:hover": {
      "& .ps__thumb-y": {
        width: "6px",
        background: "#414245",
      },
    },
  },
  "&:hover": {
    "& .ps__rail-y": {},
  },
  "& .ps__thumb-y": {
    background: "#414245",
  },
}));

export default Scrollbar;
