# 🔧 SETUP SUPABASE - PASSO A PASSO

## ✅ PASSO 1: Copiar o SQL Limpo
1. Abra [supabase/schema-clean.sql](supabase/schema-clean.sql)
2. Copie **TODO** o conteúdo
3. Vá para: https://app.supabase.com/project/acivfuyyibdfcxipjoik/sql/new
4. Cole tudo e clique em "Run"
5. Aguarde a execução completar

**Resultado esperado:**
- ✅ Categories criada com 3 itens
- ✅ Products criada com 8 essências
- ✅ Todas as tabelas com RLS configurado

---

## ✅ PASSO 2: Verificar Tabelas

No SQL Editor, execute para confirmar que tudo funcionou:

```sql
select count(*) from public.categories;
select count(*) from public.products;
select * from public.products limit 1;
```

Resultado esperado:
- Categories: 3 registros
- Products: 8 registros
- Produtos com preços entre 74.90 e 119.90

---

## ✅ PASSO 3: Configurar Auth no Supabase

1. Acesse: https://app.supabase.com/project/acivfuyyibdfcxipjoik/auth/providers
2. Verifique que "Email" está habilitado
3. Vá em: Settings > Auth Policies
4. Deixe como padrão (new users can sign up)

---

## ✅ PASSO 4: Testar Localmente

```bash
cd "c:\Users\Lenovo\Downloads\Essencia Intima Ofical"
npm run dev
```

1. Acesse http://localhost:3000/produtos
   - Devem aparecer 8 produtos reais do banco
2. Acesse http://localhost:3000/conta
   - Faça um cadastro com seu email
   - Depois faça login

**Se funcionou:** ✅ Supabase está integrado

---

## ⚠️ TROUBLESHOOTING

**Problema:** "Supabase não configurado" na página de produtos
**Solução:** Verifique `.env.local` se tem as chaves:
```
NEXT_PUBLIC_SUPABASE_URL=https://acivfuyyibdfcxipjoik.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_QLrABQ2Tw_3OMtDa5iLq1w_MCqKvpgm
```

**Problema:** Login não funciona
**Solução:** Vá em Supabase > Settings > JWT Secret e copie para `.env.local`:
```
SUPABASE_JWT_SECRET=seu_jwt_secret_aqui
```

**Problema:** Erro de RLS (Row Level Security)
**Solução:** O schema cria as policies automaticamente, mas se der erro ao inserir:
1. Vá em: https://app.supabase.com/project/acivfuyyibdfcxipjoik/auth/policies
2. Desabilite RLS temporariamente para testar
3. Se funcionar sem RLS, o problema é a policy

---

## 📝 Arquivos criados

- **supabase/schema-clean.sql** - SQL completo e funcionando
- **supabase/produtos.csv** - Dados dos produtos em CSV (caso precise reimportar)
- **supabase/schema.sql** - Schema original (para referência)

---

## 🚀 Próximos passos (depois que confirmar que funcionou)

1. Carrinho persistente no Supabase
2. Checkout salvar order no banco
3. Page de histórico de pedidos
4. Integração com endereços de entrega
