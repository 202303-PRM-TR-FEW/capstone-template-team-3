const Button = ({ name, type, clickAction, style, children }) => {
  return (
    <button type={type} onClick={clickAction} className={style} data-cy={name}>
      {children}
      {name}
    </button>
  );
};

export default Button;
