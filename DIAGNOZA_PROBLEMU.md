# 🔍 Diagnoza problemu - Co nie działa?

## ✅ Co działa (z obrazka):

- ✅ Next.js uruchomił się pomyślnie
- ✅ Aplikacja działa na `http://localhost:3000`
- ✅ Ready in 3.1s - wszystko gotowe

## ❓ Co może nie działać?

### 1. Nie możesz otworzyć strony w przeglądarce?

**Sprawdź:**
- Czy wpisałeś w przeglądarce: `http://localhost:3000`
- Czy Terminal jest nadal otwarty (aplikacja musi działać)
- Czy nie ma błędów w Terminalu

**Rozwiązanie:**
1. Otwórz Chrome/Safari/Firefox
2. W pasku adresu wpisz: `http://localhost:3000`
3. Naciśnij Enter

### 2. Widzisz błędy w przeglądarce?

**Możliwe błędy:**
- "Error connecting to database" - brak pliku `.env` lub zły connection string
- "500 Internal Server Error" - problem z bazą danych
- Biała strona - błąd w kodzie

**Rozwiązanie:**
- Sprawdź czy masz plik `.env` z `DATABASE_URL`
- Sprawdź Terminal - tam są komunikaty o błędach

### 3. Brak pliku .env?

**Problem:** Nie masz pliku `.env` z connection string do bazy danych

**Rozwiązanie:**
1. Utwórz plik `.env`:
   ```bash
   touch .env
   ```

2. Otwórz go:
   ```bash
   open -a TextEdit .env
   ```

3. Wklej (zamień na swoje dane z Supabase):
   ```
   DATABASE_URL="postgresql://postgres:[HASŁO]@db.[PROJEKT-ID].supabase.co:5432/postgres"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   BASE_RPC_URL="https://mainnet.base.org"
   ```

4. Zapisz plik (Cmd + S)

5. Zainicjalizuj bazę danych:
   ```bash
   npx prisma db push
   ```

6. Uruchom ponownie aplikację:
   ```bash
   npm run dev
   ```

### 4. Błędy w Terminalu?

**Sprawdź Terminal** - tam są wszystkie komunikaty o błędach.

**Typowe błędy:**
- `Can't reach database server` - zły `DATABASE_URL` w `.env`
- `Prisma Client not generated` - uruchom `npx prisma generate`
- `Port 3000 is already in use` - zamknij inne aplikacje

## 🆘 Co dokładnie nie działa?

**Odpowiedz na te pytania:**

1. **Czy możesz otworzyć `http://localhost:3000` w przeglądarce?**
   - Tak / Nie

2. **Co widzisz w przeglądarce?**
   - Biała strona
   - Strona z błędem
   - Strona aplikacji (ale coś nie działa)
   - Nie mogę otworzyć

3. **Czy są błędy w Terminalu?**
   - Tak - jakie?
   - Nie

4. **Czy masz plik `.env`?**
   - Tak
   - Nie

5. **Czy wykonałeś `npx prisma db push`?**
   - Tak
   - Nie

---

## 📝 Szybka diagnostyka

W Terminalu (gdzie działa `npm run dev`) sprawdź:

1. **Czy są błędy?** - Zobaczysz czerwone komunikaty
2. **Czy aplikacja działa?** - Powinno być "Ready" z zielonym znacznikiem
3. **Jaki jest adres?** - Powinno być `http://localhost:3000`

---

**Napisz mi co dokładnie nie działa, a pomogę to naprawić!** 🔧

