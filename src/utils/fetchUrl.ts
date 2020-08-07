export const fetchUrl = (maxResults: number, keywords: string) => {
  return `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${keywords}&type=video&key=${process.env.EXPO_API_KEY}`;
};
