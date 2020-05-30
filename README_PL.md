# PortfolioStat Web

## Identyfikacja zagadnienia biznesowego

### Cel projektu

Głównym celem projektu jest stworzenie systemu pozwalającego na śledzenie transakcji fiatami jak i krypto walutami. System ten pozwoli użytkownikom na łatwe i wygodne gromadzenie danych o ich portfolio w jednym miejscu. Zgromadzone dane mogą posłużyć do analizy, a w skutek czego podejmowanie lepszych decyzji finansowych przez osoby korzystające z aplikacji. 

### Cele szczegółowe 

- wsparcie dla najpopularniejszych walut fiducjarnych i kryptowalut,
- umożliwienie przechowywania danych dotyczących transakcji, 
- możliwość wyświetlania historycznych danych, 
- prezentacja danych dotyczących portfela w sposób ułatwiający analizę

## Wymagania

### Techniczne

- aplikacja w architekturze klient-serwer,
- moduł kliencki dostępny poprzez przeglądarkę WWW w postacji SPA,
- komunikacja między serwerem, a klientem w wykorzystaniem RESTa,
- skalowalna i prosta w utrzymaniu baza danych zapewniająca autentykacje

### Funkcjonale

- możliwość tworzeni indywidualnego konta, 
- manualne dodawanie, usuwanie i modyfikowanie transakcji, 
- wyświetlanie historii transakcji, 
- prezentacja ogólnych danych portfolio na stronie głównej (wartość portfela, stosunek poszczególnych walut itp),
- przedstawienie danych statystycznych tranzakcji za pomocą wykresów (tranzakcje na lini czasowej itp), 
- synchronizacja z serwisami zapewniającymi informację o aktualnych kursach walut, 
- możliwość pobierania wykresów w postaci obrazków / PDFów 

## Harmonogram prac

 - [x] stworzenie bazy danych - 1h,
 - [x] stworzenie repozytoriów i podstawowych projektów - 1h,  
 - [x] dodanie autentykacji frontend - 3h,
 - [x] dodanie autentykacji backend - 3h,
 - [x] implementacja połączenia z bazą danych - 1h,
 - [x] stworzeniu REST API z CRUD dla modeli - 6h,
 - [x] znaleźienie i konfiguracja serwisów zapewniających dane o kursach walut - 3h,
 - [x] implementacja logiki dla danych analitycznych - 8h,
 - [x] dodawanie tranzakcji frontend - 4h
 - [x] wyświetlanie tranzakcji - 4h,
 - [x] prezentacja danych analitycznych frontend - 6h,
 - [x] generowanie PDFów - 3h

## Architektura

![Architecture](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/architecture.png)

## Authentication flow
![Authentication](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/auth.png)

## Classes 
![Classes](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/classes.png)

## Db relations
![db_relations](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/relations.png)

## Przepływ danych
![data_flow](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/dataflow.png)

> [Backend app](https://github.com/salat97/portfolio-stat-api)