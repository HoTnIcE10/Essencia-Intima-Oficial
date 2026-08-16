create extension if not exists pgcrypto;

-- =========================================================
-- 1. CATEGORIAS
-- =========================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- 2. PRODUTOS
-- =========================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(10,2) not null check (price >= 0),
  compare_at_price numeric(10,2),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- 3. IMAGENS DOS PRODUTOS
-- =========================================================
create table if not exists public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  is_main boolean not null default false,
  created_at timestamptz default now()
);

-- =========================================================
-- 4. PERFIL DO USUÁRIO
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text,
  phone text,
  birth_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- 5. ENDEREÇOS
-- =========================================================
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  cep text,
  street text,
  number text,
  complement text,
  neighborhood text,
  city text,
  state text,
  country text default 'Brasil',
  is_default boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- 6. CARRINHO
-- =========================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, product_id)
);

-- =========================================================
-- 7. PEDIDOS
-- =========================================================
create type public.order_status as enum (
  'pending',
  'paid',
  'processing',
  'shipped',
  'delivered',
  'cancelled'
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status public.order_status not null default 'pending',
  subtotal numeric(10,2) not null default 0,
  shipping numeric(10,2) not null default 0,
  total numeric(10,2) not null default 0,
  payment_method text,
  payment_status text default 'pending',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =========================================================
-- 8. ITENS DO PEDIDO
-- =========================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  created_at timestamptz default now()
);

-- =========================================================
-- 9. MENSAGENS/CONTATO
-- =========================================================
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- =========================================================
-- 10. FUNÇÃO PARA UPDATED_AT
-- =========================================================
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at_categories
before update on public.categories
for each row execute procedure public.set_updated_at();

create trigger set_updated_at_products
before update on public.products
for each row execute procedure public.set_updated_at();

create trigger set_updated_at_profiles
before update on public.profiles
for each row execute procedure public.set_updated_at();

create trigger set_updated_at_addresses
before update on public.addresses
for each row execute procedure public.set_updated_at();

create trigger set_updated_at_cart_items
before update on public.cart_items
for each row execute procedure public.set_updated_at();

create trigger set_updated_at_orders
before update on public.orders
for each row execute procedure public.set_updated_at();

-- =========================================================
-- 11. ÍNDICES
-- =========================================================
create index if not exists idx_products_category_id on public.products(category_id);
create index if not exists idx_products_featured on public.products(featured);
create index if not exists idx_products_active on public.products(is_active);
create index if not exists idx_product_images_product_id on public.product_images(product_id);
create index if not exists idx_cart_items_user_id on public.cart_items(user_id);
create index if not exists idx_orders_user_id on public.orders(user_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);

-- =========================================================
-- 12. ROW LEVEL SECURITY
-- =========================================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.contact_messages enable row level security;

-- Produtos: leitura pública; escrita somente autenticado
create policy "Products are viewable by everyone"
  on public.products for select
  using (true);

create policy "Authenticated users can manage products"
  on public.products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

create policy "Authenticated users can manage categories"
  on public.categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Product images are viewable by everyone"
  on public.product_images for select
  using (true);

create policy "Authenticated users can manage images"
  on public.product_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Perfil do usuário
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Endereços do usuário
create policy "Users can manage their own addresses"
  on public.addresses for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Carrinho do usuário
create policy "Users can manage their own cart"
  on public.cart_items for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Pedidos do usuário
create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own orders"
  on public.orders for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can view their own order items"
  on public.order_items for select
  using (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

create policy "Users can insert order items for their own orders"
  on public.order_items for insert
  with check (exists (
    select 1 from public.orders o
    where o.id = order_items.order_id and o.user_id = auth.uid()
  ));

-- Mensagem de contato
create policy "Anyone can insert contact messages"
  on public.contact_messages for insert
  with check (true);

create policy "Only authenticated users can view contact messages"
  on public.contact_messages for select
  using (auth.role() = 'authenticated');

-- =========================================================
-- 13. SEED DE CATEGORIAS
-- =========================================================
insert into public.categories (name, slug, description)
values
  ('Essências', 'essencias', 'Aromas premium para clima e sensação'),
  ('Conjuntos', 'conjuntos', 'Kits selecionados para experiências e presentes'),
  ('Acessórios', 'acessorios', 'Itens complementares para uso diário')
on conflict (slug) do nothing;

-- =========================================================
-- 14. SEED DE PRODUTOS
-- =========================================================
with cat as (
  select id from public.categories where slug = 'essencias'
)
insert into public.products (
  category_id,
  name,
  slug,
  short_description,
  description,
  price,
  compare_at_price,
  stock,
  image_url,
  featured,
  is_active,
  sort_order
)
select
  cat.id,
  v.name,
  v.slug,
  v.short_description,
  v.description,
  v.price,
  v.compare_at_price,
  v.stock,
  v.image_url,
  v.featured,
  true,
  v.sort_order
from (
  values
    ('Essência Floral', 'essencia-floral', 'Aroma delicado e sofisticado', 'Fragrância floral leve, elegante e envolvente para o dia a dia.', 89.90, 119.90, 30, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', true, 1),
    ('Essência Tropical', 'essencia-tropical', 'Fragrância fresca e energizante', 'Uma mistura cítrica e floral com sensação vibrante e exclusiva.', 79.90, 109.90, 25, 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80', true, 2),
    ('Essência Amadeirada', 'essencia-amadeirada', 'Aroma quente e sensual', 'Notas amadeiradas com profundidade e presença sofisticada.', 99.90, 149.90, 18, 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80', true, 3),
    ('Essência Frutada', 'essencia-frutada', 'Fragrância doce e refrescante', 'Um toque frutado para uma experiência leve e irresistível.', 84.90, 124.90, 22, 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80', true, 4),
    ('Essência Floral Intenso', 'essencia-floral-intenso', 'Versão mais marcante e elegante', 'Uma fragrância floral intensa, com presença sofisticada e sensual.', 94.90, 129.90, 20, 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80', false, 5),
    ('Essência Almíscara', 'essencia-almiscara', 'Aroma envolvente e gourmand', 'Notas quentes e acolhedoras com um toque exclusivo e misterioso.', 109.90, 159.90, 12, 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80', false, 6),
    ('Essência Cítrica', 'essencia-citrica', 'Fragrância cítrica e revigorante', 'Notas frescas e luminosas para um dia mais dinâmico e elegante.', 74.90, 99.90, 27, 'https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=900&q=80', false, 7),
    ('Essência Oriental', 'essencia-oriental', 'Aroma exótico e misterioso', 'Uma composição mais intensa, sensual e marcante.', 119.90, 169.90, 14, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=80', false, 8)
) as v(name, slug, short_description, description, price, compare_at_price, stock, image_url, featured, sort_order)
where exists (select 1 from cat);

-- =========================================================
-- 15. FUNÇÃO PARA CRIAR PERFIL AUTOMATICAMENTE
-- =========================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    split_part(new.email, '@', 1),
    ''
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- =========================================================
-- 16. VIEW ÚTIL PARA LISTAR PRODUTOS COM CATEGORIA
-- =========================================================
create or replace view public.products_with_category as
select
  p.id,
  p.category_id,
  c.name as category_name,
  p.name,
  p.slug,
  p.short_description,
  p.description,
  p.price,
  p.compare_at_price,
  p.stock,
  p.image_url,
  p.featured,
  p.is_active,
  p.sort_order,
  p.created_at,
  p.updated_at
from public.products p
left join public.categories c on c.id = p.category_id;

grant select on public.products_with_category to public;
