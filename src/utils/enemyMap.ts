// Create a matrix of random enemies
// Should refactor i know
export function createEnemyMap(): number[][] {
  return Array(6)
    .fill(null)
    .map(() =>
      Array.from({ length: 9 }, () => Math.floor(Math.random() * 3 + 1)),
    );
}
