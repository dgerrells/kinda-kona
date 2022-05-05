import csvToJson from "csvtojson";
import { RawCSV } from "./rygs";

export type TouchPoint = {
  Id: string;
  Timestamp: number;
  Elaboration: string | null;
  Emotion: string | null;
  MeetingHours: number | null;
  Platform: string;
  PrivateElaboration: string | null;
  Reactions: Array<{
    Id: string;
    emoji: string;
  }> | null;
  Selection: "yellow" | "red" | "green";
  SlackMessageId: string;
  SlackOrgId: string;
  SlackTeamId: string;
  SlackUserId: string;
};

let cachedData: Array<TouchPoint> = [];

export const getSlackData = async () => {
  if (cachedData.length === 0) {
    cachedData = (
      await csvToJson({
        checkType: true,
        nullObject: true,
      }).fromString(RawCSV)
    ).map((row) => ({
      ...row,
      Reactions: row.Reactions
        ? Object.keys(row.Reactions).map((key) => ({
            Id: key,
            emoji: row.Reactions[key].S,
          }))
        : [],
    }));
  }
  return cachedData;
};
