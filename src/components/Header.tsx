import Link from "next/link";

export default function Header() {
  return (
    <header style={{ display: "flex", gap: "20px", padding: "10px", background: "#000000ff" }}>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/blog/1">Blog</Link>
    </header>
  );
}
