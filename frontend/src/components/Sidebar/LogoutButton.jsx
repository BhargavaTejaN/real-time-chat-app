/* eslint-disable no-unused-vars */

import { BiLogOut } from "react-icons/bi";

import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();

  return (
    <div className="mt-auto">
      {!loading ? (
        <button onClick={logout} type="button" className="flex items-center">
          <BiLogOut
            className="w-6 h-6 text-blue-600 cursor-pointer mr-2"
          />
          <span className="text-blue-600">Logout</span>
        </button>
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default LogoutButton;

