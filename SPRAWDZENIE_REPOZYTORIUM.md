# 🔍 Sprawdzanie czy repozytorium istnieje

## Problem: GitHub Desktop nie znajduje repozytorium

---

## ✅ Krok 1: Sprawdź czy folder istnieje

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
pwd
```

**Powinieneś zobaczyć:**
```
/Users/chrissulenta/.cursor-tutor/proof-of-meeting
```

**Jeśli widzisz błąd "No such file or directory":**
- Folder nie istnieje w tej lokalizacji
- Sprawdź gdzie jest Twój projekt

---

## ✅ Krok 2: Sprawdź czy Git jest zainicjalizowany

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
ls -la | grep .git
```

**Jeśli widzisz `.git`:**
- ✅ Git jest zainicjalizowany
- Możesz dodać do GitHub Desktop

**Jeśli NIE widzisz `.git`:**
- ❌ Git nie jest zainicjalizowany
- Musisz zainicjalizować Git najpierw

---

## ✅ Krok 3: Sprawdź status Git

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git status
```

**Jeśli widzisz listę plików:**
- ✅ Git działa poprawnie
- Możesz dodać do GitHub Desktop

**Jeśli widzisz błąd "not a git repository":**
- ❌ Git nie jest zainicjalizowany
- Zobacz "Rozwiązanie" poniżej

---

## 🔧 Rozwiązanie: Jeśli Git nie jest zainicjalizowany

### Opcja 1: Zainicjalizuj Git w Terminalu

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git init
git add .
git commit -m "Initial commit"
```

**Teraz możesz dodać do GitHub Desktop!**

### Opcja 2: Utwórz nowe repozytorium w GitHub Desktop

1. **Otwórz GitHub Desktop**
2. **Kliknij "File"** → **"New Repository"**
3. **Wypełnij:**
   - **Name:** `proof-of-meeting`
   - **Local Path:** Kliknij "Choose..." i znajdź folder `~/.cursor-tutor/proof-of-meeting`
   - **Git Ignore:** None (lub Node)
   - **License:** None
4. **Kliknij "Create Repository"**

**GitHub Desktop automatycznie:**
- ✅ Zainicjalizuje Git
- ✅ Utworzy pierwszy commit
- ✅ Przygotuje repozytorium

---

## 🔧 Rozwiązanie: Jeśli Git jest zainicjalizowany, ale GitHub Desktop nie znajduje

### Metoda 1: Dodaj przez "Add Local Repository"

1. **Otwórz GitHub Desktop**
2. **Kliknij "File"** → **"Add Local Repository"**
3. **Kliknij "Choose..."**
4. **Znajdź folder:** `~/.cursor-tutor/proof-of-meeting`
   - Możesz też wpisać ścieżkę: `/Users/chrissulenta/.cursor-tutor/proof-of-meeting`
5. **Kliknij "Add Repository"**

### Metoda 2: Przeciągnij folder do GitHub Desktop

1. **Otwórz Finder**
2. **Znajdź folder:** `~/.cursor-tutor/proof-of-meeting`
3. **Przeciągnij folder** do okna GitHub Desktop
4. **GitHub Desktop automatycznie wykryje repozytorium**

### Metoda 3: Sprawdź czy folder jest ukryty

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor
ls -la
```

**Sprawdź czy widzisz folder `proof-of-meeting`**

**Jeśli nie widzisz:**
```zsh
ls -la proof-of-meeting
```

---

## 🔍 Sprawdzenie pełnej ścieżki

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
pwd
ls -la
```

**Skopiuj pełną ścieżkę i użyj jej w GitHub Desktop!**

**Przykład pełnej ścieżki:**
```
/Users/chrissulenta/.cursor-tutor/proof-of-meeting
```

---

## ✅ Sprawdzenie czy wszystko działa

**Po dodaniu do GitHub Desktop:**

1. **Sprawdź czy widzisz pliki** w GitHub Desktop
2. **Sprawdź czy widzisz status** "No local changes" lub listę plików
3. **Sprawdź czy możesz zrobić commit**

**Jeśli wszystko działa:**
- ✅ Repozytorium jest połączone!
- Możesz teraz opublikować na GitHub

---

## 🐛 Częste problemy:

### Problem: "This directory does not appear to be a Git repository"
**Rozwiązanie:** Zainicjalizuj Git (zobacz "Rozwiązanie" powyżej)

### Problem: "Repository not found"
**Rozwiązanie:** Sprawdź czy folder istnieje (zobacz "Krok 1")

### Problem: GitHub Desktop nie widzi folderu
**Rozwiązanie:** 
- Użyj pełnej ścieżki: `/Users/chrissulenta/.cursor-tutor/proof-of-meeting`
- Lub przeciągnij folder do GitHub Desktop

---

**Wykonaj wszystkie kroki sprawdzające po kolei!** 🔍

