import Button from "../Elements/Button/Button";
const NavbarLogin = () => {
  // const email = localStorage.getItem("username")

  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleRegist = () => {
    window.location.href = "/register";
  };

  return (
    <div className="min-h-screen w-auto">
      <nav className="bg-white backdrop-blur-lg flex justify-between px-5 md:px-10 h-20 items-center shadow-md">
        <h1 className="text-xl md:text-2xl font-semibold italic font-serif text-green-500">
          TrendMart
        </h1>
        <div className="flex items-center">
        <Button classname="bg-white border-2 border-green-500 text-green-500 mx-2 hover:text-white" onClick={handleLogin}>
          Login
        </Button>
        <Button classname="bg-green-500 text-white hover:bg-white hover:text-green-500 border-2 hover:border-green-500" onClick={handleRegist}>
          Regist
        </Button>
        </div>
      </nav>
      <div className="flex justify-center items-center flex-col flex-grow bg-cover bg-center background-image h-[90vh] border-4">
        <div className="flex flex-col items-center md:w-2/2">
          <h1 className="font-semibold font-serif italic text-2xl md:text-2xl lg:text-3xl">
            Welcome To <span className="text-green-500">TrendMart</span>
          </h1>
          <h1 className="font-normal text-sm md:text-base lg:text-lg font-serif text-gray-500">
            Belanja Mudah, Gaya Maksimal!
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NavbarLogin;
