export default function StructuredData({ data }) {
  const items = Array.isArray(data) ? data : [data];

  return items.filter(Boolean).map((item) => (
    <script
      key={item["@id"] || item["@type"]}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(item).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
