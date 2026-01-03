# 🔍 Sprawdź format connection string

## 📝 Twój obecny connection string

```
postgresql://postgres:Q3gB1f%2Awi%2A%23cO%26wH@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres
```

## ✅ Poprawny format (Connection Pooling)

**Skopiuj i wklej do pliku `.env`:**

```
DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

## 🔑 Różnice

1. **Nazwa użytkownika:** `postgres` → `postgres.hwbfxpupcfqzpitnthxc`
2. **Host:** `db.hwbfxpupcfqzpitnthxc.supabase.co` → `aws-0-us-west-1.pooler.supabase.com`
3. **Port:** `5432` → `6543` (connection pooling)

## 🔧 Jak zaktualizować

1. **Otwórz plik .env:**
   ```bash
   open -a TextEdit .env
   ```

2. **Zamień całą linię DATABASE_URL** na:
   ```
   DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
   ```

3. **Zapisz:** Cmd + S

4. **Spróbuj:**
   ```bash
   npx prisma db push
   ```

---

**Connection pooling (port 6543) jest bardziej niezawodne niż direct connection (port 5432)!** ✅

