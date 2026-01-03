# 🔧 Naprawa: Zły port w connection stringu

## ❌ Problem

Twój connection string:
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

**Problem:** Port `5432` - to jest port dla direct connection, ale używasz connection pooling hosta (`aws-0-us-west-1.pooler.supabase.com`).

## ✅ Rozwiązanie

**Connection pooling wymaga portu `6543`!**

### Krok 1: Otwórz plik .env

```bash
open -a TextEdit .env
```

### Krok 2: Zmień port z 5432 na 6543

**Zamiast:**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:5432/postgres"
```

**Użyj (zmień port na 6543):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**JEDYNA ZMIANA:** `:5432/` → `:6543/`

### Krok 3: Pełny plik .env

```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

### Krok 4: Zapisz plik

**Cmd + S**

### Krok 5: Spróbuj ponownie

```bash
npx prisma db push
```

## 🔑 Ważne

- **Host `aws-0-us-west-1.pooler.supabase.com`** = Connection pooling
- **Connection pooling wymaga portu `6543`** (nie `5432`)
- Port `5432` jest dla direct connection (inny host)

---

**Zmień port na 6543 i powinno działać!** ✅

