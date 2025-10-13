import * as Icons from "lucide-react";
export type IconName = keyof typeof Icons;

export const DynamicIcon = ({
  icon,
  className = "",
}: {
  icon: IconName;
  className?: string;
}) => {
  const DynamicIcon = Icons[icon] as Icons.LucideIcon;
  return <DynamicIcon className={className} />;
};
