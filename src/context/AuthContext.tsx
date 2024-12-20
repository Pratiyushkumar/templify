import React, { createContext, useEffect, useState } from 'react';
import { account } from '../appwrite/appwriteConfig';

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
    registerUser: (name: string, email: string, password: string) => Promise<void>;
    loading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loginUser: async () => { },
    logoutUser: () => Promise.resolve(),
    registerUser: () => Promise.resolve(),
    loading: false,
    error: null
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
            if (session) {
                const accountDetails = await account.get();
                setUser({
                    name: accountDetails.name,
                    email: accountDetails.email,
                    password: accountDetails.password ?? ""
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
            // First, try to delete any existing sessions
            try {
                await account.deleteSessions();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                console.log('No existing sessions to delete');
            }

            // Now create new session
            await account.createEmailPasswordSession(userInfo.email, userInfo.password);
            const accountDetails = await account.get();
            setUser({
                name: accountDetails.name,
                email: accountDetails.email,
                password: accountDetails.password ?? ""
            });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Login error:', error);
            const errorMessage = error.type === 'user_invalid_credentials'
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
        // Implement your logout logic here
        setLoading(true);
        try {
            await account.deleteSession('current'); // Deletes the current session
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        } finally {
            setLoading(false);
        }
    };

    const registerUser = async (name: string,
        email: string,
        password: string): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            await account.create('unique()', email, password, name);
            await loginUser({ email, password });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error('Signup error:', error);
            const errorMessage = error.type === 'user_already_exists'
                ? 'An account with this email already exists.'
                : 'An unexpected error occurred. Please try again.';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const contextData: AuthContextType = {
        user,
        loginUser,
        logoutUser,
        registerUser,
        loading,
        error
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
