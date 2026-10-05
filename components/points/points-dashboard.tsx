"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Coins,
  TrendingUp,
  Trophy,
  Target,
  Gift,
  ArrowRight,
  Calendar,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";
import {
  getUserPoints,
  getPointsHistory,
  getPointsAnalytics,
  getGameStreak,
  type PointTransaction,
} from "@/lib/points-system";

export default function PointsDashboard() {
  const [userPoints, setUserPoints] = useState(getUserPoints());
  const [recentTransactions, setRecentTransactions] = useState<PointTransaction[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    setRecentTransactions(getPointsHistory(5));
    setAnalytics(getPointsAnalytics());
  }, []);

  const formatPoints = (points: number) => points.toLocaleString("id-ID");

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getTransactionIcon = (transaction: PointTransaction) =>
    transaction.type === "earn" ? (
      <TrendingUp className="w-4 h-4 text-[#2E8B57]" />
    ) : (
      <Gift className="w-4 h-4 text-muted-foreground" />
    );

  const getTransactionColor = (transaction: PointTransaction) =>
    transaction.type === "earn" ? "text-[#2E8B57]" : "text-muted-foreground";

  const nextMilestone = Math.ceil(userPoints.lifetimeEarned / 1000) * 1000;
  const progress = ((userPoints.lifetimeEarned % 1000) / 1000) * 100;

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-[#2E8B57] to-[#236B43] text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Available Points</p>
                <p className="text-3xl font-bold font-mono tabular-nums">
                  {formatPoints(userPoints.availablePoints)}
                </p>
              </div>
              <Coins className="w-8 h-8 text-white/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Lifetime Earned</p>
                <p className="text-3xl font-bold text-foreground font-mono tabular-nums">
                  {formatPoints(userPoints.lifetimeEarned)}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-[#2E8B57]" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">This Month</p>
                <p className="text-3xl font-bold text-foreground font-mono tabular-nums">
                  {analytics ? formatPoints(analytics.last30DaysEarned) : "0"}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-[#2E8B57]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Milestone */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="w-5 h-5 text-[#2E8B57]" />
            Progress to Next Milestone
          </CardTitle>
          <CardDescription>
            {1000 - (userPoints.lifetimeEarned % 1000)} points to reach {formatPoints(nextMilestone)} points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span className="font-mono tabular-nums">{formatPoints(userPoints.lifetimeEarned)}</span>
            <span className="font-mono tabular-nums">{formatPoints(nextMilestone)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Points Store</CardTitle>
            <CardDescription>Exchange your points for vouchers, top-ups, and premium features</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/points-store">
              <Button className="w-full bg-[#2E8B57] hover:bg-[#236B43] text-white">
                Visit Store
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Earn More Points</CardTitle>
            <CardDescription>Play games and complete challenges to earn more points</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/games">
              <Button variant="outline" className="w-full text-foreground">
                Play Games
                <Gamepad2 className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>Your latest point transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Coins className="w-12 h-12 mx-auto mb-4" />
              <p>No transactions yet</p>
              <p className="text-sm">Start playing games to earn points!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-muted/60 border border-border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {getTransactionIcon(transaction)}
                    <div>
                      <p className="font-medium text-sm text-foreground">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold font-mono tabular-nums ${getTransactionColor(transaction)}`}>
                      {transaction.type === "earn" ? "+" : "-"}
                      {formatPoints(transaction.amount)}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.type === "earn" ? "Earned" : "Spent"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics */}
      {analytics && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Your Stats</CardTitle>
            <CardDescription>Points earning insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
                  {formatPoints(analytics.totalEarned)}
                </p>
                <p className="text-sm text-muted-foreground">Total Earned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
                  {formatPoints(analytics.totalSpent)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground font-mono tabular-nums">
                  {analytics.averagePerGame}
                </p>
                <p className="text-sm text-muted-foreground">Avg per Game</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#2E8B57] font-mono tabular-nums">
                  {getGameStreak(analytics.favoriteGame)}
                </p>
                <p className="text-sm text-muted-foreground">Best Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}