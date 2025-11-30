import { Highlight } from "./Highlight.tsx";

export const Audio = () => {
  return (
    <>
      <audio controls>
        <source src="media/bear.mp3" type="audio/mp3" />
        <source src="media/bear.ogg" type="audio/ogg" />
        <p>
          <Highlight
            text={
              "It looks like your browser doesn't support HTML5 audio players."
            }
          />
        </p>
      </audio>

      <p>
        <Highlight
          text={
            "Transcript: This isn't really and audio fact file about bears. But it is an audio file that you can transcribe."
          }
        />
      </p>
    </>
  );
};
