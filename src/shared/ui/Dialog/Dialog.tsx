import { cn } from "@/classnames";
import { Dialog, DialogBody, DialogProps } from "@material-tailwind/react";

interface Props extends Omit<DialogProps, "ref"> {}

export const AppDialog: React.FC<Props> = ({
  children,
  className,
  ...props
}) => {
  return (
    <Dialog className={cn("rounded", className)} {...props}>
      <DialogBody className="py-5">{children}</DialogBody>
    </Dialog>
  );
};
