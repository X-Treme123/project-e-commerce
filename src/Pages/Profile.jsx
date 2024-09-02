import { Fragment } from "react";
import Navbar from "../Components/Layouts/NavbarLayouts";
import useLogin from "../hooks/useLogin";
import Naruto from "/images/profile3.png";

const ProfilePage = () => {
  const username = useLogin();
  return (
    <Fragment>
      <div className="max-h-screen max-w-screen">
        <Navbar type="Profile" />
        <div className="p-5 w-auto text-white flex justify-center items-center bg-white">
          <div className="w-[95%] lg:w-2/4 lg:p-6 flex flex-col item rounded-xl bg-white text-black border-slate-100 lg:border-4">
            <p className="text-2xl font-bold">Your Account</p>
            <div className="my-3 text-xl">
              <p className="text-gray-400 font-semibold py-5">
                Profile Picture
              </p>
              <img
                src={Naruto}
                alt="Profile"
                width={150}
                className="rounded-full"
              />
            </div>
            <div className="my-3 w-auto">
              <p className="font-bold text-2xl">Name</p>
              <p className="text-xl text-gray-400 font-semibold py-3 border-b-2">
                {username}
              </p>
            </div>
            <div className="my-3 w-auto">
              <p className="text-2xl font-bold">Email Address</p>
              <p className="text-xl text-gray-400 font-semibold py-3 border-b-2">
                example@gmail.com
              </p>
            </div>
            <div className="my-3 w-auto">
              <p className="text-2xl font-bold">Address</p>
              <p className="text-xl text-gray-400 font-semibold py-3 border-b-2">
                Jakarta, Indonesia
              </p>
            </div>
            <div className="my-3 w-auto">
              <p className="text-2xl font-bold">Phone Number</p>
              <p className="text-xl text-gray-400 font-semibold py-3 border-b-2">
                +62 123456789
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfilePage;
