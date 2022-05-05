import { Box, Typography } from "@mui/material";
import { OrgSummaryData } from "../services/TeamService";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { CenterStack } from "./Stacks";
import { useEffect, useRef, useState } from "react";
import { WordCloudChart } from "chartjs-chart-wordcloud";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  WordCloudController,
  WordElement
);

export const OrgSummarySentiment = ({ data }: { data: OrgSummaryData }) => {
  const ref = useRef<any>(null);
  const totalSentimentTouchPoints =
    data.selectionCounts.green +
    data.selectionCounts.red +
    data.selectionCounts.yellow;
  const greenPercent = data.selectionCounts.green / totalSentimentTouchPoints;
  const yellowPercent = data.selectionCounts.yellow / totalSentimentTouchPoints;
  const redPercent = data.selectionCounts.red / totalSentimentTouchPoints;

  useEffect(() => {
    const ctx = "sentimentCloud";
    if (ref.current) ref.current.destroy();

    ref.current = new WordCloudChart(ctx, {
      data: {
        labels: Object.keys(data.emotionCounts),
        datasets: [
          {
            label: "Hi",
            data: Object.keys(data.emotionCounts).map(
              (key) => Math.min(100, 10 + data.emotionCounts[key]) * 0.8
            ),
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, []);

  return (
    <>
      <Typography color="text.secondary" fontWeight="bold" mt={2} mb={1}>
        Sentiment
      </Typography>
      <CenterStack direction="row" spacing={3}>
        <CenterStack padding={3} borderRadius={100}>
          <SentimentSatisfiedAltIcon
            sx={{ fontSize: "4rem" }}
            color="success"
          />
          <Typography color="success.main" fontWeight="bold">
            {data.selectionCounts.green}
          </Typography>
        </CenterStack>
        <CenterStack padding={3} borderRadius={100}>
          <SentimentNeutralIcon sx={{ fontSize: "4rem" }} color="warning" />
          <Typography color="warning.main" fontWeight="bold">
            {data.selectionCounts.yellow}
          </Typography>
        </CenterStack>
        <CenterStack padding={3} borderRadius={100}>
          <SentimentVeryDissatisfiedIcon
            sx={{ fontSize: "4rem" }}
            color="error"
          />
          <Typography color="error.main" fontWeight="bold">
            {data.selectionCounts.red}
          </Typography>
        </CenterStack>
      </CenterStack>
      <CenterStack
        direction="row"
        sx={{
          height: "2rem",
        }}
      >
        <Box
          flex={greenPercent}
          bgcolor="success.main"
          height="100%"
          sx={{
            borderBottomLeftRadius: "2rem",
            borderTopLeftRadius: "2rem",
          }}
        />
        <Box flex={yellowPercent} bgcolor="warning.main" height="100%" />
        <Box
          flex={redPercent}
          bgcolor="error.main"
          height="100%"
          sx={{
            borderBottomRightRadius: "2rem",
            borderTopRightRadius: "2rem",
          }}
        />
      </CenterStack>
      <Box mt={2} sx={{ display: "block" }}>
        <canvas height="400px" id="sentimentCloud"></canvas>
      </Box>
    </>
  );
};
