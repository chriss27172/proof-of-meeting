# 🔧 Instalacja Turso CLI - KROK PO KROKU

## 📝 Krok po kroku

### Krok 1: Zainstaluj Turso CLI

**W Terminalu:**
```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

**Poczekaj** aż zobaczysz komunikat sukcesu.

### Krok 2: Dodaj Turso CLI do PATH

**Po instalacji, dodaj do PATH:**

**Sprawdź jaki shell używasz:**
```bash
echo $SHELL
```

**Jeśli używasz bash:**
```bash
echo 'export PATH="$HOME/.turso:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Jeśli używasz zsh (domyślnie na nowszych Mac):**
```bash
echo 'export PATH="$HOME/.turso:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Krok 3: Sprawdź czy działa

**Zamknij i otwórz Terminal ponownie, potem:**
```bash
turso --version
```

**Jeśli zobaczysz wersję, działa!** ✅

### Krok 4: Zaloguj się

```bash
turso auth login
```

**Otworzy się przeglądarka - zaloguj się do Turso.**

### Krok 5: Utwórz lokalną replikę

```bash
cd ~/.cursor-tutor/proof-of-meeting
turso db replicate proofofmeeting-chriss27172 --local
```

### Krok 6: Zaktualizuj .env

**Otwórz plik .env:**
```bash
open -a TextEdit .env
```

**Zamień DATABASE_URL na:**
```
DATABASE_URL="file:./.turso/local.db"
```

**Zapisz:** Cmd + S

### Krok 7: Utwórz tabele

```bash
npx prisma db push
```

---

## 🔄 Alternatywa: Użyj lokalnego SQLite (PROSTSZE)

**Jeśli Turso CLI sprawia problemy, użyj lokalnego SQLite:**

**W .env:**
```
DATABASE_URL="file:./dev.db"
```

**To działa od razu bez instalacji Turso CLI!**

---

**Spróbuj zainstalować Turso CLI lub użyj lokalnego SQLite!** 🚀

