const Button = ({ className, children, type, ...rest }) => {
  return (
    <button className={`button ${className}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
