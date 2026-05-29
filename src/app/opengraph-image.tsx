import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Grandma Willie — Alabama Homestyle Cooking Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Load the mascot PNG as ArrayBuffer for use inside ImageResponse
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://grandma-willie-website.vercel.app";

  let mascotSrc: string = "";
  try {
    const res = await fetch(`${siteUrl}/logos/grandma-willie-mascot.png`);
    const buf = await res.arrayBuffer();
    const b64 = Buffer.from(buf).toString("base64");
    mascotSrc = `data:image/png;base64,${b64}`;
  } catch {
    // Mascot unavailable — graceful fallback to initials badge
  }

  const stats = [
    { value: "301K+", label: "TikTok Followers" },
    { value: "1.7M+", label: "TikTok Likes" },
    { value: "210K+", label: "Instagram" },
  ];

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
        {/* Warm gradient background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #FFF3D7 0%, #F8DFA4 55%, #FFF3D7 100%)",
          }}
        />

        {/* Left accent bar */}
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

        {/* Right dark panel */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "340px",
            background: "#140B07",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          {/* Mascot logo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px 28px 20px",
              gap: "0px",
            }}
          >
            {mascotSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mascotSrc}
                alt="Grandma Willie mascot"
                width={130}
                height={130}
                style={{
                  borderRadius: "50%",
                  border: "3px solid #E8B84B",
                  objectFit: "cover",
                  objectPosition: "top",
                  background: "#F8DFA4",
                }}
              />
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  background: "#B9471B",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  fontWeight: 900,
                  color: "white",
                  border: "3px solid #E8B84B",
                }}
              >
                GW
              </div>
            )}

            <div
              style={{
                marginTop: "12px",
                fontSize: "15px",
                fontWeight: 900,
                color: "white",
                textAlign: "center",
                letterSpacing: "0.04em",
              }}
            >
              Grandma Willie
            </div>
            <div
              style={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#E8B84B",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: "3px",
              }}
            >
              Alabama Homestyle Cook
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80%",
              height: "1px",
              background: "rgba(255,255,255,0.12)",
              margin: "4px 0 16px",
            }}
          />

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "0 24px 28px",
              width: "100%",
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
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: "12px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.55)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: "22px",
                    fontWeight: 900,
                    color: "#E8B84B",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content left area */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 48px 60px 64px",
            width: "860px",
            gap: "14px",
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "28px",
                height: "3px",
                background: "#B9471B",
                borderRadius: "99px",
              }}
            />
            <span
              style={{
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

          {/* Main headline */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#140B07",
              lineHeight: "0.88",
              letterSpacing: "-0.03em",
              maxWidth: "660px",
            }}
          >
            Southern cooking,
            <br />
            Alabama soul.
          </div>

          {/* Subheadline */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#6B351C",
              lineHeight: "1.4",
              maxWidth: "500px",
              marginTop: "4px",
            }}
          >
            Kitchen warmth. Family roots. Creator collaborations.
          </div>

          {/* Tag pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            {["TikTok Creator", "Brand Deals Open", "Booking Available", "Alabama-Rooted"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "7px 16px",
                    background: "rgba(20,11,7,0.08)",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#140B07",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          {/* CTA button */}
          <div
            style={{
              marginTop: "20px",
              padding: "14px 28px",
              background: "#B9471B",
              borderRadius: "999px",
              fontSize: "15px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "0.04em",
              alignSelf: "flex-start",
              display: "flex",
            }}
          >
            Book · Collaborate · Watch
          </div>

          {/* Domain watermark */}
          <div
            style={{
              position: "absolute",
              bottom: "28px",
              left: "64px",
              fontSize: "11px",
              color: "rgba(107,53,28,0.5)",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            grandma-willie-website.vercel.app
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
