import { Box } from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { SlackTeamSummaryCard } from "../../../src/components/TeamSummaryCard";
import { getSlackData } from "../../../src/data/SlackDataCSV";
import { getTeamData, TeamSummaryData } from "../../../src/services/OrgService";

const TeamSummaryPage: NextPage<{
  data: TeamSummaryData;
}> = ({ data }) => {
  return (
    <Box mt={2}>
      <SlackTeamSummaryCard data={data} />
    </Box>
  );
};

export default TeamSummaryPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.params?.teamId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const data = await getSlackData();
  const teamData = getTeamData(data, ctx.params?.teamId as string);
  return {
    props: {
      data: teamData,
    },
  };
};
