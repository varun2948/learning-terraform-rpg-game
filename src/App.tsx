import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Sword, Zap, Star, Check, ExternalLink, Trash2, Crown, Target, Plus, Gift } from 'lucide-react'
import { LEVELS } from './constants/levels'
import { ACHIEVEMENTS } from './constants/achievements'
import { Task, Achievement, Level, GameState } from './constants/types'
import { Plant } from './components/Plant'

const STORAGE_KEY = 'terraform-rpg-state'

const loadInitialState = (): GameState => {
  const savedState = localStorage.getItem(STORAGE_KEY)
  if (savedState) {
    try {
      const parsedState = JSON.parse(savedState) as GameState
      const savedLevel = LEVELS.find(l => l.id === parsedState.level) || LEVELS[0]
      
      // Create a Set of completed challenge IDs
      const completedChallenges = new Set(parsedState.completedChallenges || [])
      
      // Update the current level's challenges with completion state
      const currentLevel = {
        ...savedLevel,
        challenges: savedLevel.challenges.map(challenge => ({
          ...challenge,
          completed: completedChallenges.has(challenge.id)
        })),
        bossFight: savedLevel.bossFight ? {
          ...savedLevel.bossFight,
          completed: completedChallenges.has(savedLevel.bossFight.id)
        } : undefined
      }

      return {
        ...parsedState,
        currentLevel,
        completedChallenges
      }
    } catch (error) {
      console.error('Failed to load saved state:', error)
    }
  }
  return {
    tasks: [],
    xp: 0,
    level: 1,
    achievements: ACHIEVEMENTS,
    currentLevel: LEVELS[0],
    completedChallenges: new Set()
  }
}

