export default function Home() {
  return (
    <div
      style={{
        backgroundColor: "#000000ff", // gray background
        minHeight: "80vh",          // гол content-ийг page өндөртэй ойролцоо
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#ffffffff" }}>
        Welcome to Naranbaatar's Website
      </h1>
    </div>
  );
}
