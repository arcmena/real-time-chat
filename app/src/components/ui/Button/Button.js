import cn from "classnames";
import s from "./Button.module.css";

const Button = ({ className, children, type, ...rest }) => {
  return (
    <button className={cn(s.root, className)} type={type} {...rest}>
      {children}
    </button>
  );
};

export default Button;
