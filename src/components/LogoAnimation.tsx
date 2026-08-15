'use client'

export function LogoAnimation() {
  return (
    <div className="flex items-center justify-center my-12 animate-fade-in-up">
      <div className="relative w-48 h-48">
        <img 
          src="/logos/1.png" 
          alt="Essencia Intima Logo" 
          className="w-full h-full object-contain animate-glow" 
          style={{
            filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.3))'
          }}
        />
      </div>
    </div>
  )
}
