import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { getSlackData } from "../src/data/SlackDataCSV";
import {
  getSlackOrgData,
  getSlackOrgIds,
  OrgSummaryData,
} from "../src/services/OrgService";
import { SlackOrgSummaryCard } from "../src/components/OrgSummaryCard";

const Home: NextPage<{ data: Array<OrgSummaryData> }> = ({ data }) => {
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
