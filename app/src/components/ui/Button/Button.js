import { useState } from "react";
import cn from "classnames";

import s from "./Button.module.css";

const Button = ({ className, children, type, ...rest }) => {
  const [pressed, setPressed] = useState(false);

  const animate = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 400);
  };

  return (
    <button
      className={cn(s.root, className, pressed && s.animated)}
      type={type}
      onMouseDown={animate}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
