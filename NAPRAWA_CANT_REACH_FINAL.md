# 🔧 Ostateczna naprawa: Can't reach database server

## ❌ Problem

Connection string jest poprawny, baza jest aktywna, ale nadal "Can't reach database server".

## ✅ Możliwe rozwiązania

### Rozwiązanie 1: Sprawdź IP Restrictions w Supabase

Supabase może blokować połączenia z Twojego IP.

1. **W Supabase:**
   - Settings → Database
   - Znajdź sekcję **"Connection pooling"** lub **"Network restrictions"**
   - Sprawdź czy są jakieś ograniczenia IP
   - Jeśli są, dodaj swoje IP lub wyłącz ograniczenia (dla developmentu)

### Rozwiązanie 2: Użyj Connection Pooling (port 6543)

Direct connection (port 5432) może być zablokowany. Użyj connection pooling.

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na connection pooling:**

**Format 1 (spróbuj najpierw):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres?pgbouncer=true"
```

**Format 2 (jeśli Format 1 nie działa):**
```
DATABASE_URL="postgresql://postgres.lhodfhixrisaycfbpgxz:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Format 3 (najprostszy):**
```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@aws-0-us-west-1.pooler.supabase.com:6543/postgres"
```

**Zapisz:** Cmd + S

**Spróbuj:**
```bash
npx prisma db push
```

### Rozwiązanie 3: Pobierz Connection Pooling z Supabase

1. **W Supabase:**
   - Settings → Database
   - Connection string → zakładka **"Transaction"** (port 6543)
   - Skopiuj connection string
   - Powinien wyglądać tak:
     ```
     postgresql://postgres.lhodfhixrisaycfbpgxz:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
     ```

2. **Wklej do `.env`** (zamień `[YOUR-PASSWORD]` na hasło)

### Rozwiązanie 4: Sprawdź czy port 5432 jest dostępny

**W Terminalu spróbuj:**
```bash
nc -zv db.lhodfhixrisaycfbpgxz.supabase.co 5432
```

**Jeśli zobaczysz "Connection refused"** → port jest zablokowany, użyj connection pooling (6543)

**Jeśli zobaczysz "Connection succeeded"** → port działa, problem może być w Prisma

## 🔍 Diagnoza

**Sprawdź w Supabase:**
1. Settings → Database → "Connection pooling"
2. Czy jest włączone "Connection pooling"?
3. Czy są jakieś IP restrictions?

## ✅ Moja rekomendacja

**Użyj Format 1 (z `?pgbouncer=true`):**

```
DATABASE_URL="postgresql://postgres:mojehaslo123321mojehaslo123442ahahaisdsdhd@db.lhodfhixrisaycfbpgxz.supabase.co:6543/postgres?pgbouncer=true"
```

**LUB pobierz connection pooling string z Supabase i użyj go dokładnie tak jak jest.**

---

**Spróbuj connection pooling (port 6543) z parametrem `?pgbouncer=true`!** 🔧

