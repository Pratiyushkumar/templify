import React, { createContext, useEffect, useState } from 'react';
import { account } from '../appwrite/appwriteConfig';
import { OAuthProvider } from 'appwrite';

interface User {
    name: string;
    email: string;
    password: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    loginUser: (userInfo: LoginCredentials) => Promise<void>;
    logoutUser: () => Promise<void>;
    registerUser: (
        name: string,
        email: string,
        password: string
    ) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loginUser: async () => { },
    logoutUser: () => Promise.resolve(),
    registerUser: () => Promise.resolve(),
    loginWithGoogle: async () => { },
    loading: false,
    error: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const session = await account.getSession('current');
            console.log("session", session);
            if (session) {
                const accountDetails = await account.get();
                setUser({
                    name: accountDetails.name,
                    email: accountDetails.email,
                    password: accountDetails.password ?? '',
                });
            }
        } catch (error) {
            console.log('No active session', error);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (userInfo: LoginCredentials): Promise<void> => {
        setLoading(true);
        try {
            try {
                await account.deleteSessions();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log('No existing sessions to delete');
            }

            await account.createEmailPasswordSession(
                userInfo.email,
                userInfo.password
            );
            const accountDetails = await account.get();
            setUser({
                name: accountDetails.name,
                email: accountDetails.email,
                password: accountDetails.password ?? '',
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage =
                error.type === 'user_invalid_credentials'
                    ? 'Invalid email or password'
                    : error.type === 'user_not_found'
                        ? 'User not found'
                        : error.type === 'user_session_already_exists'
                            ? 'Session already exists. Please try again.'
                            : 'An error occurred during login. Please try again.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async (): Promise<void> => {
        setLoading(true);
        try {
            await account.deleteSession('current');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (
        name: string,
        email: string,
        password: string
    ): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await account.create('unique()', email, password, name);
            await loginUser({ email, password });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Signup error:', error);
            const errorMessage =
                error.type === 'user_already_exists'
                    ? 'An account with this email already exists.'
                    : 'An unexpected error occurred. Please try again.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async (): Promise<void> => {
        setLoading(true);
        try {
            const scopes = ['https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',];
            await account.createOAuth2Session(
                OAuthProvider.Google,
                'http://localhost:5173/home',
                'http://localhost:5173/signin',
                scopes
            );
            const accountDetails = await account.get();
            setUser({
                name: accountDetails.name,
                email: accountDetails.email,
                password: accountDetails.password ?? '',
            });
        } catch (error) {
            console.error('Google login error:', error);
            throw new Error('Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        loginWithGoogle,
        loading,
        error,
    };

    return (
        <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
    );
};

export default AuthContext;
