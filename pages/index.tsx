import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getSlackData } from "../data/SlackDataCSV";
import { getSlackOrgData, getSlackOrgIds } from "../services/TeamService";

const Home: NextPage = ({ data }) => {
  console.log(data);

  return <div>Hi</div>;
};

export default Home;

export async function getServerSideProps() {
  const data = await getSlackData();
  const slackOrgs = getSlackOrgIds(data);
  const slackOrgData = getSlackOrgData(data, slackOrgs[0]);
  console.log(slackOrgs);
  return {
    props: {
      data: slackOrgData,
    },
  };
}
