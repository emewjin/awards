export default function shuffleRandomly(unshuffled) {
  const shuffled = unshuffled
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

  return shuffled;
}
