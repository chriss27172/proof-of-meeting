# 🔧 Naprawa problemu z git push

## Problem 1: Nieprawidłowy URL repozytorium

**Błąd:** `TWOJA-NAZWA` w URL zamiast Twojej nazwy użytkownika GitHub

## Problem 2: GitHub wymaga Personal Access Token

**Błąd:** `Password authentication is not supported` - GitHub nie akceptuje haseł, potrzebujesz tokena!

---

## ✅ Rozwiązanie krok po kroku:

### Krok 1: Sprawdź aktualny remote URL

**W Terminalu (zsh):**
```zsh
cd ~/.cursor-tutor/proof-of-meeting
git remote -v
```

**Zobaczysz coś takiego:**
```
origin  https://github.com/TWOJA-NAZWA/proof-of-meeting.git (fetch)
origin  https://github.com/TWOJA-NAZWA/proof-of-meeting.git (push)
```

### Krok 2: Usuń stary remote

**W Terminalu (zsh):**
```zsh
git remote remove origin
```

### Krok 3: Dodaj poprawny remote URL

**W Terminalu (zsh) - ZAMIEŃ na swoją nazwę użytkownika GitHub:**

**Przykład (jeśli Twoja nazwa to "chrissulenta"):**
```zsh
git remote add origin https://github.com/chrissulenta/proof-of-meeting.git
```

**WAŻNE:** Zamień `chrissulenta` na swoją prawdziwą nazwę użytkownika GitHub!

**Jak sprawdzić swoją nazwę użytkownika GitHub:**
1. Otwórz: https://github.com
2. Zaloguj się
3. Kliknij na swoją ikonę profilu (prawy górny róg)
4. Zobaczysz swoją nazwę użytkownika pod ikoną

### Krok 4: Utwórz Personal Access Token

**GitHub nie akceptuje haseł - potrzebujesz tokena!**

1. **Otwórz przeglądarkę:**
   - Idź na: https://github.com/settings/tokens
   - Lub: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)

2. **Kliknij "Generate new token" → "Generate new token (classic)"**

3. **Wypełnij formularz:**
   - **Note:** `Vercel Deployment` (lub dowolna nazwa)
   - **Expiration:** Wybierz okres (np. 90 days lub No expiration)
   - **Zaznacz:** ✅ `repo` (pełny dostęp do repozytoriów)
   - Kliknij **"Generate token"**

4. **SKOPIUJ TOKEN!** 📋
   - Wygląda tak: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - **WAŻNE:** Pokaże się tylko raz! Skopiuj go teraz!

### Krok 5: Wyślij kod używając tokena

**W Terminalu (zsh):**
```zsh
git push -u origin main
```

**Gdy poprosi o:**
- **Username:** Wpisz swoją nazwę użytkownika GitHub (np. `chrissulenta`)
- **Password:** Wklej **Personal Access Token** (nie hasło!)

**Przykład:**
```
Username for 'https://github.com': chrissulenta
Password for 'https://chrissulenta@github.com': ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ✅ Gotowe!

**Po wykonaniu tych kroków kod zostanie wysłany do GitHub!** 🚀

---

## 🔍 Sprawdzenie czy działa:

**Po udanym push zobaczysz:**
```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), done.
To https://github.com/twoja-nazwa/proof-of-meeting.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 💡 Wskazówki:

- **Personal Access Token** działa jak hasło, ale jest bezpieczniejszy
- Token możesz używać wielokrotnie
- Jeśli token wygaśnie, utwórz nowy
- Token możesz zobaczyć tylko raz przy tworzeniu - zapisz go!

---

**Wykonaj wszystkie kroki po kolei!** 🚀

