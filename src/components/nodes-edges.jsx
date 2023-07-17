import artists from "../assets/data/artists.json";

export const createArtistNodes = (artists) => {
    return artists.map((artist, i) => {
        return {
            id: `${artist.id}`,
            data: { label: `${artist.name}` },
            position: { x: 0, y: i * 100 },
        };
    });
};

export const createArtistEdges = (artists) => {
    const edges = [];
    artists.forEach((artist) => {
        artist.features.forEach((feature) => {
            // if (feature !== artist.id && )
            edges.push({
                id: `e${artist.id}to${feature}`,
                source: `${artist.id}`,
                target: `${feature}`,
            });
        });
    });
    return edges;
};

export const initialNodes = createArtistNodes(artists);
export const initialEdges = createArtistEdges(artists);

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
