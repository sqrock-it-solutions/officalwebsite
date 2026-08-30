import {
  FileText,
  Monitor,
  User,
  Shield,
  CreditCard,
  Lock,
  AlertTriangle,
  XSquare,
  RefreshCw,
  Gavel,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

const TermsContent = () => {
  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: FileText,
      content:
        'By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.',
    },
    {
      id: 2,
      title: 'Use of Our Services',
      icon: Monitor,
      content:
        'You agree to use our services only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials.',
    },
    {
      id: 3,
      title: 'User Accounts',
      icon: User,
      content:
        'To access certain features, you may be required to create an account. You are responsible for all activities that occur under your account.',
      list: [
        'You must provide accurate and complete information',
        'You are responsible for safeguarding your password',
        'You must notify us immediately of any unauthorized use',
      ],
    },
    {
      id: 4,
      title: 'Privacy Policy',
      icon: Shield,
      content:
        'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information.',
    },
    {
      id: 5,
      title: 'Payments and Subscriptions',
      icon: CreditCard,
      content:
        'Some of our services require payment. By subscribing to our paid services, you agree to pay all fees associated with your subscription.',
      list: [
        'All fees are non-refundable unless otherwise stated',
        'We reserve the right to change pricing with prior notice',
        'Subscriptions auto-renew unless canceled before renewal',
      ],
    },
    {
      id: 6,
      title: 'Data Security',
      icon: Lock,
      content:
        'We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, or destruction.',
    },
    {
      id: 7,
      title: 'Limitation of Liability',
      icon: AlertTriangle,
      content:
        'We provide our services "as is" without warranties of any kind. We are not liable for any damages arising from the use of our services.',
    },
    {
      id: 8,
      title: 'Disclaimer of Warranties',
      icon: XSquare,
      content:
        'We make no warranties regarding the accuracy, reliability, or completeness of our services. Use of our services is at your own risk.',
    },
    {
      id: 9,
      title: 'Modification of Terms',
      icon: RefreshCw,
      content:
        'We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of the revised terms.',
    },
    {
      id: 10,
      title: 'Governing Law',
      icon: Gavel,
      content:
        'These terms are governed by and construed in accordance with the laws of the jurisdiction in which we operate.',
    },
    {
      id: 11,
      title: 'Contact Us',
      icon: Phone,
      content:
        'If you have any questions, concerns, or feedback regarding these Terms and Conditions, please don\'t hesitate to reach out to us.',
      contactCards: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`${
                index < sections.length - 1
                  ? 'border-b border-gray-100 pb-8 mb-8'
                  : ''
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Icon Box */}
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 text-[#0a0a0a]">
                  <section.icon className="w-6 h-6" />
                </div>

                {/* Text Area */}
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-[#0a0a0a] mb-2">
                    {section.id}. {section.title}
                  </h2>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {section.content}
                  </p>

                  {/* Bullet Points */}
                  {section.list && (
                    <ul className="list-disc pl-5 mt-3 space-y-1 text-sm md:text-base text-gray-600 leading-relaxed">
                      {section.list.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}

                  {/* Contact Cards - Section 11 */}
                  {section.contactCards && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-[#0a0a0a]">Email</p>
                          <p className="text-xs text-gray-500">support@sqrock.cloud</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-[#0a0a0a]">Phone</p>
                          <p className="text-xs text-gray-500">+91 86198 19400</p>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-[#0a0a0a]">Address</p>
                          <p className="text-xs text-gray-500">Jaipur Rajasthan India</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          {/* Widget 1: On This Page */}
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8">
            <h3 className="font-bold text-xl text-[#0a0a0a] mb-6">On This Page</h3>
            <div className="flex flex-col gap-4">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#section-${section.id}`}
                  className="flex gap-3 text-sm font-medium text-[#0a0a0a] hover:text-gray-500 cursor-pointer transition-colors"
                >
                  <span>{section.id}.</span>
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Widget 2: Our Commitment Box */}
          <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 flex flex-col items-start">
            <div className="border border-white/20 rounded-xl p-3 mb-6">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <h3 className="text-white font-bold text-xl mb-3">Our Commitment</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-8">
              We are committed to transparency, fairness, and protecting your
              rights. If you have any concerns, we're here to help.
            </p>
            <button className="bg-white text-[#0a0a0a] px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors w-full justify-center">
              Contact Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsContent;