import { useSelector } from 'react-redux';
import { RootState } from '../store/Store';

export const useAuth = () => {
   const user = useSelector((state:RootState)=> state.auth.userInfo?.user);
   const isAuthenticated = useSelector((state:RootState)=>state.auth.isAuthenticated);

   return {isAuthenticated,user};
};

