import { useLogoutMutation } from '../store/api/AuthAPi';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/AuthSlice';
import toast from 'react-hot-toast';
import { apiSlice } from '../store/api/ApiSlice';

export const useLogout = () => {
    const dispatch = useDispatch();
    const [makeLogout, {isLoading}] = useLogoutMutation();

    const handleLogout = async ()=>{
        try {
            const res = await makeLogout({});
            console.log(res);
            dispatch(logout());
            dispatch(apiSlice.util.resetApiState());
            //This will clear all cached queries and force re-fetching next time something needs data.
        } catch (error) {
            toast.error(`Logout Failed, ${error}`)
        }
    };
  return { isLoading, handleLogout };
}
