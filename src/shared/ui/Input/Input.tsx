import { cn } from "@/classnames";
import { Typography } from "@material-tailwind/react";

import styles from "./Input.module.scss";
import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
  error?: string | boolean;
  cell?: boolean;
}

export const AppInput: React.FC<Props> = ({
  className,
  error,
  cell = false,
  ...props
}) => {
  return (
    <div className={className}>
      <input
        className={cn(styles.input, {
          [styles.input__cell]: cell,
          [styles.input__default]: !cell,
          "outline-red-500": !!error,
        })}
        {...props}
      />
      {error && <Typography className="mt-1 text-red-500">{error}</Typography>}
    </div>
  );
};
