import { Link as RouterLink, LinkProps } from "react-router-dom";
import clsx from "clsx";

const Link = ({ children, className, ...props }: LinkProps) => {
  return (
    <RouterLink
      className={clsx(
        "text-blue-500 hover:text-blue-600 underline underline-offset-4",
        className
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
