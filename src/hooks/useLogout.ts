import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import { useLocation } from "react-router";

const useLogout = () => {
    const { user, logoutUser } = useAuth();
    const location = useLocation();
    const currentPath = location.pathname;

  const handleLogout = async () => {
    const toastId = toast.loading('logging out ...');
    try {
      await logoutUser();
      toast.success('logged out successfully')
    } catch (error) {
      console.error("Logout failed", error);
      toast.error('something went wrong');
    }finally{
      toast.dismiss(toastId);
    }
  };

  return {handleLogout, user, currentPath}
}
export default useLogout;