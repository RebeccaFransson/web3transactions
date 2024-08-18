import type { ReactNode } from "react";

const Badge = ({
  children,
  color,
}: {
  children: ReactNode;
  color: "primary" | "secondary" | "positive" | "warning";
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "primary":
        return "bg-pink-100 border-pink-300 text-pink ";
      case "secondary":
        return "bg-blue-100 border-blue-300 text-blue-500 ";
      case "positive":
        return "bg-green-100 border-green-300 text-green-500 ";
      case "warning":
        return "bg-orange-100 border-orange-300 text-orange ";
      default:
        return;
    }
  };
  return (
    <div
      className={`w-fit py-1 px-2 ${getColorClasses()} border rounded-full text-xs  font-bold `}
    >
      {children}
    </div>
  );
};

export const PrimaryBadge = ({ children }: { children: ReactNode }) => {
  return <Badge color="primary">{children}</Badge>;
};

export const SecondaryBadge = ({ children }: { children: ReactNode }) => {
  return <Badge color="secondary">{children}</Badge>;
};

export const PositiveBadge = ({ children }: { children: ReactNode }) => {
  return <Badge color="positive">{children}</Badge>;
};

export const WarningBadge = ({ children }: { children: ReactNode }) => {
  return <Badge color="warning">{children}</Badge>;
};
