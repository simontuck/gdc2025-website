import React, { useState } from 'react';
import { ArrowLeft, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSubmitCoorganizerApplication } from '../hooks/useCoorganizerApplication';

const CallForCoOrganizersPage: React.FC = () => {
  const [formData, setFormData] = useState({
    organization_name: '',
    website: '',
    contact_email: '',
    contact_phone: '',
    organization_type: [] as string[],
    strategic_contribution: '',
    additional_info: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate: submitApplication, isPending, error } = useSubmitCoorganizerApplication();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      organization_type: prev.organization_type.includes(value)
        ? prev.organization_type.filter(t => t !== value)
        : [...prev.organization_type, value]
    }));
    if (errors.organization_type) {
      setErrors(prev => ({ ...prev, organization_type: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.organization_name.trim()) {
      newErrors.organization_name = 'Organization name is required';
    }
    if (!formData.website.trim()) {
      newErrors.website = 'Website is required';
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
      newErrors.contact_email = 'Please enter a valid email address';
    }
    if (!formData.contact_phone.trim()) {
      newErrors.contact_phone = 'Phone number is required';
    }
    if (formData.organization_type.length === 0) {
      newErrors.organization_type = 'Please select at least one organization type';
    }
    if (!formData.strategic_contribution.trim()) {
      newErrors.strategic_contribution = 'Strategic contribution description is required';
    } else if (formData.strategic_contribution.length > 1000) {
      newErrors.strategic_contribution = 'Maximum 1000 characters allowed';
    }
    if (formData.additional_info.length > 1000) {
      newErrors.additional_info = 'Maximum 1000 characters allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    submitApplication(formData, {
      onSuccess: () => {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  if (submitted) {
    return (
      <div className="pt-20">
        <section className="bg-primary-700 text-white py-16">
          <div className="container">
            <div className="flex items-center gap-4 mb-6">
              <Link
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Application Submitted</h1>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Application</h2>
              <p className="text-gray-700 mb-6">
                Your application to become a co-organizer for the Global Digital Collaboration Conference 2026 has been successfully submitted.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 text-left mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>If you submitted by <strong>January 16, 2026</strong>, you will be considered in the first round and can expect a decision in early February 2026 (yes, no, waitlisted).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Applications received after January 15, 2026, will be considered in the second round, with final decisions announced at the end of May 2026.</span>
                  </li>
                </ul>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                For questions, please contact:
              </p>
              <a
                href="mailto:secretariat@globaldigitalcollaboration.org"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <Mail className="h-5 w-5 mr-2" />
                secretariat@globaldigitalcollaboration.org
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Call for Co-Organizers of the Global Digital Collaboration Conference
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            September 1-3, 2026, Geneva
          </p>
        </div>
      </section>

      {/* Information Sections */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          {/* Who can participate */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Who can participate?</h2>
            <p className="text-gray-700">
              Intergovernmental Organizations and Non-Governmental Organizations such as Standardization-,
              Open-Source- and Civil Society Organizations as well as Trade Associations are invited to apply as Co-Organizers.
            </p>
          </div>

          {/* Selection Process */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the selection process?</h2>
            <p className="text-gray-700">
              Based on the applications received, the GDC Council will issue a non-binding recommendation to the
              Swiss Confederation, which is hosting the GDC and will formally invite selected Co-Organizers.
              The number of Co-Organizers will not exceed 50.
            </p>
          </div>

          {/* How to apply */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to apply?</h2>
            <p className="text-gray-700">
              Applicants are requested to complete the form below. This Call for Co-Organizers will remain open until <strong>May 8, 2026</strong>.
            </p>
          </div>

          {/* Application Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Application Form</h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-red-700">
                  <p>There was an error submitting your application. Please try again.</p>
                  <p className="text-sm mt-1 text-red-600">{error.message}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* General Information */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">General Information</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="organization_name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name of the Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="organization_name"
                      name="organization_name"
                      value={formData.organization_name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.organization_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.organization_name && (
                      <p className="mt-1 text-sm text-red-500">{errors.organization_name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
                      Website of the Organization <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="www.example.org"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.website ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.website && (
                      <p className="mt-1 text-sm text-red-500">{errors.website}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail address of the contact person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contact_email"
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.contact_email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.contact_email && (
                      <p className="mt-1 text-sm text-red-500">{errors.contact_email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number of the contact person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contact_phone"
                      name="contact_phone"
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                        errors.contact_phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.contact_phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.contact_phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Organization Type */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Organizational Type <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">Please select the applicable category (at least one):</p>

                <div className="space-y-4">
                  <label className="flex items-start cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={formData.organization_type.includes('igo')}
                        onChange={() => handleCheckboxChange('igo')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                        formData.organization_type.includes('igo')
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-gray-300 bg-white group-hover:border-gray-400'
                      }`}>
                        {formData.organization_type.includes('igo') && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-gray-700">Intergovernmental Organization</span>
                  </label>
                  <label className="flex items-start cursor-pointer group">
                    <div className="relative flex items-center justify-center flex-shrink-0 mt-0.5">
                      <input
                        type="checkbox"
                        checked={formData.organization_type.includes('ngo')}
                        onChange={() => handleCheckboxChange('ngo')}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors ${
                        formData.organization_type.includes('ngo')
                          ? 'bg-primary-600 border-primary-600'
                          : 'border-gray-300 bg-white group-hover:border-gray-400'
                      }`}>
                        {formData.organization_type.includes('ngo') && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="ml-3 text-gray-700">
                      Non-Governmental Organization (in particular Standardization-, Open-Source-, Civil Society Organizations or Trade Associations)
                    </span>
                  </label>
                </div>
                {errors.organization_type && (
                  <p className="mt-2 text-sm text-red-500">{errors.organization_type}</p>
                )}
              </div>

              {/* Strategic Contribution */}
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Strategic Contribution and Community Mobilization and Representativeness <span className="text-red-500">*</span>
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your organization must meet at least one of the following three options. Please describe how your organization:
                </p>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Provides substantial contributions (in particular technical expertise, research, policy insights) to the GDC agenda;</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Can offer support (including in-kind resources) to ensure the success of the conference;</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    <span>Ensures global reach and/or strong sectoral representativeness, contributes to diverse perspectives, and helps attract the relevant audience.</span>
                  </li>
                </ul>
                <textarea
                  id="strategic_contribution"
                  name="strategic_contribution"
                  value={formData.strategic_contribution}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={1000}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.strategic_contribution ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.strategic_contribution ? (
                    <p className="text-sm text-red-500">{errors.strategic_contribution}</p>
                  ) : (
                    <span></span>
                  )}
                  <p className="text-sm text-gray-500">{formData.strategic_contribution.length}/1000 characters</p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Additional Information</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Feel free to provide any additional information you consider relevant.
                </p>
                <textarea
                  id="additional_info"
                  name="additional_info"
                  value={formData.additional_info}
                  onChange={handleInputChange}
                  rows={4}
                  maxLength={1000}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.additional_info ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.additional_info ? (
                    <p className="text-sm text-red-500">{errors.additional_info}</p>
                  ) : (
                    <span></span>
                  )}
                  <p className="text-sm text-gray-500">{formData.additional_info.length}/1000 characters</p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center px-8 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
                <p className="text-gray-600 text-sm mt-4 text-center">
                  For questions, please contact{' '}
                  <a
                    href="mailto:secretariat@globaldigitalcollaboration.org"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    secretariat@globaldigitalcollaboration.org
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallForCoOrganizersPage;
