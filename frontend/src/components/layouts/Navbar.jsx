import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
import { FaAudible, FaMicrophone } from "react-icons/fa";
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi, { isLoading }] = useLogoutMutation();
  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/signin");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.error ||
          "something went wrong,try again later"
      );
    }
  };
  return (
    <div className="navbar my-5">
      <div className="container items-between m-auto">
        <div className="flex-1 flex items-center justify-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl ">
            <img src={logo} className="w-full h-full rounded" alt="" />
          </Link>
          <div className="link">
          <Link to='/speakers' className="btn btn-primary">
            <FaMicrophone/>
            Speakers
          </Link>
          </div>
        </div>
        <div className="flex gap-2">
          {userInfo && userInfo.type == "user" && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={logo} />
                </div>
              </label>
              {userInfo && (
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {userInfo && userInfo.type == "speaker" && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={logo} />
                </div>
              </label>
              {userInfo && (
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/speaker/profile">Profile </Link>
                  </li>
                  <li>
                    <Link to="/speaker/events">Events </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {userInfo && userInfo.type == "admin" && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={logo} />
                </div>
              </label>
              {userInfo && (
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/profile">admin</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              )}
            </div>
          )}

          {!userInfo && (
            <div className="signin">
              <Link to="/signin" className="btn btn-primary">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
