import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchavailableplaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [loading, setloading] = useState(true);
  const [availableplaces, setavailableplaces] = useState([]);
  const [error, seterror] = useState();
  useEffect(() => {
    async function fetchplaces() {
      setloading(true);
      try {
        const places = await fetchavailableplaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedplaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setavailableplaces(sortedplaces);
          setloading(false);
        });
        //setavailableplaces(resdata.places);
      } catch (error) {
        seterror({
          message: error.message || "could not loading failed to fetch places",
        });
      }
    }
    fetchplaces();
  }, []);

  if (error) {
    return (
      <Error
        title={"An error occurred while fetching"}
        message={error.message}
      />
    );
  }
  return (
    <Places
      places={availableplaces}
      isloading={loading}
      message={"fetching the places up"}
      title="Available Places"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
