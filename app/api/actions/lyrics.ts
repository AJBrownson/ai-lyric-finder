"use server";

export async function fetchLyrics({ song, artist }: { song: string; artist: string }) {

    const URL = `https://api.lyrics.ovh/v1/${artist}/${song}`;

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("Lyrics not found");
        }

        const data = await response.json();

        return data.lyrics || "Lyrics not found.";
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        return "An error occurred while fetching lyrics.";
    }
}
