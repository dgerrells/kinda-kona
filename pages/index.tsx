import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { getSlackData } from "../src/data/SlackDataCSV";
import {
  getSlackOrgData,
  getSlackOrgIds,
  OrgSummaryData,
} from "../src/services/TeamService";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentNeutralIcon from "@mui/icons-material/SentimentNeutral";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import { CenterStack } from "../src/components/Stacks";
import { useEffect } from "react";
import { OrgSummarySentiment } from "../src/components/OrgSummarySentiment";

const OrgSummaryEngagement = ({ data }: { data: OrgSummaryData }) => {
  return (
    <>
      <Typography color="text.secondary" fontWeight="bold" mt={2} mb={1}>
        Engagement
      </Typography>
    </>
  );
};

const SlackOrgSummaryCard = ({ data }: { data: OrgSummaryData }) => {
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

const Home: NextPage<{ data: Array<OrgSummaryData> }> = ({ data }) => {
  console.log(data);

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Organizations at a glance
      </Typography>
      <Box mt={2}>
        {data.map((orgData) => (
          <SlackOrgSummaryCard key={orgData.orgId} data={orgData} />
        ))}
      </Box>
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const data = await getSlackData();
  const slackOrgs = getSlackOrgIds(data);
  const orgData = slackOrgs.map((id) => getSlackOrgData(data, id));
  return {
    props: {
      data: orgData,
    },
  };
}
