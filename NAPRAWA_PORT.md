# 🔧 Naprawa: Invalid port number

## ❌ Problem

Błąd: `invalid port number in database URL`

**Przyczyna:** Port `5432` (direct connection) może nie działać w Supabase. Lepiej użyć connection pooling (port `6543`).

## ✅ Rozwiązanie

### Opcja 1: Użyj Connection Pooling (ZALECANE) ⭐

**Zmień port z `5432` na `6543`:**

**Zamiast:**
```
postgresql://postgres:[HASŁO]@db.hwbfxpupcfqzpitnthxc.supabase.co:5432/postgres
```

**Użyj:**
```
postgresql://postgres.hwbfxpupcfqzpitnthxc:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**LUB** (jeśli masz connection pooling string z Supabase):
```
postgresql://postgres.hwbfxpupcfqzpitnthxc:[HASŁO]@db.hwbfxpupcfqzpitnthxc.supabase.co:6543/postgres
```

### Opcja 2: Pobierz Connection Pooling z Supabase

1. **W Supabase:**
   - Settings → Database
   - Przewiń do "Connection string"
   - Kliknij zakładkę **"Transaction"** lub **"Connection pooling"**
   - Skopiuj connection string (powinien mieć port `6543`)

2. **Wklej do pliku `.env`** (zamień `[YOUR-PASSWORD]` na hasło)

## 🔧 Jak zaktualizować plik .env

1. **Otwórz plik .env:**
   ```bash
   open -a TextEdit .env
   ```

2. **Zamień linię DATABASE_URL na:**

   **Opcja A (connection pooling z aws-0):**
   ```
   DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:[HASŁO]@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
   ```

   **Opcja B (connection pooling z db):**
   ```
   DATABASE_URL="postgresql://postgres.hwbfxpupcfqzpitnthxc:[HASŁO]@db.hwbfxpupcfqzpitnthxc.supabase.co:6543/postgres"
   ```

   **WAŻNE:** Zamień `[HASŁO]` na prawdziwe hasło!

3. **Zapisz plik:** Cmd + S

4. **Spróbuj ponownie:**
   ```bash
   npx prisma db push
   ```

## 📋 Różnica między portami

- **Port 5432** = Direct connection (może nie działać) ❌
- **Port 6543** = Connection pooling (zalecane) ✅

## ✅ Po naprawie

Powinieneś zobaczyć:
```
Your database is now in sync with your schema
```

---

**Zmień port na 6543 i spróbuj ponownie!** 🔧

