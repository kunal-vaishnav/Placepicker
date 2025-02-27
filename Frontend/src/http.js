import {API_END_POINT} from "./Constant.js";
// export async function fetchavailableplaces() {
//   const response = await fetch(API_END_POINT+"places");
//   const resdata = await response.json();
//   if (!response.ok) {
//     throw new Error("Failed to fetch places");
//   }
//   return resdata.places;
// }
export async function fetchavailableplaces() {
  const response = await fetch(API + "places");

  // Check content type
  const contentType = response.headers.get("content-type");
  console.log("Content-Type:", contentType);

  // Read raw text first
  const text = await response.text();
  console.log("Raw Response:", text);

  try {
    const resdata = JSON.parse(text); // Try parsing as JSON
    if (!response.ok) {
      throw new Error("Failed to fetch places");
    }
    return resdata.places;
  } catch (error) {
    console.error("Response is not JSON:", text); // Log issue
    throw new Error("Invalid JSON response");
  }
}

export async function fetchupdateplaces() {
  const response = await fetch(API_END_POINT+"user-places");
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resdata.places;
}

export async function fetchupdateuserplaces(places) {
  const response = await fetch(API_END_POINT+"user-places", {
    method: "PUT",
    body: JSON.stringify({ places: places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resdata.message;
}
