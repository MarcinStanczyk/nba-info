"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { backendFetch } from "@/lib/backend-api";

interface ChampionPrediction {
  teamName: string;
  teamCode: string;
  probability: number;
  reason: string;
  generatedAt?: string;
  topProbabilities?: Array<{
    teamName: string;
    teamCode: string;
    probability: number;
  }>;
}

export function FeatureChampionComponent() {
  const [isCalculating, setIsCalculating] = useState(false);
  const [prediction, setPrediction] = useState<ChampionPrediction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculateChampion = async () => {
    setIsCalculating(true);
    setError(null);
    setPrediction(null);

    try {
      const data = await backendFetch<ChampionPrediction>("/api/champion/calculate");
      setPrediction(data);
    } catch (err) {
      console.error("Champion prediction request failed", err);
      setError("Failed to calculate champion prediction. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card className="bg-secondary/50 border-nba-orange/30">
        <CardHeader>
          <CardTitle className="text-nba-orange">AI Champion Predictor</CardTitle>
          <CardDescription>
            Use advanced analytics to predict the NBA champion for this season
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This tool analyzes team statistics, roster strength, historical performance, and other
            key metrics to provide a data-driven prediction of which team will win the NBA
            championship this season.
          </p>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleCalculateChampion}
          disabled={isCalculating}
          size="lg"
          className="gap-2 bg-nba-orange hover:bg-nba-orange/90 text-foreground"
        >
          {isCalculating && <Spinner className="h-4 w-4" />}
          {isCalculating ? "Calculating..." : "Calculate who will be champion"}
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="border-red-500/50 bg-red-500/10">
          <CardContent className="pt-6">
            <p className="text-sm text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Prediction Result */}
      {prediction && (
        <Card className="border-nba-orange/30 bg-nba-orange/5">
          <CardHeader>
            <CardTitle className="text-2xl">
              <span className="text-nba-orange">{prediction.teamName}</span>
            </CardTitle>
            <CardDescription>Predicted NBA Champion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Confidence</h4>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-nba-orange transition-all duration-500"
                    style={{ width: `${prediction.probability * 100}%` }}
                  />
                </div>
                <Badge className="bg-nba-orange text-foreground text-sm">
                  {(prediction.probability * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-muted-foreground mb-2">Analysis</h4>
              <p className="text-sm text-foreground">{prediction.reason}</p>
            </div>

            {prediction.topProbabilities && prediction.topProbabilities.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-muted-foreground mb-2">Top 5 Teams</h4>
                <div className="space-y-2">
                  {prediction.topProbabilities.slice(0, 5).map((team, index) => (
                    <div
                      key={`${team.teamCode}-${team.teamName}`}
                      className="rounded-md border border-border/70 bg-background/40 p-2"
                    >
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium">
                          {index + 1}. {team.teamName}
                        </span>
                        <Badge variant="secondary">{(team.probability * 100).toFixed(1)}%</Badge>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full bg-nba-orange transition-all duration-500"
                          style={{ width: `${team.probability * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {prediction.generatedAt && (
              <p className="text-xs text-muted-foreground">
                Generated at: {new Date(prediction.generatedAt).toLocaleString()}
              </p>
            )}

            <Button
              onClick={() => setPrediction(null)}
              variant="outline"
              className="w-full"
            >
              Calculate Again
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

