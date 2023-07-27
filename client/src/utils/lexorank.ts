import { LexoRank } from "lexorank";

const sortByRank = (tasks: any[]) => {
  return tasks.sort((a, b) => {
    if (a.rank < b.rank) return -1;
    if (a.rank > b.rank) return 1;
    return 0;
  });
};

export const moveRank = (items: any[], idx: number) => {
  const sortedRank = sortByRank(items);
  if (idx === 0) {
    return LexoRank.parse(sortedRank[0].rank).genPrev().toString();
  } else {
    const rankBefore = LexoRank.parse(sortedRank[idx - 1].rank);
    const rankAfter = LexoRank.parse(sortedRank[idx].rank);
    return rankBefore.between(rankAfter).toString();
  }
};

export const transferRank = (items: any[], idx: number) => {
  if (idx === 0) return LexoRank.parse(items[0].rank).genPrev().toString();
  const rankBefore = LexoRank.parse(items[idx - 1].rank);
  const rankAfter = LexoRank.parse(items[idx].rank);
  return rankBefore.between(rankAfter).toString();
};

export const genNewRank = (items: any[]) => {
  const sortedRank = sortByRank(items);
  if (sortedRank.length === 0) {
    return LexoRank.min().genNext().toString();
  }
  const prevRank = sortedRank[sortedRank.length - 1].rank;
  return LexoRank.parse(prevRank).genNext().toString();
};
