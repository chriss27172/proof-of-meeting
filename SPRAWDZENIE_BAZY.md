# ✅ Sprawdzenie konfiguracji bazy danych

## 🔍 Szybkie sprawdzenie

### Krok 1: Sprawdź czy baza istnieje

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
ls -la dev.db
```

**Jeśli plik nie istnieje:**
```bash
npx prisma db push
```

### Krok 2: Sprawdź konfigurację

**W Terminalu:**
```bash
cat .env | grep DATABASE_URL
```

**Powinno być:**
```
DATABASE_URL="file:./dev.db"
```

### Krok 3: Przetestuj połączenie

**W Terminalu:**
```bash
npx prisma db pull
```

**Jeśli działa, zobaczysz:**
```
✔ Introspected database
```

---

## 🚀 Utwórz bazę danych (jeśli nie istnieje)

**W Terminalu:**
```bash
cd ~/.cursor-tutor/proof-of-meeting
npx prisma db push
```

**Poczekaj** aż zobaczysz:
```
✔ Your database is now in sync with your Prisma schema
```

---

## 📊 Otwórz Prisma Studio (opcjonalnie)

**W Terminalu:**
```bash
npx prisma studio
```

**Otworzy się:**
- Interfejs graficzny na http://localhost:5555
- Możesz przeglądać i edytować dane

---

## ✅ Status

- ✅ Schema Prisma - skonfigurowana
- ✅ Prisma Client - skonfigurowany
- ⏳ Baza danych - wymaga utworzenia (`npx prisma db push`)

---

**Uruchom `npx prisma db push` aby utworzyć bazę danych!** 🚀

