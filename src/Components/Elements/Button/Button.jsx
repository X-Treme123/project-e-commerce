const Button = (props) => {
  const { children, classname = "bg-green-500", onClick, type = "button" } = props;
  return (
    <button
      className={`text-xs md:text-sm md:h-10 md:w-full h-8 w-30 px-4 md:px-8 font-bold ${classname} rounded-md md:rounded-lg hover:bg-green-400 hover:shadow-lg transition duration-100 ease-in-out`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
