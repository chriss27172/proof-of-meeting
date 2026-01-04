# 🔍 Sprawdzenie co widzisz w terminalu

## Problem: Widzisz tylko pliki .md w terminalu

**Możliwe przyczyny:**
1. Patrzysz na `git status` - pokazuje tylko nieśledzone pliki
2. Pliki projektu są już w Git (w commicie), więc nie pokazują się w `git status`
3. Używasz komendy która filtruje tylko pliki .md

---

## ✅ Sprawdzenie krok po kroku:

### Krok 1: Sprawdź co jest w Git

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git ls-files | head -30
```

**To pokaże WSZYSTKIE pliki które są w Git!**

**Powinieneś zobaczyć:**
- `package.json`
- `src/app/...`
- `prisma/schema.prisma`
- `next.config.js`
- Wszystkie pliki projektu!

### Krok 2: Sprawdź pliki projektu (bez .md)

**W Terminalu (zsh):**
```zsh
git ls-files | grep -v "\.md$" | head -30
```

**To pokaże wszystkie pliki OPRÓCZ .md!**

### Krok 3: Sprawdź co jest nieśledzone

**W Terminalu (zsh):**
```zsh
git status
```

**To pokaże:**
- Pliki które są w Git (nie pokazuje ich, bo są już w commicie)
- Pliki które NIE są w Git (pokazuje jako "Untracked files")

**Jeśli widzisz tylko pliki .md w "Untracked files":**
- To znaczy, że pliki projektu SĄ już w Git!
- Tylko pliki .md nie są jeszcze dodane

### Krok 4: Sprawdź fizyczne pliki w folderze

**W Terminalu (zsh):**
```zsh
ls -la | grep -v "^d" | grep -v "\.md$"
```

**To pokaże wszystkie pliki w folderze (oprócz .md i folderów)!**

**Powinieneś zobaczyć:**
- `package.json`
- `next.config.js`
- `tsconfig.json`
- itp.

### Krok 5: Sprawdź folder src/

**W Terminalu (zsh):**
```zsh
ls -la src/
```

**Powinieneś zobaczyć:**
- `app/`
- `components/`
- `lib/`

---

## 💡 Wyjaśnienie:

### `git status` pokazuje tylko:
- ✅ Pliki które ZOSTAŁY ZMIENIONE (Modified)
- ✅ Pliki które NIE SĄ W GIT (Untracked)

### `git status` NIE pokazuje:
- ❌ Plików które SĄ JUŻ W GIT (bo są już w commicie)

**Jeśli pliki projektu są już w Git:**
- Nie zobaczysz ich w `git status`
- Ale SĄ w repozytorium!
- Możesz je zobaczyć przez `git ls-files`

---

## ✅ Rozwiązanie:

### Jeśli pliki projektu SĄ w Git:

**Sprawdź czy są wypushowane:**
```zsh
git log --oneline
```

**Jeśli widzisz commity z plikami projektu:**
- Wypushuj je na GitHub:
```zsh
git push origin main
```

### Jeśli pliki projektu NIE SĄ w Git:

**Dodaj je:**
```zsh
git add .
git commit -m "Add all project source files"
git push origin main
```

---

## 🔍 Sprawdzenie na GitHub:

**Otwórz:** https://github.com/chriss27172/proof-of-meeting

**Sprawdź czy widzisz:**
- ✅ Folder `src/`
- ✅ `package.json`
- ✅ `prisma/`
- ✅ Wszystkie pliki projektu

**Jeśli widzisz tylko pliki .md na GitHub:**
- To znaczy, że pliki projektu NIE zostały wypushowane
- Musisz je dodać i wypushować

---

**Wykonaj wszystkie komendy sprawdzające i powiedz mi co widzisz!** 🔍

