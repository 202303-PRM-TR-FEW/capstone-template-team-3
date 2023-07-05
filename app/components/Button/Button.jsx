const Button = ({ name, type, children }) => {
  return (
    <button type={type}>
      {name}
      {children}
    </button>
  );
};
export default Button;
