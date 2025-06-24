import React from 'react';
import { Users, Clock } from 'lucide-react';
import { MeetingRoom } from '../hooks/useMeetingRooms';
import { formatPrice } from '../utils/timeSlots';

interface MeetingRoomCardProps {
  room: MeetingRoom;
  onBookNow: (room: MeetingRoom) => void;
}

const MeetingRoomCard: React.FC<MeetingRoomCardProps> = ({ room, onBookNow }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-48">
        <img
          src={room.image_url}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-semibold text-primary-600">
            {formatPrice(room.hourly_rate)}/hour
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{room.name}</h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{room.seating_capacity} seats</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>30 min - 2 hours</span>
          </div>
        </div>
        
        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
            <div className="flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                  +{room.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex items-center justify-end">
          <button
            onClick={() => onBookNow(room)}
            className="btn btn-primary"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingRoomCard;