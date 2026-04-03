'use server';

const GOOGLE_MAPS_API_KEY = "AIzaSyCR5ufBKKAVWYAovmT9-TG9F7gg66cgXDg";

export async function searchNearbyPlaces(query: string) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query + " em Sergipe")}&key=${GOOGLE_MAPS_API_KEY}&language=pt-BR`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status === 'OK') {
      return data.results.slice(0, 5).map((place: any) => ({
        name: place.name,
        address: place.formatted_address,
        rating: place.rating,
        id: place.place_id
      }));
    }
    return [];
  } catch (error) {
    console.error("Places API Error:", error);
    return [];
  }
}
