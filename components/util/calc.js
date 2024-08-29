const calculateDistance = async (
  destination,
  setDistance,
  isLoaded,
  loadError
) => {
  if (loadError) {
    console.error("Error loading Google Maps:", loadError);
    return;
  }

  if (!isLoaded) {
    console.error("Google Maps API not loaded.");
    return;
  }

  // Continue with your distance calculation logic using Google Maps services
  const origin = { lat: 47.5547159, lng: 25.8912127 }; // San Francisco

  const service = new window.google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: [destination],
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        const distanceInMeters = response.rows[0].elements[0].distance.value;
        setDistance(distanceInMeters);
      } else {
        console.error("Error fetching data: ", status);
      }
    }
  );
};

export default calculateDistance;
