'use client'

interface FeatureProps {
  icon: string
  title: string
  description: string
  index: number
}

export function FeatureCard({ icon, title, description, index }: FeatureProps) {
  const delayMs = index * 100
  
  return (
    <div 
      className="text-center p-6 rounded-lg animate-fade-in-up hover-lift" 
      style={{ 
        backgroundColor: "#f4e4a6", 
        border: "2px solid #d4af37",
        animationDelay: `${delayMs}ms`
      }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2" style={{ color: "#000000" }}>
        {title}
      </h3>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
