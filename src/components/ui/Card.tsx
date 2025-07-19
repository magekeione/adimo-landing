import { ReactNode } from "react";
import { clsx } from "clsx";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow-lg border border-gray-200",
        hover && "hover:shadow-xl transition-shadow duration-300",
        className
      )}
    >
      {children}
    </div>
  );
}

