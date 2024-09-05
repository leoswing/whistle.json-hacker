import { Dropdown, DropDownProps } from "antd";
import "./index.css";

export const RQDropdown = (props: DropDownProps) => {
  return <Dropdown {...props} className={`rq-dropdown ${props?.className ?? ""}`} />;
};
