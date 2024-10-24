"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CiMusicNote1 } from "react-icons/ci";
import { fetchLyrics } from "@/app/api/actions/lyrics";
import { useCopilotAction } from "@copilotkit/react-core";

export default function LyricFinder() {
  const [lyrics, setLyrics] = useState<string | null>(null); // State to hold the lyrics
  const [artist, setArtist] = useState<string>(""); // State to hold the artist name
  const [song, setSong] = useState<string>(""); // State to hold the song title

  useCopilotAction(
    {
      name: "searchLyrics",
      description: "Search for lyrics of a song.",
      parameters: [
        {
          name: "SongLyrics",
          type: "object",
          description: "The song and artist to search for.",
          attributes: [
            {
              name: "artist",
              type: "string",
              description: "The name of the artist.",
              required: true,
            },
            {
              name: "song",
              type: "string",
              description: "The title of the song.",
              required: true,
            },
          ],
          required: true,
        },
      ],
      // Handler function that searches for lyrics using the SongLyrics parameter
      handler: async ({
        SongLyrics,
      }: {
        SongLyrics: { artist: string; song: string };
      }) => {
        const { artist, song } = SongLyrics;
        setArtist(artist); // Updates artist state
        setSong(song); // Updates song state
        const fetchedLyrics = await fetchLyrics({ song, artist }); // Calls the fetchLyrics function
        setLyrics(fetchedLyrics); // Updates state with fetched lyrics
        return fetchedLyrics; // Returns the fetched lyrics
      },
      render: "Searching for lyrics...",
    },
    []
  ); // Dependency array (empty in this case)

  return (
    <>
      <header className="p-4 fixed bg-white w-full">
        <span className="flex gap-x-8 items-center">
          <CiMusicNote1 size={30} />
          <h1 className="text-3xl font-bold">Music Lyric Finder</h1>
        </span>
      </header>

      <section className="overflow-x-auto pt-20 px-4">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col gap-y-5">
                <p>Artist: {artist}</p>
                <p>Song: {song}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lyrics ? (
              <pre className="whitespace-pre-wrap">{lyrics}</pre>
            ) : (
              <p>Lyrics will be displayed here</p>
            )}
          </CardContent>
        </Card>
      </section>
    </>
  );
}
