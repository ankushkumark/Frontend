// src/components/ui/card.js
export function Card({ className = "", children, ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white shadow-sm border border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
