import { useState, useEffect, useRef } from "react";

type PlacesData = google.maps.places.PlaceResult[];

interface UseGooglePlacesSearchProps {
  data: PlacesData | null;
  isLoading: boolean;
  error: string | null;
}

const useGooglePlacesSearch = (query?: string): UseGooglePlacesSearchProps => {
  const [data, setData] = useState<PlacesData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimer = useRef<NodeJS.Timeout>();

  const searchText = async () => {
    setIsLoading(true);
    setError(null);

    const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY || "";

    if (!apiKey) {
      setError("No API key found");
      setIsLoading(false);
      return;
    }

    if (!query || query.length < 3) {
      // Check for query length
      setIsLoading(false);
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.displayName,places.formattedAddress,places.priceLevel",
    };

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            textQuery: query,
          }),
        }
      );

      const responseData: PlacesData = await response.json();
      setData(responseData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Debounce the API call
    if (query) {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      debounceTimer.current = setTimeout(searchText, 500); // Adjust the delay time (in milliseconds) as needed
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query]);

  return { data, isLoading, error };
};

export default useGooglePlacesSearch;
