export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 6; // Minimum 6 characters
}

export function calculateLevel(xp: number): number {
  return Math.floor(xp / 1000) + 1;
}

export function getXPForNextLevel(currentLevel: number): number {
  return (currentLevel + 1) * 1000;
}

export function getCurrentLevelName(level: number): string {
  const levels = [
    'Rookie',       // 1
    'Novice',       // 2
    'Apprentice',   // 3
    'Journeyman',   // 4
    'Expert',       // 5
    'Master',       // 6
    'Grandmaster',  // 7
    'Legend'        // 8+
  ];
  return levels[Math.min(level - 1, levels.length - 1)];
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    EASY: 'green',
    MEDIUM: 'yellow',
    HARD: 'red',
  };
  return colors[difficulty] || 'gray';
}
