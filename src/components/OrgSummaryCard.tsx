import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { OrgSummaryData } from "../services/TeamService";
import { OrgSummarySentiment } from "./OrgSummarySentiment";

const OrgSummaryEngagement = ({ data }: { data: OrgSummaryData }) => {
  return (
    <>
      <Typography color="text.secondary" fontWeight="bold" mt={2} mb={1}>
        Engagement
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
        <Button size="small">View Teams</Button>
        <Button size="small">View People</Button>
      </CardActions>
    </Card>
  );
};
