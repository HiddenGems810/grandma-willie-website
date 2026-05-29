import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Grandma Willie — Alabama Homestyle Cooking Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          background: "#FFF3D7",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
        }}
      >
        {/* Background warm gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #FFF3D7 0%, #F8DFA4 50%, #FFF3D7 100%)",
          }}
        />

        {/* Decorative accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            background: "#B9471B",
          }}
        />

        {/* Right tomato accent strip */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "320px",
            background: "#140B07",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {/* Stats on dark side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              padding: "32px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "20px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#E8B84B",
                  lineHeight: 1,
                }}
              >
                301K+
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                TikTok Followers
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "20px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#E8B84B",
                  lineHeight: 1,
                }}
              >
                210K+
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Instagram Followers
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "20px",
                background: "rgba(255,255,255,0.06)",
                borderRadius: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#E8B84B",
                  lineHeight: 1,
                }}
              >
                1.7M+
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                TikTok Likes
              </span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "64px 48px 64px 64px",
            width: "880px",
            gap: "16px",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "3px",
                background: "#B9471B",
                borderRadius: "99px",
              }}
            />
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#B9471B",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
              }}
            >
              Alabama Homestyle Cooking
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#140B07",
              lineHeight: "0.9",
              letterSpacing: "-0.03em",
              maxWidth: "700px",
            }}
          >
            Grandma Willie
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: 700,
              color: "#6B351C",
              lineHeight: "1.3",
              maxWidth: "540px",
            }}
          >
            Southern cooking, Alabama soul, and kitchen love people remember.
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            {["TikTok Creator", "Brand Collaborations", "Booking Open", "Alabama-Rooted"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "8px 18px",
                    background: "rgba(20,11,7,0.08)",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#140B07",
                    letterSpacing: "0.06em",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          {/* Bottom CTA hint */}
          <div
            style={{
              marginTop: "24px",
              padding: "14px 28px",
              background: "#B9471B",
              borderRadius: "999px",
              fontSize: "16px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "0.04em",
              alignSelf: "flex-start",
            }}
          >
            Book · Collaborate · Watch
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
