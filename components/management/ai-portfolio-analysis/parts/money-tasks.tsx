"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Check, Award } from "lucide-react";
import { MoneyTask } from "../types";

interface MoneyTasksProps {
  tasks: MoneyTask[];
  onCompleteTask: (taskId: string) => void;
}

export function MoneyTasks({ tasks, onCompleteTask }: MoneyTasksProps) {
  return (
    <Card className="border border-border bg-card shadow-sm">
      <CardHeader className="border-b border-border/60 pb-4">
        <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
          Misi Penghematan Dana
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          Selesaikan misi finansial terstruktur untuk membangun kebiasaan dan mengumpulkan poin
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`p-3.5 rounded-lg border transition-colors ${
              task.completed
                ? "bg-primary/5 border-primary/20"
                : "bg-background border-border/80 hover:border-border"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-xs sm:text-sm ${task.completed ? "text-primary line-through" : "text-foreground"}`}>
                    {task.title}
                  </span>
                  <Badge variant="outline" className="text-[10px] font-mono capitalize py-0 px-1.5">
                    {task.difficulty}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0">
                <span className="text-xs font-mono font-semibold text-primary">
                  +{task.reward} poin
                </span>
                {task.completed ? (
                  <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => onCompleteTask(task.id)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs h-7 px-2.5"
                  >
                    Klaim
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
