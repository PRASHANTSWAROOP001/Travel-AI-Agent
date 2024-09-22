import { useEffect, useState } from "react";
import { fetchSavedTrip, isUserLoggedIn, deleteSavedTrip } from "../utils/supbase";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReactMarkdown from "react-markdown";

function SavedTrip() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  const checkingAuthentication = async () => {
    try {
      const login = await isUserLoggedIn();
      if (!login) {
        navigate("/login");
      } else {
        setCheckingAuth(false);
      }
    } catch (error) {
      console.error("Error while checking logged-in user at searchPage:", error);
    }
  };

  // Fetch saved trips when component mounts
  useEffect(() => {
    const fetchTrips = async () => {
      await checkingAuthentication();
      if (!checkingAuth) {
        const tripsData = await fetchSavedTrip();
        setTrips(tripsData || []);
      }
    };
    fetchTrips();
  }, [checkingAuth]);

  // Delete trip function
  const deleteTrip = async (tripId) => {
    setIsDeleting(true); // Set deleting state to true while the delete request is being processed

    const { success, message, error } = await deleteSavedTrip(tripId);

    if (!success) {
      console.error("Error occurred while deleting:", error);
    } else {
      console.log("Success:", message);

      // Update the UI by removing the deleted trip
      setTrips(trips.filter(trip => trip.id !== tripId));
    }

    setIsDeleting(false); // Reset deleting state after the operation is completed
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Saved Trip Data</h1>
      {trips.length === 0 ? (
        <p className="text-center">No trips found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <Card key={trip.id} className="w-full">
              <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{trip.trip_name}</h2>
                <p className="text-gray-600 truncate">{trip.trip_data}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setSelectedTrip(trip)}>View</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{selectedTrip?.trip_name}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 h-64 lg:h-80 overflow-y-auto mx-auto">
                      <ReactMarkdown className="w-full">{selectedTrip?.trip_data}</ReactMarkdown>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="destructive" onClick={() => deleteTrip(trip.id)}>Delete</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedTrip;
