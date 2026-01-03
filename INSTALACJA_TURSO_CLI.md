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

**Sprawdź czy plik `.bashrc` lub `.zshrc` istnieje:**
```bash
ls -la ~/.bashrc ~/.zshrc
```

**Jeśli używasz bash (domyślnie na Mac):**
```bash
echo 'export PATH="$HOME/.turso:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Jeśli używasz zsh (nowsze Mac):**
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

---

## 🔄 Alternatywa: Użyj lokalnego SQLite

**Jeśli Turso CLI sprawia problemy, użyj lokalnego SQLite:**

**W .env:**
```
DATABASE_URL="file:./dev.db"
```

**To działa od razu bez instalacji Turso CLI!**

---

**Spróbuj zainstalować Turso CLI lub użyj lokalnego SQLite!** 🚀

