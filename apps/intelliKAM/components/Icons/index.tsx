import theme from "../../../intelli-kam-config/theme";
import IcoMoon from "react-icomoon";
import matterSet from "./icons.selection.json";

export const icons = [
  "checkmark",
  "plus",
  "cross"
] as const;

export type IconType = typeof icons[number];

type IconProps = {
  [name: string]: any;
  icon: IconType;
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
};

const Icon: React.FC<IconProps> = ({ ...props }) => {
  return <IcoMoon iconSet={matterSet} {...props} />;
};

Icon.defaultProps = {
  color: theme.colors.fontColorPrimary,
};

export default Icon;
