'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header style={{backgroundColor: '#7f1d1d', color: 'white', padding: '20px', borderBottom: '4px solid #d4af37'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <Link href="/">
          <span style={{fontSize: '20px', fontWeight: 'bold', color: '#f4e4a6'}}>✨ Essencia Intima</span>
        </Link>
        <nav style={{marginTop: '10px', display: 'flex', gap: '20px'}}>
          <Link href="/" style={{transition: 'color 0.3s', borderBottom: '2px solid transparent', paddingBottom: '4px'}}>Home</Link>
          <Link href="/produtos" style={{transition: 'color 0.3s', borderBottom: '2px solid transparent', paddingBottom: '4px'}}>Produtos</Link>
          <Link href="/sobre" style={{transition: 'color 0.3s', borderBottom: '2px solid transparent', paddingBottom: '4px'}}>Sobre</Link>
          <Link href="/carrinho" style={{transition: 'color 0.3s', borderBottom: '2px solid transparent', paddingBottom: '4px'}}>Carrinho</Link>
          <Link href="/conta" style={{transition: 'color 0.3s', borderBottom: '2px solid transparent', paddingBottom: '4px'}}>Conta</Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer style={{backgroundColor: '#7f1d1d', color: 'white', padding: '40px 20px', marginTop: '40px', borderTop: '4px solid #d4af37'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto', textAlign: 'center'}}>
        <p>✨ 2026 Essencia Intima. Todos os direitos reservados. ✨</p>
        <p style={{color: '#f4e4a6', marginTop: '10px', fontSize: '14px'}}>Discrição, qualidade e conforto</p>
      </div>
    </footer>
  )
}
