import brand from "@/data/brand";
export default function BrandLogo({ className, style }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox={brand.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {brand.paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill={path.fill || "currentColor"}
          fillRule={path.fillRule}
          style={{ "--part": index }}
        />
      ))}
    </svg>
  );
}
