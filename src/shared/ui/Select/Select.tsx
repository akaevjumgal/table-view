import { cn } from "@/classnames";
import { Select, SelectProps, Typography } from "@material-tailwind/react";
import { Fragment } from "react";

interface Props extends Omit<SelectProps, "ref" | "error"> {
  error?: string | boolean;
  cell?: boolean;
}

export const AppSelect: React.FC<Props> = ({
  children,
  error,
  className,
  cell = false,
  containerProps,
  ...props
}) => {
  const selectStyles = cn(
    cell ? "border-transparent" : "rounded border-[#e6ecef]",
    className
  );
  const containerStyles = cn(
    cell ? "h-[2rem]" : "h-[2.625rem]",
    containerProps?.className
  );

  return (
    <Fragment>
      <Select
        error={!!error}
        className={selectStyles}
        containerProps={{ ...containerProps, className: containerStyles }}
        labelProps={{
          className:
            "text-[#868a8d] opacity-50 after:border-[#e6ecef] before:border-[#e6ecef]",
        }}
        {...props}
      >
        {children}
      </Select>
      {error && <Typography className="mt-1 text-red-500">{error}</Typography>}
    </Fragment>
  );
};
