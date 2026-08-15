'use client'

import Link from 'next/link'

export function Header() {
  return (
    <header style={{backgroundColor: '#000000', color: 'white', padding: '15px 20px', borderBottom: '4px solid #d4af37', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Link href="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <span style={{fontFamily: 'var(--font-modern)', fontSize: '13px', fontWeight: '700', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#f4e4a6', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'}}>Essência Intima</span>
        </Link>
        <nav style={{display: 'flex', gap: '30px', alignItems: 'center'}}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/produtos">Produtos</NavLink>
          <NavLink href="/sobre">Sobre</NavLink>
          <NavLink href="/carrinho">🛍️ Carrinho</NavLink>
          <NavLink href="/conta">Conta</NavLink>
        </nav>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} style={{
      color: 'white',
      textDecoration: 'none',
      paddingBottom: '4px',
      borderBottom: '2px solid transparent',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500'
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#d4af37';
      (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
      (e.currentTarget as HTMLAnchorElement).style.color = 'white';
    }}
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000000',
      color: 'white',
      padding: '50px 20px 30px',
      marginTop: '60px',
      borderTop: '4px solid #d4af37',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px'}}>
          <div>
            <h3 style={{color: '#f4e4a6', marginBottom: '15px', fontSize: '16px', fontWeight: 'bold'}}>Sobre</h3>
            <ul style={{listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.8'}}>
              <li><a href="/sobre" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Quem Somos</a></li>
              <li><a href="/sobre" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Nossa Missão</a></li>
              <li><a href="/sobre" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{color: '#f4e4a6', marginBottom: '15px', fontSize: '16px', fontWeight: 'bold'}}>Compra</h3>
            <ul style={{listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.8'}}>
              <li><a href="/produtos" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Produtos</a></li>
              <li><a href="#" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Ofertas</a></li>
              <li><a href="#" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Frete</a></li>
            </ul>
          </div>
          <div>
            <h3 style={{color: '#f4e4a6', marginBottom: '15px', fontSize: '16px', fontWeight: 'bold'}}>Suporte</h3>
            <ul style={{listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '1.8'}}>
              <li><a href="#" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>FAQ</a></li>
              <li><a href="#" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Dúvidas</a></li>
              <li><a href="#" style={{color: 'white', textDecoration: 'none', transition: 'color 0.3s'}} onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = '#f4e4a6'} onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}>Termos</a></li>
            </ul>
          </div>
        </div>
        <div style={{borderTop: '1px solid #d4af37', paddingTop: '20px', textAlign: 'center'}}>
          <p>✨ 2026 Essencia Intima. Todos os direitos reservados. ✨</p>
          <p style={{color: '#f4e4a6', marginTop: '10px', fontSize: '13px', fontStyle: 'italic'}}>Discrição, qualidade e conforto</p>
        </div>
      </div>
    </footer>
  )
}
