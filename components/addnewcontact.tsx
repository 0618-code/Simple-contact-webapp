'use client';

import { useRef, useState } from 'react';
import addContact from '@/app/actions/addcontactdata';

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    const { error } = await addContact(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType('error');
    } else {
      setAlertMessage('Contact added successfully!');
      setAlertType('success');
      formRef.current?.reset();
    }

    setIsLoading(false);
  };

  return (
    <div className='bg-green-50 flex items-center justify-center min-h-screen'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'>
        <h3 className='text-2xl font-bold text-center mb-6 text-green-800'>
          Add New Contact
        </h3>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current!);
            clientAction(formData);
          }}
          className='space-y-6'
        >
          {/* Name Field */}
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Name
            </label>
            <input
              type='text'
              name='name'
              id='name'
              className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2'
              placeholder='Enter name'
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Phone Number
            </label>
            <input
              type='tel'
              name='phone'
              id='phone'
              className='block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2'
              placeholder='Enter phone number'
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow-md transition flex items-center justify-center'
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className='animate-spin h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
                ></path>
              </svg>
            ) : (
              'Add Contact'
            )}
          </button>
        </form>

        {/* Alert Message */}
        {alertMessage && (
          <div
            className={`mt-4 p-3 rounded-md text-sm ${
              alertType === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRecord;