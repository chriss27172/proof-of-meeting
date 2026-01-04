# 🔢 Weryfikacja 5-cyfrowym kodem - Dokumentacja

## ✅ Co zostało dodane:

### 1. Model bazy danych (`VerificationCode`)
- Przechowuje 5-cyfrowe kody weryfikacyjne
- Kody wygasają po 10 minutach
- Każdy kod może być użyty tylko raz
- Powiązany z użytkownikiem który go utworzył i użył

### 2. Funkcje pomocnicze (`lib/verificationCode.ts`)
- `generateVerificationCode()` - generuje losowy 5-cyfrowy kod
- `validateCodeFormat()` - sprawdza format kodu
- `isCodeExpired()` - sprawdza czy kod wygasł
- `getDefaultExpiration()` - zwraca domyślny czas wygaśnięcia (10 minut)

### 3. Endpointy API

#### `/api/verification-code/generate`
- Generuje nowy 5-cyfrowy kod weryfikacyjny
- Kod jest unikalny i ważny przez 10 minut
- Zwraca kod i link do strony z kodem

#### `/api/verification-code/verify`
- Weryfikuje wprowadzony kod
- Sprawdza czy kod istnieje, nie wygasł i nie został użyty
- Tworzy wzajemne spotkania (mutual verification)
- Aktualizuje reputację obu użytkowników

### 4. UI w Frame

#### Menu główne:
- Dodano przycisk **"Generate Code"** (buttonIndex === 5)
- Dodano przycisk **"Enter Code"** (buttonIndex === 6)
- Leaderboard przesunięty na buttonIndex === 7

#### Strony:
- `/enter-code` - strona do wpisania kodu weryfikacyjnego
- `/verification-code/[id]` - strona wyświetlająca wygenerowany kod

### 5. Obrazy OG
- `/api/og/verification-code` - obraz dla wygenerowanego kodu
- `/api/og/enter-code` - obraz dla strony wpisywania kodu

---

## 🔄 Jak to działa:

### Generowanie kodu:
1. Użytkownik klika **"Generate Code"** w Frame
2. System generuje losowy 5-cyfrowy kod (np. `12345`)
3. Kod jest ważny przez 10 minut
4. Użytkownik otrzymuje kod do podania drugiej osobie

### Weryfikacja kodem:
1. Druga osoba klika **"Enter Code"** w Frame
2. Wpisuje otrzymany 5-cyfrowy kod
3. System sprawdza kod:
   - Czy istnieje
   - Czy nie wygasł
   - Czy nie został użyty
   - Czy nie próbuje zweryfikować siebie
4. Jeśli wszystko OK:
   - Tworzy dwa wzajemne spotkania (mutual verification)
   - Oznacza kod jako użyty
   - Aktualizuje reputację obu użytkowników
   - Przekierowuje do strony spotkania

---

## 📝 Aktualizacja bazy danych:

**WAŻNE:** Musisz zaktualizować schemat bazy danych!

```zsh
cd ~/.cursor-tutor/proof-of-meeting
npx prisma db push
```

To utworzy nową tabelę `VerificationCode` w bazie danych.

---

## ✅ Funkcje:

- ✅ Generowanie losowego 5-cyfrowego kodu
- ✅ Walidacja formatu kodu
- ✅ Wygaśnięcie kodu po 10 minutach
- ✅ Jednorazowe użycie kodu
- ✅ Zapobieganie samoweryfikacji
- ✅ Wzajemna weryfikacja (mutual verification)
- ✅ Aktualizacja reputacji
- ✅ Integracja z systemem spotkań
- ✅ UI w Frame i na stronie web

---

## 🎯 Użycie:

1. **Osoba A:** Generuje kod → podaje kod osobie B
2. **Osoba B:** Wpisuje kod w aplikacji → obie osoby są zweryfikowane!

---

**Funkcja gotowa do użycia!** ✅

