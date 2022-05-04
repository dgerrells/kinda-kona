import { TouchPoint } from "../data/SlackDataCSV";

export const getSlackOrgIds = (data: Array<TouchPoint>) => {
  const ids = new Set<string>();
  data.forEach((touchPoint) => {
    ids.add(touchPoint.SlackOrgId);
  });

  return [...ids];
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

  orgDataItems.forEach((tp) => {
    selectionCounts[tp.Selection] += 1;
    slackUserIds.add(tp.SlackUserId);
    slackTeamIds.add(tp.SlackTeamId);

    if (tp.Reactions) {
      engagementCount += tp.Reactions.length;
    }
    if (tp.Emotion) {
      emotionCounts.set(tp.Emotion, (emotionCounts.get(tp.Emotion) ?? 0) + 1);
    }
  });

  return {
    slackTeamIds: [...slackTeamIds],
    slackUserIds: [...slackUserIds],
    emotionCounts: Object.fromEntries(emotionCounts),
    selectionCounts,
    engagementCount,
  };
};
