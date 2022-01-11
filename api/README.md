# Aplikacja - foodshare

## Opis tematu (zakres pracy): 
Temat pracy zakłada stworzenie systemu społecznościowego do udostępniania zdjęć potraw/posiłków/napojów wraz z ich opisem. 
Głównymi funkcjonalnościami użytkowników będą komentarze, udostępnianie postów, śledzenie innych użytkowników oraz ocenianie zdjęć.
System składać się będzie z aplikacji mobilnej wraz z częścią serwerową oraz bazą danych, która będzie zbierać informację o preferencjach użytkowników. 
Ponadto, system powinien umożliwiać analizę danych dotyczących zainteresowań konsumentów oraz proponować inne profile. 

## Informacje dodatkowe (np. literatura, narzędzia, wymagania itp.):
- React Native, React.js 
- Node.js, Hapi.js 
- Docker, system kontroli wersji GIT, Heroku
- baza danych MongoDB 
- JavaScript, TypeScript

## Jak uruchomić projekt
- Zainstalowany npm and nodemon (_npm install -g nodemon_)
- Zainstalowany Docker

### Uruchomienie projektu
```
cd /api
npm install
docker-compose up
nodemon app
```
W terminalu powinna ukazać się lista punktów końcowych wraz z informacją że serwer nasłuchuje na porcie 3000

### Testy
```
cd /api
npm test
```

### Uruchomienie aplikacji
Część kliencka napisana jest w technologi React-Native wymaga to posiadanie aktualnej wersji aplikacji, o wersje należy zapytać developera.
