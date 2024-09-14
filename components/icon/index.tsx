import { FC, MouseEventHandler, ReactNode } from "react";
import IconAirplay from "./icon-airplay";
import IconArrowForward from "./icon-arrow-forward";
import IconArrowRight from "./icon-arrow-right";
import IconPencilPaper from "./icon-pencil-paper";
import IconTrashLines from "./icon-trash-lines";
import IconPlus from "./icon-plus";

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
  default: IconArrowForward,
  airplay: IconAirplay,
  "arrow-forward": IconArrowForward,
  "arrow-right": IconArrowRight,
  "pencil-paper": IconPencilPaper,
  "trash-lines": IconTrashLines,
  "plus": IconPlus,
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
    <IconArrowForward {...props} />
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
