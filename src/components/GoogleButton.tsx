import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { Button } from './ui/button';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const GoogleButton: React.FC = () => {
    const { loginWithGoogle } = useAuth();

    const handleGoogleLogin = async () => {
        const toastId = toast.loading('Connecting to Google...');
        try {
            await loginWithGoogle();
            toast.success('Successfully connected with Google!');
        } catch (error: unknown) {
            console.error('Google login error:', error);
            if (error instanceof Error) {
                // toast.error(error.message);
                console.log(error.message);
            }
            if ((error as { type?: string }).type === 'general_unauthorized_scope') {
                toast.error('Authentication configuration error. Please contact support.');
            }
        } finally {
            toast.dismiss(toastId);
        }
    };
    return (
        <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-white text-gray-900 hover:bg-gray-100"
        >
            <FcGoogle />
            Continue with Google
        </Button>
    )
}

export default GoogleButton