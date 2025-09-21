import { SignInButton } from '@clerk/nextjs';

const Guest = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center">
        Sign in to create and manage your contacts
      </h2>
      <SignInButton>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-200">
          Sign In
        </button>
      </SignInButton>
    </div>
  );
};

export default Guest;