export default function App() {
  const initialState = loadInitialState()
  const [tasks, setTasks] = useState<Task[]>(initialState.tasks)
  const [newTask, setNewTask] = useState('')
  const [xp, setXp] = useState(initialState.xp)
  const [level, setLevel] = useState(initialState.level)
  const [achievements, setAchievements] = useState<Achievement[]>(initialState.achievements)
  const [currentLevel, setCurrentLevel] = useState<Level>(initialState.currentLevel)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(initialState.completedChallenges)
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null)

  // Update currentLevel when level changes
  useEffect(() => {
    const newLevel = LEVELS.find(l => l.id === level) || LEVELS[0]
    // Update challenges completion state when level changes
    const updatedLevel = {
      ...newLevel,
      challenges: newLevel.challenges.map(challenge => ({
        ...challenge,
        completed: completedChallenges.has(challenge.id)
      })),
      bossFight: newLevel.bossFight ? {
        ...newLevel.bossFight,
        completed: completedChallenges.has(newLevel.bossFight.id)
      } : undefined
    }
    setCurrentLevel(updatedLevel)
  }, [level, completedChallenges])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const gameState: GameState = {
      tasks,
      xp,
      level,
      achievements,
      currentLevel,
      completedChallenges
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...gameState,
      completedChallenges: Array.from(completedChallenges) // Convert Set to Array for storage
    }))
  }, [tasks, xp, level, achievements, currentLevel, completedChallenges])

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now(),
        name: newTask,
        xp: 100,
        completed: false,
        type: 'challenge',
        level: currentLevel.id
      }
      setTasks(prevTasks => [...prevTasks, task])
      setNewTask('')
    }
  }

  const completeTask = (taskId: number) => {
    // First check if it's a level challenge or boss fight
    const levelTask = currentLevel.challenges.find(t => t.id === taskId) || 
                     (currentLevel.bossFight?.id === taskId ? currentLevel.bossFight : null)
    
    if (levelTask) {
      // Add to completed challenges set
      setCompletedChallenges(prev => new Set([...prev, taskId]))
      
      // Update the level's tasks
      const updatedLevel = {
        ...currentLevel,
        challenges: currentLevel.challenges.map(t => 
          t.id === taskId ? { ...t, completed: true } : t
        ),
        bossFight: currentLevel.bossFight?.id === taskId 
          ? { ...currentLevel.bossFight, completed: true }
          : currentLevel.bossFight
      }
      setCurrentLevel(updatedLevel)
    }

    // Update custom tasks
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    )
    setTasks(updatedTasks)

    // Find the task that was completed
    const completedTask = levelTask || tasks.find(t => t.id === taskId)
    if (completedTask && !completedTask.completed) {
      const newXp = xp + completedTask.xp
      setXp(newXp)
      
      // Level up every 100 XP
      const newLevel = Math.floor(newXp / 100) + 1
      if (newLevel > level) {
        setLevel(newLevel)
      }

      // Check achievements
      const allTasks = [...tasks, ...currentLevel.challenges]
      if (currentLevel.bossFight) {
        allTasks.push(currentLevel.bossFight)
      }
      const completedTasks = allTasks.filter(t => t.completed).length
      const completedBosses = allTasks.filter(t => t.completed && t.type === 'boss').length
      
      const updatedAchievements = achievements.map(achievement => {
        if (!achievement.unlocked) {
          if (achievement.id === 1 && completedTasks === 1) {
            return { ...achievement, unlocked: true }
          }
          if (achievement.id === 2 && newLevel >= 5) {
            return { ...achievement, unlocked: true }
          }
          if (achievement.id === 3 && completedTasks >= 10) {
            return { ...achievement, unlocked: true }
          }
          if (achievement.id === 4 && completedBosses >= 1) {
            return { ...achievement, unlocked: true }
          }
        }
        return achievement
      })
      setAchievements(updatedAchievements)
    }
  }

  const deleteTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      if (task.completed) {
        const newXp = Math.max(0, xp - task.xp)
        setXp(newXp)
        
        const newLevel = Math.floor(newXp / 100) + 1
        if (newLevel !== level) {
          setLevel(newLevel)
        }

        const updatedTasks = tasks.filter(t => t.id !== taskId)
        const completedTasks = updatedTasks.filter(t => t.completed).length
        const completedBosses = updatedTasks.filter(t => t.completed && t.type === 'boss').length
        
        const updatedAchievements = achievements.map(achievement => {
          if (achievement.unlocked) {
            if (achievement.id === 1 && completedTasks === 0) {
              return { ...achievement, unlocked: false }
            }
            if (achievement.id === 3 && completedTasks < 10) {
              return { ...achievement, unlocked: false }
            }
            if (achievement.id === 4 && completedBosses === 0) {
              return { ...achievement, unlocked: false }
            }
          }
          return achievement
        })
        setAchievements(updatedAchievements)
      }
      
      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId))
    }
    setTaskToDelete(null)
  }

  const progressToNextLevel = (xp % 100)

  const isEverythingCompleted = () => {
    // Check if all level challenges and boss fights are completed
    const allLevelsCompleted = LEVELS.every(level => {
      const challengesCompleted = level.challenges.every(c => c.completed)
      const bossCompleted = !level.bossFight || level.bossFight.completed
      return challengesCompleted && bossCompleted
    })

    // Check if all achievements are unlocked
    const allAchievementsUnlocked = achievements.every(a => a.unlocked)

    return allLevelsCompleted && allAchievementsUnlocked
  }

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all progress? This cannot be undone!')) {
      localStorage.removeItem(STORAGE_KEY)
      window.location.reload()
    }
  }

  const isCurrentLevelCompleted = () => {
    const currentLevelChallenges = currentLevel.challenges
    const currentLevelBoss = currentLevel.bossFight
    
    const allChallengesCompleted = currentLevelChallenges.every(c => c.completed)
    const bossCompleted = !currentLevelBoss || currentLevelBoss.completed
    
    return allChallengesCompleted && bossCompleted
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Terraform RPG</h1>
        <h2 className="text-2xl text-primary">The Rise of the Cloud Commander</h2>
        {isEverythingCompleted() && (
          <div className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h3 className="text-xl font-bold text-green-500 flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6" />
              Congratulations! You've completed all challenges!
            </h3>
            <p className="text-green-500/80 mt-2">
              You are now a true Cloud Commander! 🎉
            </p>
          </div>
        )}
        <Button
          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          onClick={clearAllData}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All Progress
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player Stats Card */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="h-6 w-6 text-yellow-500" />
                  <span>Level {level}: {currentLevel.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="text-lg font-bold">{xp} XP</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Current Mission: {currentLevel.mission}
                </h3>
                <div className="relative">
                  <Progress value={progressToNextLevel} className="h-3" />
                  <div className="absolute right-0 top-0 text-sm text-muted-foreground">
                    {100 - (xp % 100)} XP to next level
                  </div>
                </div>
              </div>
              {currentLevel.reward && (
                <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                  <h4 className="font-medium flex items-center text-primary">
                    <Crown className="h-5 w-5 mr-2" />
                    Level Reward: {currentLevel.reward}
                  </h4>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Current Level Challenges */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" />
                  Current Level Challenges
                </div>
                {isCurrentLevelCompleted() && (
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="h-5 w-5" />
                    <span className="text-sm font-medium">Level Completed!</span>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentLevel.challenges.map(challenge => (
                  <div
                    key={challenge.id}
                    className={`flex flex-col p-4 rounded-lg transition-all duration-200 ${
                      challenge.completed 
                        ? 'bg-muted/50 border border-muted-foreground/20' 
                        : 'bg-background border border-primary/20 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          challenge.completed ? 'bg-primary/20' : 'bg-primary/10'
                        }`}>
                          {challenge.completed ? (
                            <Check className="h-5 w-5 text-primary" />
                          ) : (
                            <Target className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <span className={`font-medium ${challenge.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {challenge.name}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="h-4 w-4" />
                            <span>+{challenge.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      {!challenge.completed && (
                        <Button
                          onClick={() => completeTask(challenge.id)}
                          className="bg-primary hover:bg-primary/90"
                          disabled={isCurrentLevelCompleted()}
                        >
                          Complete Challenge
                        </Button>
                      )}
                    </div>
                    {challenge.resources && (
                      <div className="mt-2 pl-11">
                        <div className="text-sm text-muted-foreground mb-1">Resources:</div>
                        <div className="flex flex-wrap gap-2">
                          {challenge.resources.map((resource, index) => (
                            <a
                              key={index}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              {resource.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Boss Fight Section */}
              {currentLevel.bossFight && (
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg" />
                    <div className="relative p-6 rounded-lg border-2 border-red-500/20">
                      <div className="flex items-center gap-3 mb-4">
                        <Sword className="h-6 w-6 text-red-500" />
                        <h3 className="text-xl font-bold text-red-500">Boss Fight</h3>
                        {currentLevel.bossFight.completed && (
                          <div className="flex items-center gap-2 text-green-500">
                            <Check className="h-5 w-5" />
                            <span className="text-sm font-medium">Completed!</span>
                          </div>
                        )}
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">{currentLevel.bossFight.name}</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Complete this epic challenge to prove your mastery and earn bonus XP!
                        </p>
                        <div className="flex items-center gap-2 text-red-500">
                          <Zap className="h-5 w-5" />
                          <span className="font-bold">+{currentLevel.bossFight.xp} XP</span>
                        </div>
                        {currentLevel.bossFight.resources && (
                          <div className="mt-4">
                            <div className="text-sm text-muted-foreground mb-1">Resources:</div>
                            <div className="flex flex-wrap gap-2">
                              {currentLevel.bossFight.resources.map((resource, index) => (
                                <a
                                  key={index}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {resource.name}
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => completeTask(currentLevel.bossFight!.id)}
                        className={`${
                          currentLevel.bossFight.completed
                            ? 'bg-muted text-muted-foreground cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                        }`}
                        disabled={currentLevel.bossFight.completed || !currentLevel.challenges.every(c => c.completed)}
                      >
                        <Sword className="h-5 w-5 mr-2" />
                        {currentLevel.bossFight.completed 
                          ? 'Completed' 
                          : currentLevel.challenges.every(c => c.completed)
                            ? 'Start Boss Fight'
                            : 'Complete All Challenges First'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Side Content - 1 column */}
        <div className="space-y-6">
          {/* Custom Tasks */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-primary" />
                Custom Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isEverythingCompleted() ? (
                <>
                  <div className="flex gap-2 mb-6">
                    <Input
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      placeholder="Enter a new Terraform task..."
                      onKeyPress={(e) => e.key === 'Enter' && addTask()}
                      className="flex-1"
                    />
                    <Button onClick={addTask} className="bg-primary hover:bg-primary/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Task
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {tasks.map(task => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                          task.completed 
                            ? 'bg-muted/50 border border-muted-foreground/20' 
                            : 'bg-background border border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            task.completed ? 'bg-primary/20' : 'bg-primary/10'
                          }`}>
                            {task.completed ? (
                              <Check className="h-5 w-5 text-primary" />
                            ) : (
                              <Star className="h-5 w-5 text-primary" />
                            )}
                          </div>
                          <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                            {task.name}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {!task.completed && (
                            <Button
                              onClick={() => completeTask(task.id)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              <Zap className="h-4 w-4 mr-2" />
                              Complete (+{task.xp} XP)
                            </Button>
                          )}
                          <Button
                            className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 p-0"
                            onClick={() => setTaskToDelete(task.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    {tasks.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No custom tasks yet. Add your first Terraform task!</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    All challenges completed! No more tasks needed.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map(achievement => (
                  <div
                    key={achievement.id}
                    className={`flex items-center p-4 rounded-lg transition-all duration-200 ${
                      achievement.unlocked 
                        ? 'bg-primary/10 border border-primary/20' 
                        : 'bg-muted/50 border border-muted-foreground/20'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <Trophy className="h-5 w-5 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {achievement.description}
                      </p>
                      {achievement.reward && achievement.unlocked && (
                        <div className="mt-2 flex items-center gap-2 text-primary">
                          <Gift className="h-4 w-4" />
                          <span className="text-sm font-medium">Reward: {achievement.reward}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Plant */}
      <Plant xp={xp} />

      {/* Delete Confirmation Dialog */}
      {taskToDelete !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Delete Task</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Are you sure you want to delete this task? This action cannot be undone.</p>
              <div className="flex justify-end gap-2">
                <Button
                  className="border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setTaskToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => deleteTask(taskToDelete)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}