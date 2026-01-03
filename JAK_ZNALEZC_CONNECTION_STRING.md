# 📋 Jak znaleźć Connection String w Supabase - Krok po kroku

## Krok 1: Zaloguj się do Supabase

1. Idź na: **https://supabase.com**
2. Zaloguj się do swojego konta

## Krok 2: Otwórz swój projekt

1. Na stronie głównej zobaczysz listę projektów
2. **Kliknij** na projekt `proof-of-meeting` (lub nazwę którą nadałeś)

## Krok 3: Przejdź do Settings

1. W lewym menu (pionowym) znajdź ikonę **⚙️ Settings**
2. **Kliknij** na "Settings"

## Krok 4: Otwórz sekcję Database

1. W menu po lewej stronie (w Settings) znajdź **"Database"**
2. **Kliknij** na "Database"

## Krok 5: Znajdź Connection String

1. Przewiń stronę w dół
2. Znajdź sekcję **"Connection string"** lub **"Connection pooling"**
3. Zobaczysz kilka zakładek:
   - **URI** ← **TUTAJ!**
   - JDBC
   - Golang
   - Python
   - itp.

4. **Kliknij** na zakładkę **"URI"**

## Krok 6: Skopiuj tekst

1. Zobaczysz pole z tekstem zaczynającym się od:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```

2. **Kliknij** na pole z tekstem (lub przycisk "Copy")
3. Tekst zostanie skopiowany do schowka

## Krok 7: Wklej do pliku .env

1. W Terminalu wpisz:
   ```bash
   open -a TextEdit .env
   ```

2. W otwartym pliku znajdź linię:
   ```
   DATABASE_URL="..."
   ```

3. **Zamień** `...` na skopiowany tekst z Supabase

4. **WAŻNE:** Zamień `[YOUR-PASSWORD]` na hasło które zapisałeś podczas tworzenia projektu!

5. **Zapisz** plik (Cmd + S)

---

## 🎯 Wizualna pomoc

```
Supabase Dashboard
├── Projects
│   └── proof-of-meeting (kliknij tutaj)
│       ├── Table Editor
│       ├── SQL Editor
│       ├── ⚙️ Settings (kliknij tutaj)
│       │   ├── General
│       │   ├── API
│       │   ├── Database (kliknij tutaj) ← TUTAJ!
│       │   │   └── Connection string
│       │   │       └── URI (kliknij tutaj) ← I TUTAJ!
│       │   ├── Auth
│       │   └── ...
```

---

## ❓ Jeśli nie widzisz "Database" w Settings

1. Upewnij się, że jesteś w **Settings** (ikona ⚙️)
2. Sprawdź czy projekt jest w pełni utworzony (poczekaj 2-3 minuty)
3. Sprawdź czy masz uprawnienia do projektu

---

## ✅ Przykład jak powinien wyglądać connection string

```
postgresql://postgres.abcdefghijklmnop:[MOJE_HASLO_123]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**WAŻNE:** 
- Zamień `[MOJE_HASLO_123]` na prawdziwe hasło z Supabase
- Nie usuwaj cudzysłowów `"` w pliku .env
- Cały tekst powinien być w jednej linii

---

## 🆘 Jeśli nadal masz problemy

1. Sprawdź czy projekt w Supabase jest aktywny (nie w trybie "Paused")
2. Sprawdź czy masz dostęp do projektu
3. Spróbuj odświeżyć stronę (F5)
4. Sprawdź czy jesteś zalogowany do właściwego konta

