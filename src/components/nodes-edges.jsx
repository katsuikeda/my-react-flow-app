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

// export const initialNodes = [
//     {
//         id: "0",
//         type: "input",
//         data: { label: "xero" },
//         position: { x: 0, y: 0 },
//     },
//     {
//         id: "2",
//         data: { label: "node 2" },
//         position: { x: 0, y: 100 },
//     },
//     {
//         id: "2a",
//         data: { label: "node 2a" },
//         position: { x: 0, y: 200 },
//     },
//     {
//         id: "2b",
//         data: { label: "node 2b" },
//         position: { x: 0, y: 300 },
//     },
//     {
//         id: "2c",
//         data: { label: "node 2c" },
//         position: { x: 0, y: 400 },
//     },
//     {
//         id: "2d",
//         data: { label: "node 2d" },
//         position: { x: 0, y: 500 },
//     },
//     {
//         id: "3",
//         data: { label: "node 3" },
//         position: { x: 200, y: 100 },
//     },
// ];

// export const initialEdges = [
//     { id: "e12", source: "0", target: "2", animated: true },
//     { id: "e13", source: "0", target: "3", animated: true },
//     { id: "e22a", source: "0", target: "2a", animated: true },
//     { id: "e22b", source: "2", target: "2b", animated: true },
//     { id: "e22c", source: "2", target: "2c", animated: true },
//     { id: "e2c2d", source: "2c", target: "2d", animated: true },
// ];
