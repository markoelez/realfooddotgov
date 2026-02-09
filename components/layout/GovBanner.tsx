"use client";

export default function GovBanner() {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        paddingTop: "14px",
        paddingBottom: "14px",
        paddingLeft: "var(--padding-h)",
        paddingRight: "var(--padding-h)",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--off-black)",
        color: "var(--off-white)",
        borderBottom: "0.5px solid color-mix(in srgb, var(--off-white) 25%, transparent)",
        fontFamily: "ui-monospace, 'Geist Mono', monospace",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 400,
          lineHeight: "1",
          letterSpacing: "0.06em",
          textTransform: "uppercase" as const,
        }}
      >
        <svg
          width="20"
          height="12"
          viewBox="0 0 16 12"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, marginRight: "12px" }}
        >
        <path fill="#FDFBEE" d="M0 0h16v12H0z" />
        <path
          fill="#BD0C3C"
          d="M0 0h16v.924H8v.923h8v.924H8v.924h8v.923H8v.924h8v.924H0V0Zm1.053.8-.21.2L.631.8l.21-.2.21.2Zm1.263 0-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2ZM4.842.8l-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2ZM7.368.8l-.21.2-.21-.2.21-.2.21.2ZM1.474 1.801l.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2ZM4 1.8l.21-.2L4 1.4l-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm-5.473.6-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm-5.474.601-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.211.2-.21-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm-5.895 1 .21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2ZM1.474 5.003l.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm-5.473.6-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
        <path
          fill="#BD0C3C"
          d="M16 7.397v.9H0v-.9h16ZM16 10.199v-1H0v1h16ZM16 11.1v.9H0v-.9h16Z"
        />
        <g clipPath="url(#flag-clip)">
          <path fill="#FDFBEE" d="M0 0h8v7H0z" />
          <path fill="#FDFBEE" d="M0 0h8v7H0z" />
          <path
            fill="#022164"
            d="M0 0h16v.924H8v.923h8v.924H8v.924h8v.923H8v.924h8v.924H0V0Zm1.053.8-.21.2L.631.8l.21-.2.21.2Zm1.263 0-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2ZM4.842.8l-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2ZM7.368.8l-.21.2-.21-.2.21-.2.21.2ZM1.474 1.801l.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2ZM4 1.8l.21-.2L4 1.4l-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm-5.473.6-.21.2-.211-.2.21-.2.21.2Zm1.052.2.21-.2-.21-.2-.21.2.21.2Zm1.474-.2-.21.2-.211-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Zm1.473-.2-.21.2-.21-.2.21-.2.21.2Zm1.053.2.21-.2-.21-.2-.21.2.21.2Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
          <path
            fill="#022164"
            d="M16 7.397v.9H0v-.9zm0 2.802v-1H0v1zm0 .901v.9H0v-.9z"
          />
        </g>
        <defs>
          <clipPath id="flag-clip">
            <path fill="#fff" d="M0 0h8v7H0z" />
          </clipPath>
        </defs>
      </svg>
        <span>An official website of the United States government</span>
      </div>
    </div>
  );
}
