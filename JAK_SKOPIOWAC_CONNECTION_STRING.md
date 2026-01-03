# 📋 Jak skopiować Connection String z Supabase - Szczegółowa instrukcja

## 🎯 Gdzie dokładnie jest tekst do skopiowania

### Krok 1: Otwórz Database w Settings

1. W Supabase, w lewym menu kliknij **⚙️ Settings**
2. Kliknij **"Database"** w menu po lewej

### Krok 2: Znajdź sekcję "Connection string"

1. Przewiń stronę w dół
2. Zobaczysz sekcję **"Connection string"** lub **"Connection pooling"**
3. W tej sekcji zobaczysz kilka zakładek:
   - **URI** ← TUTAJ!
   - JDBC
   - Golang
   - Python
   - Node.js
   - itp.

### Krok 3: Kliknij na zakładkę "URI"

1. **Kliknij** na zakładkę **"URI"** (pierwsza zakładka)
2. Zobaczysz pole z tekstem

### Krok 4: Skopiuj tekst z pola

**Opcja A - Przycisk Copy:**
1. Zobaczysz przycisk **"Copy"** obok pola z tekstem
2. **Kliknij** na przycisk "Copy"
3. Tekst zostanie skopiowany do schowka

**Opcja B - Ręczne kopiowanie:**
1. **Kliknij** na pole z tekstem (tekst zostanie zaznaczony)
2. Naciśnij **Cmd + C** (lub prawy przycisk myszy → Copy)
3. Tekst zostanie skopiowany

### Krok 5: Jak wygląda tekst do skopiowania

Tekst wygląda mniej więcej tak:

```
postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
```

**LUB** (w zależności od regionu):

```
postgresql://postgres.abcdefghijklmnop:[YOUR-PASSWORD]@db.abcdefghijklmnop.supabase.co:5432/postgres
```

---

## 📸 Co dokładnie zobaczysz w Supabase

```
┌─────────────────────────────────────────────────┐
│  Database Settings                              │
├─────────────────────────────────────────────────┤
│                                                 │
│  Connection string                             │
│  ┌───────────────────────────────────────────┐ │
│  │ [URI] [JDBC] [Golang] [Python] [Node.js]  │ │ ← Kliknij "URI"
│  └───────────────────────────────────────────┘ │
│                                                 │
│  ┌───────────────────────────────────────────┐ │
│  │ postgresql://postgres.xxxxx:[PASSWORD]@...│ │ ← Ten tekst!
│  └───────────────────────────────────────────┘ │
│                    [Copy] ← LUB kliknij tutaj  │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## ✅ Po skopiowaniu

1. Tekst jest w schowku
2. Otwórz plik `.env`:
   ```bash
   open -a TextEdit .env
   ```
3. Wklej tekst (Cmd + V) do linii:
   ```
   DATABASE_URL="..."
   ```
4. **WAŻNE:** Zamień `[YOUR-PASSWORD]` na prawdziwe hasło z Supabase!
5. Zapisz plik (Cmd + S)

---

## 🆘 Jeśli nie widzisz przycisku "Copy"

1. **Kliknij** na pole z tekstem (tekst zostanie zaznaczony)
2. Naciśnij **Cmd + C** aby skopiować
3. Lub zaznacz tekst myszką i skopiuj

---

## 💡 Wskazówka

Tekst connection string jest **długi** i zawiera:
- `postgresql://` na początku
- `postgres.` w środku
- `@aws-0-` lub `@db.` w środku
- `:6543/postgres` lub `:5432/postgres` na końcu

Jeśli widzisz taki tekst - to jest to! Skopiuj go cały.

