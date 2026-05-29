import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "Grandma Willie — Alabama Homestyle Cooking Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  let mascotSrc = "";
  try {
    const filePath = path.join(process.cwd(), "public/logos/grandma-willie-mascot.png");
    const buf = await readFile(filePath);
    mascotSrc = `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    /* graceful fallback */
  }

  const stats = [
    { value: "301K+", label: "TikTok Followers" },
    { value: "1.7M+",  label: "TikTok Likes"     },
    { value: "210K+",  label: "Instagram"         },
  ];

  const tags = ["TikTok Creator", "Brand Deals Open", "Booking Available", "Alabama-Rooted"];

  return new ImageResponse(
    (
      /* ROOT — must have display:flex */
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "1200px",
          height: "630px",
          position: "relative",
          background: "linear-gradient(135deg,#FFF3D7 0%,#F8DFA4 55%,#FFF3D7 100%)",
          fontFamily: "Georgia, serif",
          overflow: "hidden",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "8px",
            background: "#B9471B",
          }}
        />

        {/* ── LEFT CONTENT AREA ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 52px 60px 64px",
            width: "860px",
            gap: "14px",
            position: "relative",
            boxSizing: "border-box",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "28px",
                height: "3px",
                background: "#B9471B",
                borderRadius: "99px",
              }}
            />
            <span
              style={{
                display: "flex",
                fontSize: "12px",
                fontWeight: 700,
                color: "#B9471B",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
              }}
            >
              Alabama Homestyle Cooking
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              fontSize: "62px",
              fontWeight: 900,
              color: "#140B07",
              lineHeight: "0.9",
              letterSpacing: "-0.03em",
              maxWidth: "640px",
            }}
          >
            Southern cooking,
            <br />
            Alabama soul.
          </div>

          {/* Subhead */}
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 600,
              color: "#6B351C",
              lineHeight: "1.4",
              maxWidth: "480px",
              marginTop: "4px",
            }}
          >
            Kitchen warmth. Family roots. Creator collaborations.
          </div>

          {/* Tag pills row */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {tags.map((tag) => (
              <div
                key={tag}
                style={{
                  display: "flex",
                  padding: "7px 16px",
                  background: "rgba(20,11,7,0.08)",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#140B07",
                  letterSpacing: "0.04em",
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              marginTop: "14px",
              padding: "14px 28px",
              background: "#B9471B",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "0.04em",
            }}
          >
            Book · Collaborate · Watch
          </div>

          {/* URL watermark */}
          <div
            style={{
              display: "flex",
              position: "absolute",
              bottom: "28px",
              left: "64px",
              fontSize: "11px",
              color: "rgba(107,53,28,0.4)",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            grandma-willie-website.vercel.app
          </div>
        </div>

        {/* ── RIGHT DARK PANEL ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "340px",
            background: "#140B07",
            paddingTop: "34px",
            gap: "0px",
            boxSizing: "border-box",
          }}
        >
          {/* Mascot portrait OR initials badge */}
          {mascotSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mascotSrc}
              alt=""
              width={130}
              height={130}
              style={{
                borderRadius: "50%",
                border: "4px solid #E8B84B",
                objectFit: "cover",
                objectPosition: "top center",
                background: "#F8DFA4",
                display: "flex",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#B9471B",
                fontSize: "44px",
                fontWeight: 900,
                color: "white",
                border: "4px solid #E8B84B",
              }}
            >
              GW
            </div>
          )}

          {/* Name */}
          <div
            style={{
              display: "flex",
              marginTop: "14px",
              fontSize: "16px",
              fontWeight: 900,
              color: "white",
              letterSpacing: "0.03em",
            }}
          >
            Grandma Willie
          </div>

          {/* Title */}
          <div
            style={{
              display: "flex",
              fontSize: "10px",
              fontWeight: 700,
              color: "#E8B84B",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginTop: "4px",
            }}
          >
            Alabama Homestyle Cook
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              width: "76%",
              height: "1px",
              background: "rgba(255,255,255,0.12)",
              margin: "18px 0 14px",
            }}
          />

          {/* Stats list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "9px",
              padding: "0 20px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "11px 14px",
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    fontSize: "9px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    display: "flex",
                    fontSize: "21px",
                    fontWeight: 900,
                    color: "#E8B84B",
                    lineHeight: "1",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
