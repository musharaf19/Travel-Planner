export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    icon: '🥷',
    description: "Explore the world at your own pace, embracing freedom and adventure.",
    people: '1 person'
  },
  {
    id: 2,
    title: "Couple",
    icon: '🥂',
    description: "Create unforgettable romantic memories with your partner.",
    people: '2 people'
  },
  {
    id: 3,
    title: "Family",
    icon: '🏡',
    description: "Enjoy quality time and fun-filled experiences with your loved ones.",
    people:'3 to 5 people'
  },
  {
    id: 4,
    title: "Friends",
    icon: '🍻',
    description: "Share exciting adventures and unforgettable moments with friends.",
    people: '5 to 10 people'
  }
];



export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    icon: '💵',
    description: "Save money while enjoying affordable stays and experiences."
  },
  {
    id: 2,
    title: "Moderate",
    icon: '💰',
    description: "Find a balance between comfort and affordability."
  },
  {
    id: 3,
    title: "Luxury",
    icon: '💎',
    description: "Experience premium comfort and top-tier services."
  }
];

export const AI_PROMPT = "Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format. ";