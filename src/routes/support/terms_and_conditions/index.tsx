import { createFileRoute } from '@tanstack/react-router'
import { UserLayout } from '@/lib/layout/userLayout'

export const Route = createFileRoute('/support/terms_and_conditions/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <UserLayout>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6 sm:p-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="mb-4">
          Welcome to <span className="font-semibold">UniBuddy</span>. By using our website and services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using UniBuddy, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          You may be required to create an account and provide personal information such as Name, Email, and Gender. You are responsible for maintaining the confidentiality of your account and password. Any activity under your account is your responsibility.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Use of Services</h2>
        <p className="mb-4">
          UniBuddy provides tools for improving your learning experience. You agree not to misuse our services, upload harmful content, or use the platform for illegal purposes. Any violation may result in account suspension or termination.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Collection</h2>
        <p className="mb-4">
          We collect personal data such as Name, Email, and Gender only to provide and improve our services. We also store some data in cookies to enhance functionality, keep you logged in, and remember your preferences. Your data will not be used for any other purpose.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
        <p className="mb-4">
          All content, features, and functionality of UniBuddy are owned by us and are protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or reproduce any content without our written permission.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
        <p className="mb-4">
          UniBuddy is provided "as is" without warranties of any kind. We are not responsible for any damages or losses resulting from the use of our platform.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to Terms</h2>
        <p className="mb-4">
          We may update these Terms and Conditions from time to time. Changes will be posted on this page, and your continued use of the services constitutes acceptance of the updated terms.
        </p>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Last updated: January 26, 2026
        </p>
      </div>
    </div>
  </UserLayout>
)
}
