import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date('2026-09-01T08:30:00+02:00'); // Geneva time (CEST)
      const now = new Date();
      const difference = eventDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white py-12 -mt-16 relative z-10">
      <div className="container">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 transform translate-y-0">
          <div className="flex items-center justify-center mb-6">
            <Clock className="h-6 w-6 text-primary-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Time Until the Conference</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-1">{timeLeft.days}</div>
              <div className="text-sm text-gray-600">Days</div>
            </div>
            
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-1">{timeLeft.hours}</div>
              <div className="text-sm text-gray-600">Hours</div>
            </div>
            
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-1">{timeLeft.minutes}</div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <div className="text-4xl font-bold text-primary-600 mb-1">{timeLeft.seconds}</div>
              <div className="text-sm text-gray-600">Seconds</div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Join us on September 1, 2026 at 08:30 CEST in Geneva, Switzerland
          </p>
        </div>
      </div>
    </section>
  );
};

export default Countdown;