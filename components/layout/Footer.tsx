import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
      }}
    >
      <div className="section-container">
        <div className="content-width">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--gap-v)",
            }}
          >
            {/* Top section */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "var(--gap-h)",
              }}
            >
              {/* Branding */}
              <div>
                <h2 style={{ marginBottom: "24px" }}>Eat Real</h2>
                <div style={{ display: "flex", gap: "16px" }}>
                  <Image
                    src="/images/pyramid/steak.webp"
                    alt="Steak"
                    width={60}
                    height={60}
                    style={{ borderRadius: "50%" }}
                  />
                  <Image
                    src="/images/pyramid/salmon.webp"
                    alt="Salmon"
                    width={60}
                    height={60}
                    style={{ borderRadius: "50%" }}
                  />
                  <Image
                    src="/images/pyramid/chicken.webp"
                    alt="Chicken"
                    width={60}
                    height={60}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>

              {/* Links */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--gap-v)",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "var(--xs-text-size)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: 0.5,
                      marginBottom: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Government
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <li>
                      <a
                        href="https://www.usda.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--off-white)",
                          opacity: 0.7,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        USDA
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.hhs.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--off-white)",
                          opacity: 0.7,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        HHS
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.whitehouse.gov"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--off-white)",
                          opacity: 0.7,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        White House
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p
                    style={{
                      fontSize: "var(--xs-text-size)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: 0.5,
                      marginBottom: "16px",
                      fontWeight: 500,
                    }}
                  >
                    Contact
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <li>
                      <a
                        href="mailto:DietaryGuidelines@usda.gov"
                        style={{
                          color: "var(--off-white)",
                          opacity: 0.7,
                          textDecoration: "none",
                          transition: "opacity 0.2s ease",
                        }}
                      >
                        DietaryGuidelines@usda.gov
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div
              style={{
                paddingTop: "32px",
                borderTop: "1px solid rgba(253, 251, 238, 0.1)",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: "16px",
                fontSize: "var(--s-text-size)",
                color: "rgba(253, 251, 238, 0.4)",
              }}
            >
              <p>
                Designed &amp; Engineered in D.C. by{" "}
                <a
                  href="https://nd.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", color: "inherit" }}
                >
                  National Design Studio
                </a>
              </p>
              <p>&copy; {new Date().getFullYear()} United States Government</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
