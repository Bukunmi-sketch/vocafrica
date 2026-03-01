import React from "react";

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-4 py-5">
        <div className="bg-white rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Cookie Policy</h1>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              What Are Cookies
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They help us enhance your user experience, analyze site performance, and provide personalized content. Cookies may be set by us or by third-party services we use.
            </p>
          </section>

          {/* Types of Cookies We Use */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Types of Cookies We Use
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4">
                {[
                  "Essential Cookies: Required for the website to function properly.",
                  "Analytics Cookies: Help us understand how visitors interact with our site.",
                  "Marketing Cookies: Used to deliver personalized advertisements.",
                ].map((item, index) => (
                  <li className="flex items-start" key={index}>
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Managing Cookies */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Managing Cookies</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">
                You can control and manage cookies through your browser settings. Most browsers allow you to block or delete cookies. However, disabling cookies may affect the functionality of our website.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-700">
                  To learn more about managing cookies, visit your browser's help section or check our guide on cookie settings.
                </p>
              </div>
            </div>
          </section>

          {/* Cookie Retention */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Cookie Retention</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Session Cookies", text: "Temporary cookies that expire when you close your browser." },
                { title: "Persistent Cookies", text: "Remain on your device for a set period or until deleted." },
              ].map((cookie, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{cookie.title}</h3>
                  <p className="text-gray-600">{cookie.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                If you have any questions about our Cookie Policy, please contact us at:
              </p>
              <div className="flex items-center space-x-2 text-blue-600">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:privacy@example.com" className="hover:underline">
                  privacy@example.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;