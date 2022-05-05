import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { OrgSummaryData, TeamSummaryData } from "../services/OrgService";
import { OrgSummarySentiment } from "./OrgSummarySentiment";

const SummaryEngagement = ({ data }: { data: TeamSummaryData }) => {
  const sortedEngagement = useMemo(
    () =>
      Object.keys(data.slackUserEngagement)
        .sort(
          (a, b) => data.slackUserEngagement[a] - data.slackUserEngagement[b]
        )
        .map((key) => ({ id: key, value: data.slackUserEngagement[key] })),
    [data]
  );

  return (
    <>
      <Typography color="text.secondary" fontWeight="bold" mt={2} mb={1}>
        Engagement
      </Typography>
      {sortedEngagement.length < 1 && (
        <Typography>This team has no interactions! Take action!</Typography>
      )}
      {sortedEngagement.length > 0 && (
        <>
          <Typography>
            <strong>{sortedEngagement[0].id}</strong> is the least engaged
            person with only <strong>{sortedEngagement[0].value}</strong>{" "}
            interactions.
          </Typography>
          <Typography>
            <strong>{sortedEngagement[sortedEngagement.length - 1].id}</strong>{" "}
            is the most engaged person with{" "}
            <strong>
              {sortedEngagement[sortedEngagement.length - 1].value}
            </strong>{" "}
            interactions.
          </Typography>
        </>
      )}
    </>
  );
};

export const SlackTeamSummaryCard = ({ data }: { data: TeamSummaryData }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" mb={2}>
          {data.teamId}
        </Typography>
        <Typography>
          This team has <strong>{data.slackUserIds.length}</strong> people with
          an engagement score of <strong>{data.engagementCount}</strong>.
        </Typography>
        <OrgSummarySentiment data={data} />
        <SummaryEngagement data={data} />
      </CardContent>
      <CardActions>
        <Button size="small">View People</Button>
      </CardActions>
    </Card>
  );
};
