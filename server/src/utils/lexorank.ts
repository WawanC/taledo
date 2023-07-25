import { LexoRank } from "lexorank";
import LexoRankBucket from "lexorank/lib/lexoRank/lexoRankBucket";

export const generateLexorank = (todos: any[], targetRank: string, order: number) => {
  let rank = undefined;
  if (order === 1) {
    rank = LexoRank.parse(todos[0].rank).genPrev();
  } else if (order === todos.length) {
    rank = LexoRank.parse(todos[todos.length - 1].rank).genNext();
  } else if (targetRank > todos[order - 1].rank) {
    // Todo below target
    const rankTarget = LexoRank.parse(todos[order - 1].rank);
    const rankBefore = LexoRank.parse(todos[order - 2].rank);
    rank = LexoRank.from(
      LexoRankBucket.BUCKET_0,
      LexoRank.between(rankBefore.getDecimal(), rankTarget.getDecimal())
    );
  } else if (targetRank < todos[order - 1].rank) {
    // Todo above target
    const rankTarget = LexoRank.parse(todos[order - 1].rank);
    const rankAfter = LexoRank.parse(todos[order].rank);
    rank = LexoRank.from(
      LexoRankBucket.BUCKET_0,
      LexoRank.between(rankTarget.getDecimal(), rankAfter.getDecimal())
    );
  }
  return rank;
};
