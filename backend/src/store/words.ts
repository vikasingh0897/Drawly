export const wordList = [
  'apple',
  'bicycle',
  'castle',
  'dragon',
  'elephant',
  'fire',
  'ghost',
  'helicopter',
  'igloo',
  'jellyfish',
  'kite',
  'lighthouse',
  'mountain',
  'ninja',
  'octopus',
  'penguin',
  'queen',
  'rainbow',
  'snowman',
  'tornado',
  'umbrella',
  'vampire',
  'watermelon',
  'xylophone',
  'yacht',
  'zebra',
  'alien',
  'balloon',
  'cactus',
  'diamond',
  'eagle',
  'flower',
  'glasses',
  'hammer',
  'island',
  'jungle',
  'kangaroo',
  'ladder',
  'magnet',
  'necklace',
  'ocean',
  'pizza',
  'robot',
  'spider',
  'telescope',
  'unicorn',
  'volcano',
  'windmill',
  'bridge',
  'clock',
];

// Helper function for random words -->
export const getRandomWords = (count = 3): string[] => {
  const result: string[] = [];
  const length: number = wordList.length;

  for (let i = 0; i < count; i++) {
    const randomIndex = i + Math.floor(Math.random() * (length - i));
    result.push(wordList[randomIndex]);
  }

  return result;
};
