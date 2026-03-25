import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "The Magic Tree Adventures — Journey to the Crystal Mountain";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FDF6EC 0%, #F5E6CC 50%, #FDF6EC 100%)",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative elements */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,150,62,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(200,182,232,0.1) 0%, transparent 70%)",
          }}
        />

        {/* Rainbow chakra bar */}
        <div
          style={{
            display: "flex",
            gap: 6,
            marginBottom: 40,
          }}
        >
          {["#E05555", "#F0923E", "#F0D03E", "#5DBB63", "#5B8FD4", "#8B5DC8", "#D4B8F0"].map(
            (colour) => (
              <div
                key={colour}
                style={{
                  width: 28,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: colour,
                }}
              />
            )
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#3D2B1F",
            lineHeight: 1.1,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          The Magic Tree Adventures
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#C8963E",
            marginTop: 16,
            fontStyle: "italic",
          }}
        >
          Journey to the Crystal Mountain
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 18,
            color: "#5C4033",
            marginTop: 20,
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          A magical story about finding your voice, discovering your inner
          light, and the adventure of a lifetime.
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background:
              "linear-gradient(90deg, #E05555, #F0923E, #F0D03E, #5DBB63, #5B8FD4, #8B5DC8, #D4B8F0)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
