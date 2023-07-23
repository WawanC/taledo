import { LexoRank } from "lexorank";

export const moveRank = (items: any[], targetRank: string, order: number) => {
  console.log("order:", order);
  if (order === items.length - 1) {
    // In behind
    return LexoRank.parse(items[items.length - 1].rank)
      .genNext()
      .toString();
  } else if (targetRank > items[order].rank) {
    // Todo below target
    const rankTarget = LexoRank.parse(items[order].rank);
    const rankBefore = LexoRank.parse(items[order - 1].rank);
    return rankBefore.between(rankTarget).toString();
  } else if (targetRank < items[order].rank) {
    // Todo above target
    const rankTarget = LexoRank.parse(items[order].rank);
    const rankAfter = LexoRank.parse(items[order + 1].rank);
    return rankTarget.between(rankAfter).toString();
  }
  return targetRank;
};

export const transferRank = (items: any[], idx: number) => {
  if (idx === 0) return LexoRank.parse(items[0].rank).genPrev().toString();
  const rankBefore = LexoRank.parse(items[idx - 1].rank);
  const rankAfter = LexoRank.parse(items[idx].rank);
  return rankBefore.between(rankAfter).toString();
};

export const genNewRank = (items: any[]) => {
  if (items.length === 0) {
    return LexoRank.min().genNext().toString();
  }
  const prevRank = items[items.length - 1].rank;
  return LexoRank.parse(prevRank).genNext().toString();
};
