import cn from "classnames";
import s from "./Input.module.css";

const Input = ({ className, type = 'text', ...rest }) => {
  return (
    <div className={cn(s.root, className)}>
      <input type={type} className={s.field} autoComplete="off" {...rest} />
    </div>
  );
};

export default Input;
