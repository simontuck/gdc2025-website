import React, { useState } from 'react';
import { X, Linkedin } from 'lucide-react';
import { useSpeakers } from '../hooks/useSpeakers';

interface Speaker {
  id: string;
  fullname: string;
  title: string;
  headline: string;
  organisation: string;
  bio: string;
  profile_picture_link: string;
  linkedin: string;
  ready_to_publish: boolean;
}

interface SpeakerModalProps {
  speaker: Speaker;
  isOpen: boolean;
  onClose: () => void;
}

const SpeakerModal: React.FC<SpeakerModalProps> = ({ speaker, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

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
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="mb-6">
                  <img
                    src={speaker.profile_picture_link || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800'}
                    alt={speaker.fullname}
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-2">
                  {speaker.fullname}
                </h3>
                <p className="text-lg text-primary-600 mb-1">{speaker.title}</p>
                <p className="text-md text-gray-600 mb-4">{speaker.organisation}</p>
                {speaker.headline && (
                  <p className="text-md text-gray-700 mb-4 italic">{speaker.headline}</p>
                )}
                <div className="mt-4 prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{speaker.bio}</p>
                </div>
                {speaker.linkedin && (
                  <div className="mt-6">
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      View LinkedIn Profile
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpeakersPage: React.FC = () => {
  const { data: speakers, isLoading, error } = useSpeakers();
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  return (
    <div className="pt-20">
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Conference Speakers</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Meet the industry leaders and experts shaping the future of digital collaboration
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error loading speakers</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>There was an error loading the speakers. Please try again later.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {speakers?.map((speaker) => (
                <div
                  key={speaker.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  onClick={() => setSelectedSpeaker(speaker)}
                >
                  <div className="relative pb-[100%]">
                    <img
                      src={speaker.profile_picture_link || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={speaker.fullname}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{speaker.fullname}</h3>
                    <p className="text-sm text-primary-600 mb-1">{speaker.title}</p>
                    <p className="text-sm text-gray-600 mb-2">{speaker.organisation}</p>
                    {speaker.headline && (
                      <p className="text-sm text-gray-700 italic line-clamp-2">{speaker.headline}</p>
                    )}
                    {speaker.linkedin && (
                      <a
                        href={speaker.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center mt-2 text-sm text-primary-600 hover:text-primary-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="h-4 w-4 mr-1" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          isOpen={!!selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      )}
    </div>
  );
};

export default SpeakersPage;