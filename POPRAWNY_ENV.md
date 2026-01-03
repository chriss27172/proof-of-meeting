# ✅ Poprawny plik .env

## 📝 Twój connection string

```
postgresql://postgres:Q3gB1f*wi*#cO&wH@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres
```

## ⚠️ Problem

Hasło zawiera specjalne znaki (`*`, `#`, `&`) które muszą być zakodowane!

## ✅ Poprawny plik .env

**Skopiuj i wklej do pliku `.env`:**

```
DATABASE_URL="postgresql://postgres:Q3gB1f%2Awi%2A%23cO%26wH@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

**LUB (connection pooling - ZALECANE):**

```
DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:Q3gB1f%2Awi%2A%23cO%26wH@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
BASE_RPC_URL="https://mainnet.base.org"
```

## 🔧 Jak zaktualizować

1. **Otwórz plik .env:**
   ```bash
   open -a TextEdit .env
   ```

2. **Zamień całą zawartość** na jedną z opcji powyżej

3. **Zapisz:** Cmd + S

4. **Zainicjalizuj bazę:**
   ```bash
   npx prisma db push
   ```

---

**Zakodowane znaki:**
- `*` → `%2A`
- `#` → `%23`
- `&` → `%26`

