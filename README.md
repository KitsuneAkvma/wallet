# Wallet

## Wstęp

### General

- Projekt działa na `node v18.16.0` (LTS) do stworzenia został użyty `vite react-swc template`.
- Pracujemy z tech stackiem `MERN` (`M`ongo-`E`xpress-`R`eact-`N`ode) + SWC

### Frontend

- Do stylowania wybrany został `css modules`, dodatkowo zainstalowano `modern-normalize`

### Backend

- Wybrana baza danych to `mongoDB` do tego dodamy `mongose`
- Dla serwera poza node i express dodałem `cors` i `colors`

### Team

- Do kontroli wersji używamy `Github`,
- Do planowania pracy `Jira`,
- Dla daily scrumów `zoom`,
- Ogólna komunikacja standardowo, za pomocą `slack`
  - Scrum Master: _`Dorota`_
  - Team Lead : _`Mateusz`_

## Getting Started

#

## Komendy

### Build strony:

```
npm run build
```

### Odpalenie strony

```
npm run dev
```

### Odpalenie serwera

```
npm run server:dev
```

### Eslint (dodatkowe)

```
npm run lint
```

#

## Workflow

### Obrazy i svg

Obrazy, svg i wszystko tego typu ląduje w folderze `public`.

- Dla przypomnienia, bo wiem że można się pogubić: Jeżeli jesteśmy np w
  `src/components/navigation/navigation.jsx` i chcemy wziąć logo `logo.svg` to path będzie wyglądał
  tak : `/svg/logo.svg`

### Komponenty

Dla przykładu: Pracujesz nad komponentem-stroną `Dashboard` na który składa się kilka komponentów.
Struktura plików powinna wyglądać następująco:

```
/src
  /components
    /General/
    /Dashboard
      Statistics.jsx
      Statistics.module.css
      Diagram.jsx
      Diagram.module.css
      History.jsx
      ...
    /
    /Login/
    /Register/
    ...
  /
  /pages
  Dashboard.jsx
  Dashboard.module.css
  Login.jsx
  Login.module.css
  ....
  /
  /router/
  ...
/
```

- Strony służą do złożenia komponentów w całość tak więc strona `Dashboard` może wyglądać w ten
  sposób:

```
import React from 'react'

export const Dashboard = () => {
return (
  <>
    <Statistics />
    <Diagram />
    <History />
  </>
)
}

```

- Komponenty grupujemy wg tego gdzie są użyte. Komponenty używane w wielu miejscach lądują do
  `_General` tj. komponenty typu: `footer`, `navbar` etc.
