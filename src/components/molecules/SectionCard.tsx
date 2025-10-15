import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SectionCardModel {
  title: string;
  titleVal: string;
  tagBadgeVal: string;
  secondTitle: string;
  secondVal: string;
  firstBadgeIcon: "IconTrendingUp" | "IconTrendingDown";
  secondBadgeIcon: "IconTrendingUp" | "IconTrendingDown";
}

export const SectionCard: React.FC<SectionCardModel> = ({
  title,
  titleVal,
  tagBadgeVal,
  secondTitle,
  secondVal,
  firstBadgeIcon,
  secondBadgeIcon,
}) => {
  return (
    <div className="h-fit w-full *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs ">
      <Card className="@container/card w-full">
        <CardHeader>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {titleVal}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {firstBadgeIcon === "IconTrendingUp" ? (
                <IconTrendingUp />
              ) : (
                <IconTrendingDown />
              )}
              {tagBadgeVal}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {secondTitle}{" "}
            {secondBadgeIcon === "IconTrendingUp" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">{secondVal}</div>
        </CardFooter>
      </Card>
    </div>
  );
};
