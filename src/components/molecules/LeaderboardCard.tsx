import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useHighScores } from "@/hooks/useHighScores";
import { Skeleton } from "@/components/ui/skeleton";
import { Trophy, Medal, Award } from "lucide-react";
import { useAuth } from "@/hooks";

export const LeaderboardCard = () => {
  const { highScores, isLoading } = useHighScores();
  const { user } = useAuth();
  const currentUsername = user.user?.user.username;

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {highScores.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No scores yet. Be the first to play!
          </p>
        ) : (
          <div className="space-y-2">
            {highScores.map((player, index) => {
              const isCurrentUser = player.username === currentUsername;
              return (
                <div
                  key={`${player.username}-${index}`}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isCurrentUser
                      ? "bg-primary/10 border-2 border-primary"
                      : "bg-muted hover:bg-muted/80"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-background font-semibold text-sm">
                      {index < 3 ? (
                        getRankIcon(index)
                      ) : (
                        <span className="text-muted-foreground">#{index + 1}</span>
                      )}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className={`font-medium ${
                          isCurrentUser ? "text-primary font-bold" : ""
                        }`}
                      >
                        {player.username}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs text-primary">(You)</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{player.score}</span>
                    <span className="text-xs text-muted-foreground">pts</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

