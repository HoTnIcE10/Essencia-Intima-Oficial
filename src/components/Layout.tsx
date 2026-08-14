'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header style={{backgroundColor: '#7f1d1d', color: 'white', padding: '20px'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <Link href="/">
          <span style={{fontSize: '20px', fontWeight: 'bold'}}>Essencia Intima</span>
        </Link>
        <nav style={{marginTop: '10px', display: 'flex', gap: '20px'}}>
          <Link href="/">Home</Link>
          <Link href="/produtos">Produtos</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/carrinho">Carrinho</Link>
          <Link href="/conta">Conta</Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer style={{backgroundColor: '#1f2937', color: 'white', padding: '20px', marginTop: '40px'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
        <p>? 2026 Essencia Intima. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
