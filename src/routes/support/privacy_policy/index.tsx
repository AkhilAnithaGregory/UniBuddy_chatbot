import { createFileRoute } from "@tanstack/react-router";
import { UserLayout } from "@/lib/layout/userLayout";

export const Route = createFileRoute("/support/privacy_policy/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <UserLayout>
      <div className="min-h-screen">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          Welcome to <span className="font-semibold">UniBuddy</span>. Your privacy is important to us. This privacy policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
        <p className="mb-4">
          When you use UniBuddy, we may collect the following information from you:
        </p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li><strong>Name:</strong> Used to personalize your experience.</li>
          <li><strong>Email:</strong> Used for authentication and account recovery.</li>
          <li><strong>Gender:</strong> Used for analytics and improving the app experience.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Data</h2>
        <p className="mb-4">
          We do not share, sell, or use your personal information for any other purposes other than providing and improving our services. Your data remains confidential and is only used within the app for its intended purpose.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
        <p className="mb-4">
          UniBuddy uses cookies to enhance your user experience and remember your preferences. These cookies are small files stored on your device and are used solely for improving functionality and keeping you logged in. You can clear cookies at any time in your browser settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4">
          We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no system is completely secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
        <p className="mb-4">
          We may update this privacy policy from time to time. Any changes will be posted on this page with the date updated.
        </p>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          Last updated: January 26, 2026
        </p>
      </div>
    </div>
    </UserLayout>
  );
}
