/**
 * Gamification & Achievement Badge Types
 */

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  requiredCount: number;
}

export interface UserAchievement {
  userId: string;
  achievementId: string;
  unlockedAt: string;
  achievement?: Achievement;
}
