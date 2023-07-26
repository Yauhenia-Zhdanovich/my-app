import {CircularProgress} from "@mui/material";
import "./Loader.scss";

export default function Loader(): JSX.Element {
  return <CircularProgress className="loader" />;
}
