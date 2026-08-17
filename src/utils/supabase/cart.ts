import { createClient } from '@/src/utils/supabase/browser';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products?: {
    name: string;
    price: number;
    image_url?: string;
  };
}

export async function getCartItems(): Promise<CartItem[]> {
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

  if (error) {
    console.error('Error fetching cart:', error);
    return [];
  }
  
  return data || [];
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error('Você precisa estar logado para adicionar ao carrinho');

  const { error } = await supabase
    .from('cart_items')
    .upsert({
      user_id: user.id,
      product_id: productId,
      quantity,
    }, {
      onConflict: 'user_id,product_id'
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

  if (quantity <= 0) {
    return removeFromCart(cartItemId);
  }

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

export async function getCartTotal() {
  const items = await getCartItems();
  return items.reduce((sum: number, item: CartItem) => 
    sum + ((item.products?.price || 0) * item.quantity), 0
  );
}
