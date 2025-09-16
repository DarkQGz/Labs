"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

interface BlogParams {
  id: string;
}

interface BlogProps {
  params: Promise<BlogParams>;
}

const blogPosts = [
  { id: "1", title: "First Post", content: "This is blog post 1." },
  { id: "2", title: "Second Post", content: "This is blog post 2." },
  { id: "3", title: "Third Post", content: "This is blog post 3." },
];

export default function BlogPost({ params }: BlogProps) {
  const router = useRouter();
  const { id } = React.use(params);

  const post = blogPosts.find((p) => p.id === id);
  if (!post) return <p style={{ color: "white", textAlign: "center" }}>Blog not found</p>;

  const currentIndex = blogPosts.findIndex((p) => p.id === id);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  return (
    <div style={{ backgroundColor: "#000", minHeight: "80vh", color: "#fff", padding: "20px", textAlign: "center" }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px", justifyContent: "center" }}>
        {prevPost && <button onClick={() => router.push(`/blog/${prevPost.id}`)} style={{ padding: "10px 20px", backgroundColor: "rgba(255, 255, 255, 1)", border: "none", borderRadius: "5px", cursor: "pointer", color: "#000", fontWeight: "bold" }}>← Previous</button>}
        <a href={`/blog/${id}/comments`} style={{ padding: "10px 20px", backgroundColor: "#fff", color: "#000", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>Comments</a>
        {nextPost && <button onClick={() => router.push(`/blog/${nextPost.id}`)} style={{ padding: "10px 20px", backgroundColor: "rgba(255, 255, 255, 1)", border: "none", borderRadius: "5px", cursor: "pointer", color: "#000", fontWeight: "bold" }}>Next →</button>}
      </div>
    </div>
  );
}
