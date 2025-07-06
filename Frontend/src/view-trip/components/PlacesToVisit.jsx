import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  let itinerary = trip?.tripData?.itinerary;

  if (itinerary && typeof itinerary === "object" && !Array.isArray(itinerary)) {
    itinerary = Object.entries(itinerary).map(([day, details]) => ({
      Day: day.charAt(0).toUpperCase() + day.slice(1),
      ...details,
    }));
  } else if (!Array.isArray(itinerary)) {
    itinerary = [];
  }

  if (!Array.isArray(itinerary) || itinerary.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mt-5 mb-5">Places To Visit</h2>
      {itinerary.map((item, index) => (
        <div key={item.Day || index} className="mt-5"> {/* ✅ Added key here */}
          <h2 className="font-bold text-lg">{item.Day}</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {item.places.map((place, placeIndex) => (
              <div key={place.id || placeIndex}> {/* ✅ Added key here */}
                <h2 className="font-medium text-sm text-orange-600 mt-5">{place.time}</h2>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesToVisit;
