import { db } from "@/service/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";
import SkeletonCard from "./components/SkeletonCard"; // Import Skeleton
import { toast } from "sonner";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    GetUserTrips();
  }, []);

  /**
   * Fetches ALL User Trips
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    const tripsArray = [];

    querySnapshot.forEach((docSnap) => {
      tripsArray.push({ id: docSnap.id, ...docSnap.data() }); // <-- include id
    });

    setUserTrips(tripsArray);
    setLoading(false);
  };

  const handleDeleteTrip = async (tripId) => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId));
      setUserTrips((prev) => prev.filter((trip) => trip.id !== tripId));
      toast.success("Trip Deleted Successfully");
      toast.success("Trip Deleted Successfully");

    } catch (error) {
      console.error("Failed to delete trip:", error);
      // Optionally show a toast here
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">My Trips</h2>

      {loading ? (
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {/* Show Skeleton Loaders */}
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : userTrips.length > 0 ? (
        <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
          {userTrips.map((trip, index) => (
            <UserTripCardItem
              key={index}
              trip={trip}
              onDelete={handleDeleteTrip}
            />
          ))}
        </div>
      ) : (
        <p>No trips found.</p>
      )}
    </div>
  );
}

export default MyTrips;
