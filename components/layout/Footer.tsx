export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
        padding: "0",
      }}
    >
      <div
        style={{
          borderTop: "1px solid rgba(253, 251, 238, 0.15)",
          padding: "24px 0",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            opacity: 1,
          }}
        >
          Designed &amp; Engineered by Claude Code
        </p>
      </div>
    </footer>
  );
}
