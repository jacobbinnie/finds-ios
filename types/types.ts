export enum FindAction {
  FIND = "FIND",
  SAVE = "SAVE",
}

export interface GooglePlace {
  id: string;
  displayName: {
    languageCode: string;
    text: string;
  };
  shortFormattedAddress: string;
  types: string[];
  googleMapsUri: string;
}

export interface GooglePlacesResponse {
  places: GooglePlace[];
}
