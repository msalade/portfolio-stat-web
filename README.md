# PortfolioStat

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
 - [x] dodanie autoryzacji frontend - 3h,
 - [ ] dodanie autoryzacji backend - 3h,
 - [ ] implementacja połączenia z bazą danych - 1h,
 - [ ] stworzeniu REST API z CRUD dla modeli - 6h,
 - [ ] znaleźienie i konfiguracja serwisów zapewniających dane o kursach walut - 3h,
 - [ ] implementacja logiki dla danych analitycznych - 8h,
 - [ ] dodawanie tranzakcji frontend - 4h
 - [ ] wyświetlanie tranzakcji - 4h,
 - [ ] prezentacja danych analitycznych frontend - 6h
