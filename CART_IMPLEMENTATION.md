# 🛒 PRÓXIMO PASSO: CARRINHO PERSISTENTE NO SUPABASE

## 📌 O que fazer agora

Implementar um carrinho que:
1. Salva itens no Supabase (tabela `cart_items`)
2. Persiste entre recargas de página
3. Permite aumentar/diminuir quantidade
4. Mostra total real
5. Usa para checkout

---

## 🔧 Arquivos a criar/atualizar

### 1️⃣ Criar: `src/utils/supabase/cart.ts` (Funções auxiliares)

```typescript
import { createClient } from '@/src/utils/supabase/browser';

export async function getCartItems() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];

  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      id,
      product_id,
      quantity,
      products(name, price, image_url)
    `)
    .eq('user_id', user.id);

  if (error) return [];
  return data || [];
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Você precisa estar logado');

  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: productId,
      quantity,
    });

  if (error) throw error;
}

export async function removeFromCart(cartItemId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', cartItemId);

  if (error) throw error;
}

export async function updateCartQuantity(cartItemId: string, quantity: number) {
  const supabase = createClient();

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', cartItemId);

  if (error) throw error;
}

export async function clearCart() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return;

  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', user.id);

  if (error) throw error;
}
```

---

### 2️⃣ Atualizar: `src/components/ProductCard.tsx`

Adicionar botão "Adicionar ao Carrinho" que:
- Abre modal/alerta para confirmar quantidade
- Chama `addToCart()` 
- Mostra mensagem de sucesso

```typescript
'use client';

import { useState } from 'react';
import { addToCart } from '@/src/utils/supabase/cart';

