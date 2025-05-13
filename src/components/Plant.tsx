import { Leaf } from 'lucide-react'

interface PlantProps {
  xp: number
}

export const Plant = ({ xp }: PlantProps) => {
  // Calculate plant size based on XP (max size at 1000 XP)
  const size = Math.min(100, Math.max(20, (xp / 1000) * 100))
  const leafCount = Math.min(5, Math.max(1, Math.floor(xp / 200)))
  
  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="relative" style={{ width: size, height: size * 1.5 }}>
        {/* Stem */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-green-600"
          style={{ 
            width: size * 0.1, 
            height: size * 0.8,
            borderRadius: '4px'
          }}
        />
        
        {/* Leaves */}
        {Array.from({ length: leafCount }).map((_, i) => {
          const angle = (i * (360 / leafCount)) - 90
          const distance = size * 0.4
          const x = Math.cos((angle * Math.PI) / 180) * distance
          const y = Math.sin((angle * Math.PI) / 180) * distance
          
          return (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                width: size * 0.4,
                height: size * 0.2
              }}
            >
              <Leaf className="w-full h-full text-green-500" />
            </div>
          )
        })}
        
        {/* Pot */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-amber-800"
          style={{ 
            width: size * 0.6, 
            height: size * 0.2,
            borderRadius: '8px 8px 0 0'
          }}
        />
      </div>
    </div>
  )
} 