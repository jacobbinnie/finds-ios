import { GooglePlacesResponse } from "@/types/types";
import { useState, useEffect, useRef } from "react";

interface UseGooglePlacesSearchProps {
  data: GooglePlacesResponse | null;
  isLoading: boolean;
  error: string | null;
}

const useGooglePlacesSearch = (query?: string): UseGooglePlacesSearchProps => {
  const [data, setData] = useState<GooglePlacesResponse | null>(null);
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
      setData({ places: [] });
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask":
        "places.id,places.displayName,places.shortFormattedAddress,places.types",
    };

    const acceptableTypes = ["bar", "restaurant", "food"];

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            textQuery: query,
            // New York City
            locationRestriction: {
              rectangle: {
                low: {
                  latitude: 40.477398,
                  longitude: -74.259087,
                },
                high: {
                  latitude: 40.91618,
                  longitude: -73.70018,
                },
              },
            },
            maxResultCount: 7,
          }),
        }
      );

      const responseData: GooglePlacesResponse = await response.json();

      const filteredData = responseData.places.filter((place) => {
        return place.types.some((type) => acceptableTypes.includes(type));
      });

      setData({ places: filteredData });
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
