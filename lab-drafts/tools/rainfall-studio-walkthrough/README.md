# Rainfall Studio walkthrough: recording tools

Recorded from the RCS Studio v2 prototype (`rcs-studio-prototype/v2`, served at http://localhost:8420/v2/index.html) with the demo control bar collapsed.

- `demo-layer.js` + `demo-build.js`: injected for the recording only. Draw the cursor; keep the Canvas/Output panel closed (chat 760px, centred) until Define the Requirements, then narrow and slide the chat into its column as the Output fades in, and type the spec in: What It's For and What It Knows on Define the Requirements, the rest on Draft the Design, and Who Does The Work held back and inserted in its place on Compose the Actors; on Build the flow, assemble the Choreograph column by column with the Actors list closed; open the Actors list only to drag Reflection Step in as "Voice Self-Check" and type the matching line into the Output; size the Deploy dialog to 720px with one fixed height and no inner scroll or card shadow; keep clicked in-thread actions in their taken state. (Unused here: the guideline-to-Canvas edit and the markdown file view.)
- `record.js <outDir>`: real-time CDP screencast (1440x900, 2x) driven by script, with markers for each beat; ends on the hand-off message, then Projects, Library and Home. Clicked in-thread actions are kept in their taken state. Needs `fonts.css` beside it: @font-face rules with base64 woff2 for Inter, Geist Mono, Noto Sans and Fraunces (from @fontsource), since Google Fonts is not reachable from the recorder.
- `compose.py <recDir> <framesOut>`: speeds up the waits per beat, crossfades from the brief into the chat, holds over any frame where a new screen renders before its styling applies, holds the frame over the Deploy popover's own "Continue to ..." in-between states, and dissolves back to the opening frame; writes an ffmpeg concat list.

Encode:

    ffmpeg -f concat -safe 0 -i <framesOut>/list.txt -vf "fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 23 -movflags +faststart walkthrough.mp4
    ffmpeg -f concat -safe 0 -i <framesOut>/list.txt -vf fps=30 -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -cpu-used 4 -deadline good -pix_fmt yuv420p walkthrough.webm
