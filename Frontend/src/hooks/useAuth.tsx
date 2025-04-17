import { useGetCurrentSessionQuery } from '../store/api/AuthAPi'

export const useAuth = () => {
    const { data, isLoading, isError } = useGetCurrentSessionQuery({});
  return {data, isError, isLoading};
};

