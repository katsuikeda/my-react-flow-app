import artists from "../assets/data/artist.json";

// Generate an array of 5 or less random unique ids.
// Change 100 to artists.length to generate the full list.
function randomFeaturingArtists() {
    const ids = new Set();
    const max = Math.floor(Math.random() * 5 + 1);
    while (ids.size < max) {
        ids.add(Math.floor(Math.random() * 100));
    }
    return Array.from(ids);
}

// Generate the array of 100 JSON objects.
// Change 100 to artists.length to generate the full list.
const temp = [];
for (let i = 0; i < 100; i++) {
    temp.push({
        id: i,
        name: artists[i].artist_name,
        features: randomFeaturingArtists(),
    });
}

export const artistsList = JSON.stringify(temp);
