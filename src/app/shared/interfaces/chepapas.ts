export interface Chepapas {
    _id: string;
    displayName: string;
    formattedAddress: string;
    urlImages: string,
    location: { latitude: number; longitude: number };
    rating: number;
    userRatingCount: number;
    rateTinder: { likes: number; dislike: number; superPapa: number };
    hours:string,
  }