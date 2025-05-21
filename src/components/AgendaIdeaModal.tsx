import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

interface AgendaIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgendaIdeaModal: React.FC<AgendaIdeaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    ideaTitle: '',
    ideaType: '',
    ideaDescription: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <div 
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={onClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {isSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  Thank You for Your Submission!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your agenda idea has been received. Our team will review it and get back to you soon.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Submit Your Agenda Idea
                </h3>
                
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                        Organization *
                      </label>
                      <input
                        type="text"
                        name="organization"
                        id="organization"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.organization}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ideaTitle" className="block text-sm font-medium text-gray-700">
                        Idea Title *
                      </label>
                      <input
                        type="text"
                        name="ideaTitle"
                        id="ideaTitle"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.ideaTitle}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="ideaType" className="block text-sm font-medium text-gray-700">
                        Idea Type *
                      </label>
                      <select
                        id="ideaType"
                        name="ideaType"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.ideaType}
                        onChange={handleChange}
                      >
                        <option value="">Select idea type</option>
                        <option value="presentation">Presentation</option>
                        <option value="panel">Panel Discussion</option>
                        <option value="workshop">Workshop</option>
                        <option value="demo">Demo</option>
                        <option value="deepdive">Technical Deep Dive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="ideaDescription" className="block text-sm font-medium text-gray-700">
                        Idea Description *
                      </label>
                      <textarea
                        id="ideaDescription"
                        name="ideaDescription"
                        rows={4}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500"
                        value={formData.ideaDescription}
                        onChange={handleChange}
                        placeholder="Please describe your idea, including its relevance to the conference themes and potential impact."
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full btn bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-4 focus:ring-secondary-300"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Submitting...' : 'Submit Idea'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaIdeaModal;