import {
  Typography,
  Box,
  CardActions,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
} from "@mui/material";
import { GetServerSideProps, NextPage } from "next";
import { getSlackData } from "../../../src/data/SlackDataCSV";
import {
  getSlackOrgData,
  OrgSummaryData,
} from "../../../src/services/OrgService";

const OrgSummaryPage: NextPage<{ data: OrgSummaryData }> = ({ data }) => {
  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        Teams
      </Typography>
      <Stack my={2} spacing={2}>
        {data.slackTeamIds.map((teamId) => (
          <Card key={teamId}>
            <CardContent>{teamId}</CardContent>
            <CardActions>
              <Link href={`/org/${data.orgId}/${teamId}`}>
                <Button>View team</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
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
