import { useLogoutMutation } from '../store/api/AuthAPi';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/AuthSlice';

export const useLogout = () => {
    const dispatch = useDispatch();
    const [makeLogout, {isLoading}] = useLogoutMutation();

    const handleLogout = async ()=>{
        try {
            const res = await makeLogout({});
            console.log(res);
            dispatch(logout());
        } catch (error) {
            console.error(error)
        }
    };
  return { isLoading, handleLogout };
}
