interface CommentsProps {
  params: { id: string };
}

// Dummy comments
const commentsData: Record<string, string[]> = {
  "1": ["Comment 1 on post 1", "Comment 2 on post 1"],
  "2": ["Comment 1 on post 2", "Comment 2 on post 2"],
  "3": ["Comment 1 on post 3", "Comment 2 on post 3", "Comment 3 on post 3"],
};

export default function Comments({ params }: CommentsProps) {
  const comments = commentsData[params.id] || [];

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
      <h2>Comments for Blog #{params.id}</h2>
      <ul>
        {comments.length > 0 ? comments.map((c, idx) => <li key={idx}>{c}</li>) : <li>No comments yet</li>}
      </ul>
    </div>
  );
}
