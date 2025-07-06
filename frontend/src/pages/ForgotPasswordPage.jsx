import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import Input from '../components/Input';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import { useAuthStore } from '../store/auth.store.js';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('If your account exists, you can now reset your password.');
    // Optionally, redirect to reset password page or login
    // navigate('/reset/password');
  };

  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex flex-col items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">Forgot Password</h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-6 text-center text-xs leading-6">
                Enter your email address and we&apos;ll help you reset your password.
              </p>
              <Input
                icon={Mail}
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="on"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MotionButton type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Continue'}
              </MotionButton>
            </form>
          ) : null}
          <div className="text-center">
            <Link
              to={'/login'}
              className="text-sm text-red-400 hover:underline inline-flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};
export default ForgotPasswordPage;
