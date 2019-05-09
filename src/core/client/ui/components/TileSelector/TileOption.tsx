import cn from "classnames";
import React, { FunctionComponent } from "react";

import styles from "./TileOption.css";
import { SelectorChildProps } from "./TileSelector";

interface Props extends SelectorChildProps {
  className?: string;
}

const TileOption: FunctionComponent<Props> = ({
  id,
  name,
  onChange,
  className,
  value,
  checked,
  children,
}) => {
  return (
    <div className={className}>
      <input
        id={id}
        name={name}
        type="radio"
        className={styles.input}
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <label
        htmlFor={id}
        className={cn(styles.label, { [styles.checked]: checked })}
      >
        {children}
      </label>
    </div>
  );
};

export default TileOption;
