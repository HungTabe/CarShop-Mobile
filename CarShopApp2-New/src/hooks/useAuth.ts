import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState, AppDispatch } from '../store';
import { checkAuthStatus } from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading, user, error } = useSelector(
    (state: RootState) => state.auth
  );

  const checkAuth = useCallback(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    checkAuthStatus: checkAuth,
  };
}; 