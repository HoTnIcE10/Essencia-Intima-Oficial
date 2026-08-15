'use client'

interface FeatureProps {
  icon?: string
  title: string
  description: string
  index: number
}

export function FeatureCard({ icon, title, description, index }: FeatureProps) {
  const delayMs = index * 100

  return (
    <div
      className="text-center p-7 rounded-2xl animate-fade-in-up"
      style={{
        backgroundColor: '#f8f1d8',
        border: '1px solid rgba(212, 175, 55, 0.5)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.04)',
        animationDelay: `${delayMs}ms`,
        transition: 'all 0.3s ease',
      }}
    >
      {icon ? (
        <div
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-semibold"
          style={{ backgroundColor: '#000000', color: '#f4e4a6' }}
        >
          {icon}
        </div>
      ) : null}
      <h3 className="text-xl font-semibold mb-2" style={{ color: '#000000' }}>
        {title}
      </h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  )
}
