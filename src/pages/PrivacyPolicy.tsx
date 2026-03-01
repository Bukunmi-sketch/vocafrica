import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-full mx-auto px-4 py-5">
        <div className="bg-white rounded-2xl  p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Privacy Policy</h1>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us, including when you
              create an account, make a purchase, sign up for our newsletter, or contact us
              for support. This may include:
            </p>
            <div className="mt-4 space-y-2">
              {[
                "Name and contact information",
                "Payment information",
                "Device and usage information",
              ].map((item, index) => (
                <div className="flex items-start" key={index}>
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              How We Use Your Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4">
                {[
                  "To provide and maintain our services",
                  "To process your transactions",
                  "To send you marketing communications",
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

          {/* Data Security */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Security</h2>
            <div className="prose text-gray-600">
              <p className="mb-4">
                We implement appropriate technical and organizational security measures to
                protect your personal information. However, please note that no method of
                transmission over the Internet is 100% secure.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-blue-700">
                  We regularly review and update our security practices to enhance the
                  protection of your data.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Access", text: "You can request access to your personal data at any time." },
                { title: "Rectification", text: "You can request correction of your personal data." },
                { title: "Erasure", text: "You can request deletion of your personal data." },
                { title: "Portability", text: "You can request transfer of your data to another service." },
              ].map((right, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">{right.title}</h3>
                  <p className="text-gray-600">{right.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
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

export default PrivacyPolicy;
