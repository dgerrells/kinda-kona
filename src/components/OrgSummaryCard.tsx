import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";
import { OrgSummaryData } from "../services/OrgService";
import { OrgSummarySentiment } from "./OrgSummarySentiment";

const OrgSummaryEngagement = ({ data }: { data: OrgSummaryData }) => {
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
      <Typography>
        <strong>{sortedEngagement[0].id}</strong> is the least engaged person
        with only <strong>{sortedEngagement[0].value}</strong> interactions.
      </Typography>
      <Typography>
        <strong>{sortedEngagement[sortedEngagement.length - 1].id}</strong> is
        the most engaged person with{" "}
        <strong>{sortedEngagement[sortedEngagement.length - 1].value}</strong>{" "}
        interactions.
      </Typography>
    </>
  );
};

export const SlackOrgSummaryCard = ({ data }: { data: OrgSummaryData }) => {
  return (
    <Card>
      <CardContent>
        <Typography color="text.secondary" mb={2}>
          {data.orgId}
        </Typography>
        <Typography>
          This org has <strong>{data.slackUserIds.length}</strong> people across{" "}
          <strong>{data.slackTeamIds.length}</strong> teams with an engagement
          score of <strong>{data.engagementCount}</strong>.
        </Typography>
        <OrgSummarySentiment data={data} />
        <OrgSummaryEngagement data={data} />
      </CardContent>
      <CardActions>
        <Link href={`/org/${data.orgId}`}>
          <Button size="small">View Teams</Button>
        </Link>
      </CardActions>
    </Card>
  );
};
