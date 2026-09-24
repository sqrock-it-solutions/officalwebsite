import React from 'react';
import { 
  ClipboardList, 
  Zap, 
  Settings, 
  CheckCircle2, 
  Mail, 
  Phone, 
  MapPin,
  ShieldCheck 
} from 'lucide-react';

const PrivacyContent: React.FC = () => {
  // Navigation items data
  const navItems = [
    'Introduction',
    'Information We Collect',
    'How We Use Your Information',
    'Cookies and Tracking',
    'Data Security',
    'Third-Party Sharing',
    'Your Rights',
    'Data Retention',
    'Children\'s Privacy',
    'Contact Us'
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column - Main Content */}
        <div className="lg:col-span-8">
          
          {/* Section 1: Introduction */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Introduction
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              At SQROCK IT Solutions, we value your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, disclose, and safeguard your information when you 
              visit our website and use our services.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Please read this privacy policy carefully. By using our website, you consent to the practices 
              described in this policy. If you do not agree with the terms, please do not use our services.
            </p>
          </div>

          {/* Section 2: Information We Collect */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Information We Collect
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
              We collect various types of information to provide and improve our services to you:
            </p>
            
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="flex gap-4">
                <div className="bg-gray-50 rounded-xl p-3 shrink-0 text-[#0a0a0a]">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a0a0a]">Personal Information</h4>
                  <p className="text-sm text-gray-600">
                    Name, email address, phone number, and company details you provide when contacting us or signing up for services.
                  </p>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex gap-4">
                <div className="bg-gray-50 rounded-xl p-3 shrink-0 text-[#0a0a0a]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a0a0a]">Usage Data</h4>
                  <p className="text-sm text-gray-600">
                    Information about how you interact with our website, including pages visited, time spent, and referral sources.
                  </p>
                </div>
              </div>
              
              {/* Item 3 */}
              <div className="flex gap-4">
                <div className="bg-gray-50 rounded-xl p-3 shrink-0 text-[#0a0a0a]">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#0a0a0a]">Technical Data</h4>
                  <p className="text-sm text-gray-600">
                    IP address, browser type, device information, and cookies that help us improve your browsing experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: How We Use Your Information */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              How We Use Your Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black mt-1 shrink-0" />
                <span className="text-sm md:text-base text-gray-600">To provide and maintain our services</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black mt-1 shrink-0" />
                <span className="text-sm md:text-base text-gray-600">To notify you about changes to our services</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black mt-1 shrink-0" />
                <span className="text-sm md:text-base text-gray-600">To allow you to participate in interactive features</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black mt-1 shrink-0" />
                <span className="text-sm md:text-base text-gray-600">To provide customer support and respond to your inquiries</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-black mt-1 shrink-0" />
                <span className="text-sm md:text-base text-gray-600">To gather analysis or valuable information to improve our services</span>
              </div>
            </div>
          </div>

          {/* Section 4: Cookies and Tracking */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Cookies and Tracking
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. 
              Cookies are small files stored on your device that help us improve your experience.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm md:text-base">
              <li>Essential cookies for basic website functionality</li>
              <li>Analytics cookies to understand how visitors interact with our site</li>
              <li>Preference cookies to remember your settings and preferences</li>
              <li>Marketing cookies to deliver relevant advertisements</li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You can control cookie preferences through your browser settings. However, disabling cookies may affect 
              certain features of our website.
            </p>
          </div>

          {/* Section 5: Data Security */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Data Security
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              The security of your data is important to us. We implement appropriate technical and organizational 
              measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm md:text-base">
              <li>Encryption of data in transit using SSL/TLS protocols</li>
              <li>Regular security assessments and vulnerability scanning</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection and privacy</li>
            </ul>
          </div>

          {/* Section 6: Third-Party Sharing */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Third-Party Sharing
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              We may share your information with third-party service providers who assist us in operating our website, 
              conducting our business, or serving our users. These parties are contractually obligated to keep your 
              information confidential.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm md:text-base">
              <li>Cloud hosting and infrastructure providers</li>
              <li>Email and communication service providers</li>
              <li>Analytics and performance monitoring tools</li>
              <li>Payment processing services (where applicable)</li>
            </ul>
          </div>

          {/* Section 7: Your Rights */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Your Rights
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              Under applicable data protection laws, you have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm md:text-base">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (right to be forgotten)</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </div>

          {/* Section 8: Data Retention */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Data Retention
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in 
              this privacy policy, unless a longer retention period is required or permitted by law.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2 mb-4 text-sm md:text-base">
              <li>Personal information: Retained for the duration of our relationship plus 3 years</li>
              <li>Usage data: Retained for up to 12 months for analytics purposes</li>
              <li>Cookies: Retained for varying periods depending on the cookie type</li>
            </ul>
          </div>

          {/* Section 9: Children's Privacy */}
          <div className="border-b border-gray-100 pb-10 mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Children's Privacy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-4">
              Our services are not directed to individuals under the age of 13. We do not knowingly collect personal 
              information from children. If you become aware that a child has provided us with personal information, 
              please contact us immediately.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              If we discover that we have collected personal information from a child without parental consent, we will 
              take steps to remove that information from our servers.
            </p>
          </div>

          {/* Section 10: Contact Us */}
          <div className="pb-2">
            <h2 className="text-xl md:text-2xl font-bold text-[#0a0a0a] mb-4">
              Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-6">
              If you have any questions, concerns, or requests regarding this privacy policy or our data practices, 
              please don't hesitate to reach out to us:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Email Card */}
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#0a0a0a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0a0a0a]">Email</h4>
                  <p className="text-xs text-gray-500">privacy@sqrock.cloud</p>
                </div>
              </div>
              
              {/* Phone Card */}
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#0a0a0a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0a0a0a]">Phone</h4>
                  <p className="text-xs text-gray-500">+91 86198 19400</p>
                </div>
              </div>
              
              {/* Address Card */}
              <div className="bg-gray-50 rounded-2xl p-5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#0a0a0a] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0a0a0a]">Address</h4>
                  <p className="text-xs text-gray-500">Jaipur Rajasthan India</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          
          {/* Widget 1: Quick Navigation */}
          <div className="bg-gray-50 rounded-3xl p-6 md:p-8">
            <h3 className="font-bold text-lg text-[#0a0a0a] mb-6">
              Quick Navigation
            </h3>
            <div className="space-y-3">
              {navItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex gap-3 text-sm font-medium text-gray-600 hover:text-[#0a0a0a] cursor-pointer transition-colors"
                >
                  <span className="text-black font-bold">{index + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Widget 2: Trust Box */}
          <div className="bg-[#0a0a0a] rounded-3xl p-6 md:p-8 flex items-start gap-4">
            <ShieldCheck className="text-white w-8 h-8 shrink-0" />
            <div>
              <h4 className="text-white font-bold mb-2">Your trust matters</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                We are committed to maintaining the highest standards of privacy and data protection.
              </p>
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default PrivacyContent;