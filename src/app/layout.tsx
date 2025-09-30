import "./globals.css";
import SidebarNavbar from "@/components/SidebarNavbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Next.js Lab",
  description: "Static/Dynamic Routes Practice",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <SidebarNavbar />
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
