'use client';

import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="mt-1 text-sm text-gray-500">Last updated: February 16, 2026</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold text-gray-800">Information We Collect</h2>
              <p>
                Our application uses Google and Facebook login for authentication purposes only. When you sign in using these services, we may access the following information:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Email address</li>
                <li>Full name</li>
                <li>Profile picture</li>
                <li>Public profile information</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">How We Use Your Information</h2>
              <p>
                The information we collect is used solely for authentication purposes. We do not share your personal information with any third parties except as required for the authentication process with Google and Facebook.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Data Storage</h2>
              <p>
                We store only the minimum information necessary to maintain your account and provide authentication services. Your credentials are never stored in our systems - they remain with Google and Facebook.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Data Deletion</h2>
              <p>
                If you wish to delete your account or have your data removed from our system, please contact us at:
              </p>
              <div className="mt-2 p-4 bg-gray-50 rounded-md">
                <p className="font-medium">Email: privacy@socialloginapp.com</p>
                <p className="text-sm text-gray-600 mt-1">Subject: Data Deletion Request</p>
                <p className="text-sm text-gray-600 mt-2">Please include your email address associated with your account and any other identifying information.</p>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at the email address above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;