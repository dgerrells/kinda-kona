import { Typography, Box } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { SlackOrgSummaryCard } from "../../src/components/OrgSummaryCard";
import { getSlackData } from "../../src/data/SlackDataCSV";
import {
  getSlackOrgData,
  OrgSummaryData,
} from "../../src/services/TeamService";

const OrgSummaryPage: NextPage<{ data: OrgSummaryData }> = ({ data }) => {
  return (
    <Box mt={2}>
      <SlackOrgSummaryCard key={data.orgId} data={data} />
    </Box>
  );
};

export default OrgSummaryPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params?.orgId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await getSlackData();

  return {
    props: {
      data: getSlackOrgData(data, ctx.params?.orgId as string),
    },
  };
};
