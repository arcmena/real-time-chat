const Input = ({ className, ...rest }) => {
  return (
    <div className={`input__wrapper ${className}`}>
      <input
        type="text"
        className="input__field"
        autoComplete="off"
        {...rest}
      />
    </div>
  );
};

export default Input;
