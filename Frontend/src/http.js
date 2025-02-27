import {API} from "./Constant.js";
export async function fetchavailableplaces() {
  const response = await fetch(API+"places");
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resdata.places;
}
export async function fetchupdateplaces() {
  const response = await fetch(API+"user-places");
  const resdata = await response.json();
  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }
  return resdata.places;
}

export async function fetchupdateuserplaces(places) {
  const response = await fetch(API+"user-places", {
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
