export interface Task {
  id: number
  name: string
  xp: number
  completed: boolean
  type: 'challenge' | 'boss' | 'side-quest'
  level: number
  resources?: { name: string; url: string }[]
}

export interface Achievement {
  id: number
  name: string
  description: string
  unlocked: boolean
  reward?: string
}

export interface Level {
  id: number
  name: string
  minXp: number
  maxXp: number
  mission: string
  challenges: Task[]
  bossFight?: Task
  reward?: string
}

export interface GameState {
  tasks: Task[]
  xp: number
  level: number
  achievements: Achievement[]
  currentLevel: Level
  completedChallenges: Set<number>
} 