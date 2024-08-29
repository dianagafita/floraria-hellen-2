import axios from "axios";

export async function getDistance(origin, destination) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.rows[0].elements[0].status === "OK") {
      return data.rows[0].elements[0].distance.value / 1000; // return distance in kilometers
    } else {
      throw new Error("Distance calculation failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching distance");
  }
}
