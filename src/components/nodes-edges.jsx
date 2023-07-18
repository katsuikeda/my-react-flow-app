import { MarkerType } from "reactflow";
import artists from "../assets/data/artists.json";

export const createFeaturedArtistsList = (artists, artistId, level) => {
    const artist = artists.find((artist) => artist.id === artistId);
    if (level === 0) return [artist];
    const featuredArtists = artist.features.map((featuredArtist) => createFeaturedArtistsList(artists, featuredArtist, level - 1));
    // remove duplicates and return the flattened array
    return [...new Set([artist, ...featuredArtists.flat()])];
};

const featuredArtistsList = createFeaturedArtistsList(artists, 3, 2);

export const initialNodes = featuredArtistsList.map((artist, index) => ({
    id: artist.id.toString(),
    data: { label: artist.name },
    position: { x: index * 200, y: 0 },
}));

export const initialEdges = featuredArtistsList
    .map((artist) =>
        artist.features.map((feature) => ({
            id: `e${artist.id}-${feature}`,
            source: artist.id.toString(),
            target: feature.toString(),
            type: "default",
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#FDE047",
            },
        }))
    )
    .flat();
