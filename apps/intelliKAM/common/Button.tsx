import Icon, { IconType } from "../components/Icons";
import ThemeContext from "../contexts/Theme";
import React, { useContext } from "react";

export enum ButtonKind {
  primaryCta,
  secondaryCta,
  default
}

export enum ButtonSize {
  large,
  medium,
  small,
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  kind: ButtonKind;
  fluid?: Boolean;
  size: ButtonSize;
  icon?: IconType;
  showLoader?: boolean;
  cta?: Boolean;
};

type ButtonStyleProps = {
  background: string;
  borderColor: string;
  color: string;
  font: {
    name: string;
    weight: number;
  };
};

type ButtonSizeType = {
  fontSize: number;
  lineHeight: number;
  padding: string;
  minHeight: string;
};

type ButtonStyleType =
  | "default"
  | "primaryCta"
  | "secondaryCta"
type ButtonSizeName = "small" | "large" | "medium";

const Button: React.FC<ButtonProps> = ({
  children,
  kind,
  fluid,
  size,
  icon,
  showLoader,
  cta,
  ...props
}) => {
  const { theme } = useContext(ThemeContext);
  const styles: ButtonStyleProps = theme.buttons[ButtonKind[kind] as ButtonStyleType];
  const sizes: ButtonSizeType = theme.sizes.button[ButtonSize[size] as ButtonSizeName];

  return (
    <button className="mt-btn" {...props} data-ctabtn={cta ? "true" : "false"}>
      {props.disabled && showLoader ? (
        <div className="flex loading-icon justify-center">
          <span className="mr-1">Submitting</span>
          <svg width="30px" height="25px" viewBox="0 0 128 35">
            <g>
              <circle fill="#fff" fillOpacity="1" cx="17.5" cy="17.5" r="12" />
              <animate
                attributeName="opacity"
                dur="1500ms"
                begin="0s"
                repeatCount="indefinite"
                keyTimes="0;0.167;0.5;0.668;1"
                values="0.3;1;1;0.3;0.3"
              />
            </g>
            <g>
              <circle fill="#fff" fillOpacity="1" cx="110.5" cy="17.5" r="12" />
              <animate
                attributeName="opacity"
                dur="1500ms"
                begin="0s"
                repeatCount="indefinite"
                keyTimes="0;0.334;0.5;0.835;1"
                values="0.3;0.3;1;1;0.3"
              />
            </g>
            <g>
              <circle fill="#fff" fillOpacity="1" cx="64" cy="17.5" r="12" />
              <animate
                attributeName="opacity"
                dur="1500ms"
                begin="0s"
                repeatCount="indefinite"
                keyTimes="0;0.167;0.334;0.668;0.835;1"
                values="0.3;0.3;1;1;0.3;0.3"
              />
            </g>
          </svg>
        </div>
      ) : (
        <>
          {icon && (
            <Icon
              className="left-icon"
              color={styles.color}
              icon={icon}
              size={18}
            />
          )}
          {children}
        </>
      )}
      <style jsx>
        {`
          button {
            font-weight: ${styles.font.weight};
            background-color: ${styles.background};
            width: ${fluid ? "100%" : "auto"};
            padding: ${sizes.padding};
            min-height: ${sizes.minHeight};
            border-radius: ${theme.buttons.base.borderRadius};
            border-width: ${theme.buttons.base.borderWidth};
            border-color: ${styles.borderColor};
            color: ${styles.color};
            font-size: ${sizes.fontSize}px;
            line-height: ${sizes.lineHeight}px;
          }
          button :global(.left-icon) {
            left: ${sizes.padding ? sizes.padding.split(" ")[1] : "10px"};
          }
          .loading-icon svg {
            align-self: flex-end;
          }
        `}
      </style>
      <style jsx>{`
        button {
          border-style: solid;
          cursor: pointer;
          transition: all 200ms ease-out;
          user-select: none;
          position: relative;
        }
        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        button:active {
          opacity: 0.9;
        }
        button :global(.left-icon) {
          align-self: flex-start;
          position: absolute;
        }
      `}</style>
    </button>
  );
};

Button.defaultProps = {
  kind: ButtonKind.default,
  fluid: false,
  size: ButtonSize.small,
  showLoader: true,
  cta: false,
};

export default Button;
