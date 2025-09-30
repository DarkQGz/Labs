"use client"; // client component

import { useRouter } from "next/navigation";

interface BlogProps {
  params: { id: string };
}

const blogPosts = [
  { id: "1", title: "First Post", content: "This is the content of blog post 1." },
  { id: "2", title: "Second Post", content: "This is the content of blog post 2." },
  { id: "3", title: "Third Post", content: "This is the content of blog post 3." },
];

export default function BlogPost({ params }: BlogProps) {
  const router = useRouter();
  const post = blogPosts.find((p) => p.id === params.id);

  if (!post) return <p style={{ color: "white", textAlign: "center" }}>Blog not found</p>;

  const currentIndex = blogPosts.findIndex((p) => p.id === params.id);
  const nextPost = blogPosts[currentIndex + 1];
  const prevPost = blogPosts[currentIndex - 1];

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "80vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "15px" }}>
        {prevPost && (
          <button
            onClick={() => router.push(`/blog/${prevPost.id}`)}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 1)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            ← Previous
          </button>
        )}

        <a
          href={`/blog/${params.id}/comments`}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffffffff",
            color: "#000",
            textDecoration: "none",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          Comments
        </a>

        {nextPost && (
          <button
            onClick={() => router.push(`/blog/${nextPost.id}`)}
            style={{
              padding: "10px 20px",
              backgroundColor: "rgba(255, 255, 255, 1)",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