export function ProductCard({ product }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleAddToCart() {
    setIsLoading(true);
    setMessage('');
    try {
      await addToCart(product.id, 1);
      setMessage('✅ Adicionado ao carrinho!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage(error.message || 'Erro ao adicionar');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-lg overflow-hidden shadow-sm bg-white" style={{ border: '1px solid rgba(212, 175, 55, 0.3)' }}>
      {/* Imagem do produto */}
      <div className="h-40 bg-gray-100 flex items-center justify-center" style={{ backgroundColor: '#f8f1d8' }}>
        <span className="text-2xl font-bold" style={{ color: '#8b6b2e' }}>
          {product.image || product.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      {/* Detalhes */}
      <div className="p-4">
        <h3 className="font-bold text-sm" style={{ color: '#000000' }}>
          {product.name}
        </h3>
        <p className="text-xs text-gray-600 mb-3">
          {product.description || 'Produto premium'}
        </p>

        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-lg font-bold" style={{ color: '#8b6b2e' }}>
              R$ {product.price?.toFixed(2)}
            </span>
            {product.compare_at_price && (
              <span className="text-xs text-gray-500 line-through ml-2">
                R$ {product.compare_at_price?.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={isLoading}
          className="w-full py-2 rounded-full font-semibold text-sm transition"
          style={{
            backgroundColor: '#000000',
            color: '#ffffff',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
        </button>

        {message && (
          <p className="text-xs text-center mt-2" style={{ color: message.includes('✅') ? '#16a34a' : '#dc2626' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
```

---

### 3️⃣ Atualizar: `app/carrinho/page.tsx`

Reescrever para carregar items do Supabase:

```typescript
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckoutButton } from '@/src/components/CheckoutButton';
import { getCartItems, removeFromCart, updateCartQuantity, clearCart } from '@/src/utils/supabase/cart';
import { createClient } from '@/src/utils/supabase/browser';

export default function Carrinho() {
  const supabase = createClient();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loadCart() {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);

      if (user) {
        const cartItems = await getCartItems();
        setItems(cartItems);
      }
      setLoading(false);
    }

    loadCart();
  }, []);

  async function handleRemove(cartItemId: string) {
    await removeFromCart(cartItemId);
    setItems(items.filter(item => item.id !== cartItemId));
  }

  async function handleUpdateQuantity(cartItemId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      handleRemove(cartItemId);
      return;
    }

    await updateCartQuantity(cartItemId, newQuantity);
    setItems(items.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  }

  const subtotal = items.reduce((sum: number, item: any) => sum + (item.products?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 20 : 0;
  const total = subtotal + shipping;

  if (!isLoggedIn) {
    return (
      <div className="w-full px-4 py-20 text-center" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <h1 className="text-3xl font-bold mb-6" style={{ color: '#000000' }}>
          Seu Carrinho
        </h1>
        <p className="text-lg mb-6" style={{ color: '#666666' }}>
          Você precisa estar logado para ver seu carrinho.
        </p>
        <Link
          href="/conta"
          className="inline-block px-8 py-3 rounded-full font-semibold"
          style={{ backgroundColor: '#000000', color: '#ffffff' }}
        >
          Fazer Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-full px-4 py-20 text-center" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
        <p style={{ color: '#000000' }}>Carregando carrinho...</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10" style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8" style={{ color: '#000000' }}>
          Seu Carrinho
        </h1>

        {items.length === 0 ? (
          <div className="rounded-lg p-8 text-center" style={{ border: '1px dashed #d4af37', backgroundColor: '#f9f4e8' }}>
            <p style={{ color: '#000000' }} className="mb-6">
              Seu carrinho está vazio. Explore nossas essências premium!
            </p>
            <Link
              href="/produtos"
              className="inline-block px-6 py-3 rounded-full font-semibold"
              style={{ backgroundColor: '#000000', color: '#ffffff' }}
            >
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Itens do carrinho */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid rgba(212, 175, 55, 0.3)', backgroundColor: '#f9f4e8' }}
                >
                  <div className="flex-1">
                    <h3 className="font-bold" style={{ color: '#000000' }}>
                      {item.products?.name}
                    </h3>
                    <p style={{ color: '#8b6b2e' }} className="font-semibold">
                      R$ {item.products?.price?.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                      style={{ borderColor: '#d4af37' }}
                    >
                      -
                    </button>
                    <span className="px-4" style={{ color: '#000000' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                      style={{ borderColor: '#d4af37' }}
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p style={{ color: '#000000' }} className="font-semibold mb-2">
                      R$ {((item.products?.price || 0) * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumo */}
            <div className="rounded-lg p-6" style={{ border: '1px solid rgba(212, 175, 55, 0.3)', backgroundColor: '#f9f4e8' }}>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                Resumo do Pedido
              </h2>

              <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid #d4af37' }}>
                <div className="flex justify-between" style={{ color: '#000000' }}>
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ color: '#000000' }}>
                  <span>Frete</span>
                  <span>R$ {shipping.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6" style={{ color: '#8b6b2e' }}>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>

              <CheckoutButton
                items={items.map((item: any) => ({
                  id: item.product_id,
                  name: item.products?.name,
                  price: item.products?.price,
                  quantity: item.quantity,
                }))}
              />

              <button
                onClick={clearCart}
                className="w-full mt-4 py-2 text-sm rounded-full"
                style={{ backgroundColor: 'transparent', color: '#000000', border: '1px solid #000000' }}
              >
                Limpar Carrinho
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## 🚀 Como implementar

1. **Criar** o arquivo `src/utils/supabase/cart.ts` com as funções
2. **Atualizar** `src/components/ProductCard.tsx` com botão de carrinho
3. **Atualizar** `app/carrinho/page.tsx` para carregar itens

Depois:
```bash
npm run build  # Verificar se tudo compila
npm run dev    # Testar localmente
```

---

## ✅ O que testar

1. Ir em `/produtos`
2. Clicar "Adicionar ao Carrinho" em um produto
3. Ir em `/carrinho` e ver item lá
4. Aumentar/diminuir quantidade
5. Remover item
6. Recarregar página (item deve persistir)
7. Depois: clicar em "Ir para Pagamento" para testar Stripe

---

## 📍 Quando terminar

Avise e vamos para o próximo passo: **Salvar order após pagamento no Supabase** ✅
