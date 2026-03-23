import { Goal } from "./interfaces";

export const isGoal = (obj: any): obj is Goal => {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    Array.isArray(obj.labels) &&
    Array.isArray(obj.checkList)
  );
}
