import cn from "classnames";
import { pick } from "lodash";
import React from "react";

import { BaseButton } from "coral-ui/components/v2";
import { BaseButtonProps } from "coral-ui/components/v2/BaseButton";
import { withStyles } from "coral-ui/hocs";

import styles from "./Button.css";

interface Props extends Omit<BaseButtonProps, "ref"> {
  anchor?: boolean;
  href?: string;
  target?: string;
  to?: string;

  classes: typeof styles & BaseButtonProps["classes"];
  className?: string;

  fontFamily?: "primary" | "secondary" | "none";
  fontWeight?: "regular" | "semiBold" | "bold" | "none";
  fontSize?: "extraSmall" | "small" | "medium" | "large" | "none";
  textAlign?: "left" | "center" | "right";
  paddingSize?: "extraSmall" | "small" | "medium" | "large" | "none";
  color?: "primary" | "secondary" | "positive" | "negative" | "none";
  variant?: "filled" | "outlined" | "flat" | "none";

  upperCase?: boolean;
  underline?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export class Button extends React.Component<Props> {
  public render() {
    const {
      classes,
      className,
      variant = "filled",
      color = "primary",
      textAlign = "center",
      fontSize = "small",
      fontFamily = "primary",
      fontWeight = "bold",
      paddingSize = "small",
      children,
      disabled = false,
      to,
      upperCase = false,
      underline = false,
      fullWidth = false,
      href,
      ...rest
    } = this.props;

    const rootClassName = cn(
      classes.root,
      classes.base,
      {
        [classes.filled]: variant === "filled",
        [classes.outlined]: variant === "outlined",
        [classes.flat]: variant === "flat",
        [classes.fontSizeExtraSmall]: fontSize === "extraSmall",
        [classes.fontSizeSmall]: fontSize === "small",
        [classes.fontSizeMedium]: fontSize === "medium",
        [classes.fontSizeLarge]: fontSize === "large",
        [classes.textAlignLeft]: textAlign === "left",
        [classes.textAlignCenter]: textAlign === "center",
        [classes.textAlignRight]: textAlign === "right",
        [classes.fontFamilyPrimary]: fontFamily === "primary",
        [classes.fontFamilySecondary]: fontFamily === "secondary",
        [classes.fontWeightPrimaryRegular]:
          fontFamily === "primary" && fontWeight === "regular",
        [classes.fontWeightPrimarySemiBold]:
          fontFamily === "primary" && fontWeight === "semiBold",
        [classes.fontWeightPrimaryBold]:
          fontFamily === "primary" && fontWeight === "bold",
        [classes.fontWeightSecondaryRegular]:
          fontFamily === "secondary" && fontWeight === "regular",
        [classes.fontWeightSecondarySemiBold]:
          fontFamily === "secondary" && fontWeight === "semiBold",
        [classes.fontWeightSecondaryBold]:
          fontFamily === "secondary" && fontWeight === "bold",
        [classes.paddingSizeExtraSmall]: paddingSize === "extraSmall",
        [classes.paddingSizeSmall]: paddingSize === "small",
        [classes.paddingSizeMedium]: paddingSize === "medium",
        [classes.paddingSizeLarge]: paddingSize === "large",
        [classes.colorPrimary]: color === "primary",
        [classes.colorSecondary]: color === "secondary",
        [classes.colorPositive]: color === "positive",
        [classes.colorNegative]: color === "negative",
        [classes.disabled]: disabled,
        [classes.upperCase]: upperCase,
        [classes.underline]: underline,
        [classes.fullWidth]: fullWidth,
      },
      className
    );

    return (
      <BaseButton
        className={rootClassName}
        classes={pick(classes, "keyboardFocus", "mouseHover")}
        disabled={disabled}
        to={to}
        href={href}
        anchor={href ? true : false}
        {...rest}
      >
        {children}
      </BaseButton>
    );
  }
}

const enhanced = withStyles(styles)(Button);

export default enhanced;
