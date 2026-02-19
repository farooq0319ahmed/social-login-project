export const dynamic = "force-dynamic";

'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import authService from '../../../services/authService';

function CallbackContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');
    const errorDetails = searchParams.get('details');

    if (token) {
      try {
        const success = authService.handleCallback(token);

        if (success) {
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          setError('Failed to process authentication token');
          setLoading(false);
        }
      } catch (err) {
        setError('Error processing authentication callback: ' + (err?.message || String(err)));
        setLoading(false);
      }
      return;
    }

    if (errorParam) {
      setError(`Authentication failed: ${errorParam}${errorDetails ? ` (${errorDetails})` : ''}`);
    } else {
      setError('No token received from authentication provider');
    }
    setLoading(false);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Authentication Processing
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-lg text-gray-600">Completing authentication...</p>
              <p className="text-sm text-gray-500 mt-2">Please wait while we process your login</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Authentication Failed</h3>
              <p className="mt-1 text-sm text-gray-500">{error}</p>
              <div className="mt-6">
                <a
                  href="/login"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Return to Login
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Login Successful!</h3>
              <p className="mt-1 text-sm text-gray-500">You're being redirected to your dashboard.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}