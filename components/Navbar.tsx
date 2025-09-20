import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

import Link from 'next/link';

import { checkUser } from '@/lib/checkUser';

export default async function Navbar() {
  const user = await checkUser();
  console.log('Current User:', user);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b-2 border-gray-200'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex items-center'>
            <Link href='/' className="flex-shrink-0" >
              <span className='text-xl sm:text-2xl font-bold text-green-600'>
                Contact WebApp
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href='/'
              className="text-gray-600 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>

            <Link
              href='/about'
              className="text-gray-600 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </Link>

            <SignedOut>
              <SignInButton>
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </nav>
  );
}