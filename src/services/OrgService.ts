import { TouchPoint } from "../data/SlackDataCSV";

export const getSlackOrgIds = (data: Array<TouchPoint>) => {
  const ids = new Set<string>();
  data.forEach((touchPoint) => {
    ids.add(touchPoint.SlackOrgId);
  });

  return [...ids];
};

export type OrgSummaryData = {
  orgId: string;
  slackTeamIds: string[];
  slackUserIds: string[];
  slackUserEngagement: {
    [k: string]: number;
  };
  emotionCounts: {
    [k: string]: number;
  };
  selectionCounts: {
    red: number;
    yellow: number;
    green: number;
  };
  engagementCount: number;
};

export const getSlackOrgData = (data: Array<TouchPoint>, orgId: string) => {
  const orgDataItems = data.filter(
    (tp) => tp.SlackOrgId === orgId && tp.Selection
  );
  const slackUserIds = new Set<string>();
  const slackTeamIds = new Set<string>();
  const selectionCounts = {
    red: 0,
    yellow: 0,
    green: 0,
  };
  let engagementCount = 0;
  const emotionCounts = new Map<string, number>();
  const slackUserEngagement = new Map<string, number>();

  orgDataItems.forEach((tp) => {
    selectionCounts[tp.Selection] += 1;
    slackUserIds.add(tp.SlackUserId);
    slackTeamIds.add(tp.SlackTeamId);

    if (tp.Reactions) {
      engagementCount += tp.Reactions.length;
      tp.Reactions.forEach((reaction) => {
        slackUserEngagement.set(
          reaction.Id,
          (slackUserEngagement.get(reaction.Id) ?? 0) + 1
        );
      });
    }
    if (tp.Emotion) {
      emotionCounts.set(tp.Emotion, (emotionCounts.get(tp.Emotion) ?? 0) + 1);
    }
  });

  return {
    orgId,
    slackTeamIds: [...slackTeamIds],
    slackUserIds: [...slackUserIds],
    slackUserEngagement: Object.fromEntries(slackUserEngagement),
    emotionCounts: Object.fromEntries(emotionCounts),
    selectionCounts,
    engagementCount,
  };
};

export type TeamSummaryData = {
  teamId: string;
  slackUserIds: string[];
  slackUserEngagement: {
    [k: string]: number;
  };
  emotionCounts: {
    [k: string]: number;
  };
  selectionCounts: {
    red: number;
    yellow: number;
    green: number;
  };
  engagementCount: number;
};

export const getTeamData = (data: Array<TouchPoint>, teamId: string) => {
  const teamData = data.filter(
    (tp) => tp.SlackTeamId === teamId && tp.Selection
  );
  const slackUserIds = new Set<string>();
  const selectionCounts = {
    red: 0,
    yellow: 0,
    green: 0,
  };
  let engagementCount = 0;
  const emotionCounts = new Map<string, number>();
  const slackUserEngagement = new Map<string, number>();

  teamData.forEach((tp) => {
    selectionCounts[tp.Selection] += 1;
    slackUserIds.add(tp.SlackUserId);

    if (tp.Reactions) {
      engagementCount += tp.Reactions.length;
      tp.Reactions.forEach((reaction) => {
        slackUserEngagement.set(
          reaction.Id,
          (slackUserEngagement.get(reaction.Id) ?? 0) + 1
        );
      });
    }
    if (tp.Emotion) {
      emotionCounts.set(tp.Emotion, (emotionCounts.get(tp.Emotion) ?? 0) + 1);
    }
  });

  slackUserEngagement.forEach((value, key) => {
    if (!slackUserIds.has(key)) {
      slackUserEngagement.delete(key);
    }
  });

  return {
    teamId,
    slackUserIds: [...slackUserIds],
    slackUserEngagement: Object.fromEntries(slackUserEngagement),
    emotionCounts: Object.fromEntries(emotionCounts),
    selectionCounts,
    engagementCount,
  };
};
