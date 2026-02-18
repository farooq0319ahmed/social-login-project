'use client';

import React from 'react';

const DataDeletionPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-3xl font-bold text-gray-900">Data Deletion Request</h1>
            <p className="mt-1 text-sm text-gray-500">Learn how to delete your account and personal data</p>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="prose prose-gray max-w-none">
              <h2 className="text-xl font-semibold text-gray-800">About Your Data</h2>
              <p>
                When you use our application with Google or Facebook login, we store minimal information to maintain your authenticated session. This includes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Your email address (provided by Google/Facebook)</li>
                <li>Your name (provided by Google/Facebook)</li>
                <li>Your profile picture URL (provided by Google/Facebook)</li>
                <li>Provider-specific user ID (Google/Facebook user ID)</li>
                <li>Account creation and last login timestamps</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Deleting Your Data</h2>
              <p>
                You can request deletion of your account and associated data by contacting us at:
              </p>
              <div className="mt-4 p-4 bg-blue-50 rounded-md">
                <p className="font-medium">Email: privacy@socialloginapp.com</p>
                <p className="text-sm text-gray-600 mt-1">Subject: Account Data Deletion Request</p>
                <p className="text-sm text-gray-600 mt-2">
                  Please include the following information in your request:
                </p>
                <ol className="list-decimal pl-5 mt-2 space-y-1">
                  <li>Your email address associated with the account</li>
                  <li>The OAuth provider you used (Google or Facebook)</li>
                  <li>Any other identifying information you have for your account</li>
                </ol>
              </div>

              <h3 className="text-lg font-medium text-gray-700 mt-4">Alternative Method: Through OAuth Provider</h3>
              <p>
                You can also revoke access to our application through your Google or Facebook account settings:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Google:</strong> Go to Google Account settings &gt; Security &gt; Third-party apps with account access</li>
                <li><strong>Facebook:</strong> Go to Facebook Settings &gt; Apps and Websites &gt; Apps, Websites, and Games</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Processing Time</h2>
              <p>
                Once we receive your deletion request, we will process it within 30 days. You will receive an email confirmation once your data has been permanently removed from our systems.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Additional Information</h2>
              <p>
                Please note that we may retain certain information as required by law or for legitimate business purposes. Additionally, information that has been aggregated or anonymized may be retained for analytical purposes.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">Questions?</h2>
              <p>
                If you have any questions about this data deletion process or our data practices, please contact us at privacy@socialloginapp.com.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDeletionPage;