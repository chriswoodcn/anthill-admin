import { FC, MouseEventHandler, ReactNode } from "react";
import IconAirplay from "./icon-airplay";
import IconArrowForward from "./icon-arrow-forward";
import IconArrowRight from "./icon-arrow-right";
import IconPencilPaper from "./icon-pencil-paper";
import IconTrashLines from "./icon-trash-lines";
import IconPlus from "./icon-plus";
import IconPlusCircle from "./icon-plus-circle";
import IconXCircle from "./icon-x-circle";
import IconCaretsDown from "./icon-carets-down";
import IconCaretDown from "./icon-caret-down";
import IconLogout from "./icon-logout";
import IconRefresh from "./icon-refresh";
import IconClipboardText from "./icon-clipboard-text";
import IconFolder from "./icon-folder";
import IconBox from "./icon-box";
import IconNodata from "./icon-nodata";
import { IconCheck } from "@tabler/icons-react";

interface BaseIconProps {
  className?: string;
  onClick?: MouseEventHandler;
}
export type IconProps = BaseIconProps & Record<string, any>;
interface IconOptions extends IconProps {
  name?: string;
  defaultValue?: ReactNode;
}
const TemplateMap: Record<string, FC<IconOptions>> = {
  default: IconArrowRight,
  airplay: IconAirplay,
  "arrow-forward": IconArrowForward,
  "arrow-right": IconArrowRight,
  "pencil-paper": IconPencilPaper,
  "trash-lines": IconTrashLines,
  plus: IconPlus,
  "plus-circle": IconPlusCircle,
  "x-circle": IconXCircle,
  "carets-down": IconCaretsDown,
  "caret-down": IconCaretDown,
  export: IconLogout,
  refresh: IconRefresh,
  view: IconClipboardText,
  check: IconCheck,
  folder: IconFolder,
  box: IconBox,
  nodata: IconNodata,
  logout: IconLogout,
};
const switchIcon = (
  name: string,
  defaultValue: ReactNode = null,
  props: IconOptions
) => {
  const El = TemplateMap[name];
  return El ? (
    <El {...props} />
  ) : defaultValue ? (
    defaultValue
  ) : (
    <IconArrowRight {...props} />
  );
};
const Icon = (options: IconOptions) => {
  const { name, defaultValue } = options;
  const copyOpt = { ...options };
  const props = Object.assign(copyOpt, {
    name: undefined,
    defaultValue: undefined,
  });
  if (name == undefined) return null;
  return <>{switchIcon(name, defaultValue, props)}</>;
};

export default Icon;
