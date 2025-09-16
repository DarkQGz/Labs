interface DocsProps {
  params: { slug: string[] }
}

export default function Docs({ params }: DocsProps) {
  return (
    <div>
      <h1>Docs Page</h1>
      <p>Slug: {params.slug.join(" / ")}</p>
    </div>
  );
}
