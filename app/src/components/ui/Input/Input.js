import cn from "classnames";
import s from "./Input.module.css";

const Input = ({ className, ...rest }) => {
  return (
    <div className={cn(s.root, className)}>
      <input type="text" className={s.field} autoComplete="off" {...rest} />
    </div>
  );
};

export default Input;
