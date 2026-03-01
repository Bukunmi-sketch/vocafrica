import React, { useState } from "react";
import { IoHelpCircleOutline, IoSearchOutline } from "react-icons/io5";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const adminFaqs = [
  {
    category: "Getting Started",
    items: [
      {
        q: "What is Alehra?",
        a: "Alehra is a HIPAA-compliant, AI-powered EHR/EMR platform for behavioral health. It unifies scheduling, sessions, billing, eRx, AI notes, patient management, and more in one secure system—for psychologists, therapists, counselors, psychiatrists, and allied health teams.",
      },
      {
        q: "How do I set up my practice?",
        a: "Start with Dashboard to get an overview. Add Staff (Manage Team), configure Services, set up Locations, and configure Payments (Stripe, PayPal, Authorize.Net, or manual). Use Settings for branding, appointments, and preferences.",
      },
    ],
  },
  {
    category: "Appointments & Sessions",
    items: [
      {
        q: "How do I create and manage appointments?",
        a: "Go to Appointments to view the calendar or table. Use New Appointment to schedule. Filter by status (Approved, Pending, Completed, etc.). You can approve, reject, complete, or cancel appointments. Join sessions 10 minutes before start time.",
      },
      {
        q: "How do I join a video session?",
        a: "When an appointment is within the join window, click Join. Sessions use HIPAA-compliant video. If no session exists, one is created automatically. You can join from the Appointments table or Sessions page.",
      },
      {
        q: "What is the Sessions page?",
        a: "Sessions shows all completed and in-progress sessions with client, provider, service, timing, mode, session status, and payment status. Use it to track session history and follow up on billing.",
      },
    ],
  },
  {
    category: "Staff & Patients",
    items: [
      {
        q: "How do I add staff or team members?",
        a: "Go to Staff → Manage Team, then New Staff. Invite by email. Staff can be providers, schedulers, billers, or administrators. Set roles and permissions in Settings → Team Management.",
      },
      {
        q: "How do I manage patients?",
        a: "Use Patients (Manage Client) to view and search clients. Add clients, upload files, manage insurance, and view appointment history. You can invite clients via invitation links.",
      },
    ],
  },
  {
    category: "Billing & Payments",
    items: [
      {
        q: "How do I set up payments?",
        a: "Go to Payments → Payment Setup. Choose Stripe, PayPal, Authorize.Net, or Manual payment. Enter credentials. Stripe and other gateways allow patients to pay securely online.",
      },
      {
        q: "What is EDI Lens?",
        a: "EDI Lens turns 835 files into revenue intelligence. Upload 835 files to see denial trends, payer performance, and payment breakdowns. Export to Excel for finance and billing decisions. Available as an add-on.",
      },
      {
        q: "How does billing work with insurance?",
        a: "Use the Billing add-on for full insurance billing—eligibility checks, claim submission, ERA, and attachments. Integrates with trusted clearinghouses.",
      },
    ],
  },
  {
    category: "Notes & Documentation",
    items: [
      {
        q: "How does AI note-taking work?",
        a: "During or after sessions, AI can summarize and generate structured clinical notes. Review and edit before finalizing. Saves time and reduces documentation fatigue.",
      },
      {
        q: "How do I use Notes and templates?",
        a: "Go to Notes for clinical documentation. Create templates (Template Pro), use Form Flow for structured data, and standardize notes across your practice. Archive and version templates as needed.",
      },
    ],
  },
  {
    category: "Care Library & DocBox",
    items: [
      {
        q: "What is the Care Library?",
        a: "Care Library holds forms, worksheets, and portal files. Create or upload content, share with clients via DocBox, and collect structured patient data. Use Resource Hub for patient-facing materials.",
      },
      {
        q: "What is DocBox?",
        a: "DocBox provides HIPAA-secure file exchange. Replace email with audit-ready sharing—every upload, message, and read receipt is logged for compliance. Use Shared Files and Messaging for secure communication.",
      },
    ],
  },
  {
    category: "Reports & Analytics",
    items: [
      {
        q: "What reports are available?",
        a: "Reports include Provider, Client, Appointment, Session, Payment, Claims, Operational, and Compliance reports. Use Analytics (add-on) for deeper insights into practice performance.",
      },
    ],
  },
  {
    category: "E-Prescription & Add-ons",
    items: [
      {
        q: "How do I use E-Prescription?",
        a: "E-Prescription (add-on) lets you send prescriptions electronically to pharmacies. Configure in Settings → E-Prescription. Patients can view prescriptions in their portal.",
      },
      {
        q: "What add-ons can I enable?",
        a: "Add-ons include Billing & Claims, EDI Lens, E-Prescription, Analytics, and more. Go to Settings → Add-ons to view and activate. Some plans include certain add-ons.",
      },
    ],
  },
  {
    category: "Alehra AI & Security",
    items: [
      {
        q: "What is Alehra AI?",
        a: "Alehra AI helps patients self-serve 24/7—answer questions, guide to services, and handle booking. It appears in the right sidebar. Reduces admin questions and acts like a virtual receptionist.",
      },
      {
        q: "Is Alehra HIPAA compliant?",
        a: "Yes. Alehra is designed for HIPAA, GDPR, and regulatory compliance. Features include role-based access, audit logs, 2FA, end-to-end encryption, and PHI protection. Payments use PCI-DSS certified providers.",
      },
    ],
  },
];

const AdminHelp: React.FC = () => {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const searchLower = search.toLowerCase().trim();
  const filteredFaqs = searchLower
    ? adminFaqs
        .map((cat) => ({
          ...cat,
          items: cat.items.filter(
            (item) =>
              item.q.toLowerCase().includes(searchLower) ||
              item.a.toLowerCase().includes(searchLower),
          ),
        }))
        .filter((cat) => cat.items.length > 0)
    : adminFaqs;

  return (
    <div className="min-h-[80vh] bg-white dark:bg-bodydark rounded-lg p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <IoHelpCircleOutline className="text-4xl text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Help & FAQ
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For providers and practice administrators
            </p>
          </div>
        </div>

        <div className="relative mb-8">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search help..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-strokedark rounded-lg bg-gray-50 dark:bg-bodydark1 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-6">
          {filteredFaqs.map(({ category, items }) => (
            <section key={category}>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category}
              </h2>
              <div className="space-y-2">
                {items.map(({ q, a }) => {
                  const key = `${category}-${q}`;
                  const isOpen = expanded[key];
                  return (
                    <div
                      key={key}
                      className="border border-gray-200 dark:border-strokedark rounded-lg overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggle(key)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 dark:bg-bodydark1 hover:bg-gray-100 dark:hover:bg-bodydark transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-white text-sm">
                          {q}
                        </span>
                        {isOpen ? (
                          <MdExpandLess className="text-xl text-gray-500 flex-shrink-0" />
                        ) : (
                          <MdExpandMore className="text-xl text-gray-500 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-strokedark text-gray-600 dark:text-gray-400 text-sm">
                          {a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {filteredFaqs.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No results found. Try a different search.
          </p>
        )}

        <div className="mt-12 p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Need more help?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Visit{" "}
            <a
              href="https://alehra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              alehra.com
            </a>{" "}
            for demos, feature guides, and support. Contact your practice
            administrator or reach out to Alehra support for account-specific
            questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHelp;
