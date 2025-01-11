// store/middleware/authMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';// Adjust path as needed
import { useRouter } from 'next/router';
import { AppState } from '../index';

const authMiddleware: Middleware<{}, AppState> = store => next => action => {
    const result = next(action);

    const state = store.getState();
    const { token } = state.auth; // Adjust based on your auth slice

    const router = useRouter();
    const { pathname } = router;

    // Example routes that need authentication
    const restrictedRoutes = ['/profile'];

    // Redirect if not authenticated and trying to access a restricted route
    if (restrictedRoutes.includes(pathname) && !token) {
        router.push('/');
    }

    return result;
};

export default authMiddleware;
