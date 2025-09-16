export default function Contact() {
  return (
    <div
      style={{
        backgroundColor: "#000000ff",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#ffffffff", marginBottom: "20px" }}>
        Contact Me
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#ffffffff", maxWidth: "600px" }}>
        email: <strong>contact@sw23d001@mandakh.edu.mn</strong>
      </p>
      <p style={{ fontSize: "1.2rem", color: "#ffffffff", maxWidth: "600px", marginTop: "10px" }}>
        call me maybe: <strong>+976 99922509</strong>
      </p>
    </div>
  );
}
