import artists from "../assets/data/artists.json";

export const createFeaturedArtistsList = (artists, artistId, level) => {
    const artist = artists.find((artist) => artist.id === artistId);
    if (level === 0) return [artist];
    const featuredArtists = artist.features.map((featuredArtist) => createFeaturedArtistsList(artists, featuredArtist, level - 1));
    return [artist, ...featuredArtists.flat()];
};

const featuredArtistsList = createFeaturedArtistsList(artists, 0, 2);

export const initialNodes = featuredArtistsList.map((artist, index) => ({
    id: artist.id.toString(),
    data: { label: artist.name },
    position: { x: 0, y: index * 100 },
}));

export const initialEdges = featuredArtistsList
    .map((artist) =>
        artist.features.map((feature) => ({
            id: `e${artist.id}-${feature}`,
            source: artist.id.toString(),
            target: feature.toString(),
        }))
    )
    .flat();
