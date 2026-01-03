# 🔄 Aktualizacja Connection String - Instrukcja

## 📋 Co zrobić krok po kroku

### Krok 1: Otwórz plik .env

W Terminalu wpisz:
```bash
cd ~/.cursor-tutor/proof-of-meeting
open -a TextEdit .env
```

### Krok 2: Wklej nowy connection string

1. **Znajdź linię:**
   ```
   DATABASE_URL="..."
   ```

2. **Zamień całą linię** na nowy connection string który wkleisz

3. **WAŻNE:** 
   - Upewnij się, że connection string jest w cudzysłowach `"`
   - Sprawdź czy hasło jest poprawne (nie ma `[YOUR-PASSWORD]` ani `[HASŁO]`)
   - Connection string powinien zaczynać się od `postgresql://`

4. **Zapisz plik:** Cmd + S

### Krok 3: Zainicjalizuj bazę danych

W Terminalu wpisz:
```bash
npx prisma db push
```

**Powinieneś zobaczyć:**
```
Your database is now in sync with your schema
```

### Krok 4: Uruchom ponownie aplikację

**Jeśli aplikacja działa:**
- Zatrzymaj: Ctrl + C
- Uruchom ponownie: `npm run dev`

**Jeśli aplikacja nie działa:**
```bash
npm run dev
```

---

## ✅ Po aktualizacji

Aplikacja powinna działać z nową bazą danych!

---

## 🆘 Jeśli są błędy

**Błąd: "Can't reach database server"**
- Sprawdź czy connection string jest poprawny
- Sprawdź czy port jest poprawny (6543 dla connection pooling, 5432 dla direct)

**Błąd: "Tenant or user not found"**
- Sprawdź czy hasło w connection string jest poprawne
- Upewnij się, że nie ma `[YOUR-PASSWORD]` w connection string

**Błąd: "Environment variable not found"**
- Sprawdź czy plik `.env` istnieje
- Sprawdź czy `DATABASE_URL` jest w pliku `.env`

---

**Gotowy! Wklej nowy connection string, a pomogę zaktualizować wszystko!** 🚀

