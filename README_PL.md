# PortfolioStat Web

## Identyfikacja zagadnienia biznesowego

### Cel projektu

Głównym celem projektu jest stworzenie systemu pozwalającego na śledzenie transakcji fiatami jak i krypto walutami. System ten pozwoli użytkownikom na łatwe i wygodne gromadzenie danych o ich portfolio w jednym miejscu. Zgromadzone dane mogą posłużyć do analizy, a w skutek czego podejmowanie lepszych decyzji finansowych przez osoby korzystające z aplikacji.

### Cele szczegółowe

-   wsparcie dla najpopularniejszych walut fiducjarnych i kryptowalut,
-   umożliwienie przechowywania danych dotyczących transakcji,
-   możliwość wyświetlania historycznych danych,
-   prezentacja danych dotyczących portfela w sposób ułatwiający analizę

## Wymagania

### Techniczne

-   aplikacja w architekturze klient-serwer,
-   moduł kliencki dostępny poprzez przeglądarkę WWW w postacji SPA,
-   komunikacja między serwerem, a klientem w wykorzystaniem RESTa,
-   skalowalna i prosta w utrzymaniu baza danych zapewniająca autentykacje

### Funkcjonale

-   możliwość tworzeni indywidualnego konta,
-   manualne dodawanie, usuwanie i modyfikowanie transakcji,
-   wyświetlanie historii transakcji,
-   prezentacja ogólnych danych portfolio na stronie głównej (wartość portfela, stosunek poszczególnych walut itp),
-   przedstawienie danych statystycznych tranzakcji za pomocą wykresów (tranzakcje na lini czasowej itp),
-   synchronizacja z serwisami zapewniającymi informację o aktualnych kursach walut,
-   możliwość pobierania wykresów w postaci obrazków / PDFów

## Harmonogram prac

-   [x] stworzenie bazy danych - 1h,
-   [x] stworzenie repozytoriów i podstawowych projektów - 1h,
-   [x] dodanie autentykacji frontend - 3h,
-   [x] dodanie autentykacji backend - 3h,
-   [x] implementacja połączenia z bazą danych - 1h,
-   [x] stworzeniu REST API z CRUD dla modeli - 6h,
-   [x] znaleźienie i konfiguracja serwisów zapewniających dane o kursach walut - 3h,
-   [x] implementacja logiki dla danych analitycznych - 8h,
-   [x] dodawanie tranzakcji frontend - 4h
-   [x] wyświetlanie tranzakcji - 4h,
-   [x] prezentacja danych analitycznych frontend - 6h,
-   [x] generowanie PDFów - 3h

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

## Implementacja

### Autentykacja

Autentykacja użytkowniaka została rozwiązana z wykorzystaniem Firebase Auth oraz biblioteki [firebase/auth](https://www.npmjs.com/package/@firebase/auth).

**Rejestracja** polega na wypełnieniu odpowiedniego formularza (email i hasło). Gdy użytkownik wprowadzi poprawne dane zostaje stworzony w pierwrzej kolejności profil w bazie auth, a następnie w Firebase. Taka kolejność wykonywania operacji jest wymagana gdyż bez stworzonego profilu auth nie uzyskamy tokena wymaganego do weryfikacji zapytania do stat-profile-api.

    // RegisterContainer.tsx
    const  submitHandler  =  handleSubmit(async  ({  email,  password  })  =>  {
        try  {
    	    await  app.auth().createUserWithEmailAndPassword(email,  password);

    	    await  createUser({
    		    email,
    		    country:  '',
    		    gender:  '',
    		    name:  '',
    		    timezone:  Intl.DateTimeFormat().resolvedOptions().timeZone,
    		    username:  ''
    	    });

    	    push('/');
        }  catch (error) {
    	    setError(error.message);
        }
    });

**Weryfikowanie requestu** po stronie backendu rozwiązane zostało przy użyciu [firebase/admin](https://www.npmjs.com/package/firebase-admin). Mechanizm weryfikacji użytkownika został umieszczony w middlerze i polega na sprawdzeniu tokena z nagłówka każdego zapytania.

    // Auth.ts
    const  auth  =  (req:  Request,  res: Response,  next:  NextFunction)  =>  {
        if (req.headers.authtoken) {
    	    admin
    		    .auth()
    		    .verifyIdToken(req.headers.authtoken  as  string)
    		    .then(()  =>  {
    			    next();
    		    })
    		    .catch(()  =>  {
    			    res.status(403).send('Unauthorized');
    		    });
        }  else  {
    	    res.status(403).send('Unauthorized');
        }
    };

Firebase/admin pozwala także na pobieranie emaila użytkownika wysyłającego zapytanie. Funkcjonalność ta kwykorzystywana jest w kontrolerch których ścieżka zawiera `/me`

    // auth.ts
    export  const  getUserEmail  =  async  (req:  Request)  =>
	    admin
		    .auth()
		    .verifyIdToken(req.headers.authtoken as  string)
		    .then(user  =>  user.email);


**Autentykacja po stronie frontendu** polega na nasłuchiwaniu zmian stanu użytkownika za pomocą metody `onAuthStateChanged` z biblioteki firebase.

    // AuthContext.tsx
    ...
    useEffect(()  =>  {
    	app.auth().onAuthStateChanged(user  =>  {
    		if (authFlag) {
    			setAuthFalg(false);
    			setUser(user);
    		}
    	});
    }, [authFlag]);
    ...

Następnie zmiana ta zapisywana jest w stanie kontekstu, który może zostać użyty w innych komponentach.

**Ścieżki prywatne** - są to podstony do których dostęp ma tylko zalogowany użytkownik. Korzystają one z AuthContextu. W przypadku próby dostępu nie nie autentykowanego użytkownika zostanie wykonane przekierowanie na stronę logowania.

       // PrivateRoute.tsx
        ...
        useEffect(()  =>  {
        	if (!!user  &&  isUnAuthRoute) {
        		push('/');
        	}
        	if (!user) {
        		push('/login');
        	}
        }, []);
        ...

### Global store
Portfolio-stat-web wykorzystuje bibliotkę [MobX](https://mobx.js.org/README.html) oraz React Context do zarządzania globalnym stanem. Store poza przechowywaniem danych posiada także funkcje - akcje. Sore został podzielony zgodnie z przechowywanymi typami danych: analitic, currenncym opertion, transation i user.

    // StoreContext.tsx
    import store,  {  TStore  }  from  '../Mobx';
    
    export  const  StoreContext  =  createContext<TStore>({}  as  TStore);
    
    const  StoreProvider:  FC  =  ({  children  })  => (
	    <StoreContext.Provider  value={store}>{children}</StoreContext.Provider>
    );

	// useStore.tsx
	const  useStore  =  ()  =>  useContext(StoreContext);

### Aktualny stan portfolio

Dane analityczne prezentowane w aplikacji wyliczane są z wykorzystaniem aktualnych kursów walut. Dane te pobierane są za API serwisu [cryptocompare](https://www.cryptocompare.com/) przy pomocy [biblioteki](https://www.npmjs.com/package/cryptocompare) o tej samej nazwie. Biblioteka ta zapewnia aktualne jak i historyczne dane (w ograniczonej formie). 

Użytkownik może pobrać dane dotyczące aktualnego stanu portfolio w przeliczeniu na dowolną walutę: `/analitic/me/currencies/:currency`. Przykładowa odpowiedź dla USD:

      {
	      ADA:  {
		      raw: 200, // ilość waluty 
		      byCurr: 14.113999999999999, // wartość w przeliczeniu na USD
		      change: 8.802426214956723 // procentowa zmiana ceny - 24h
	      },
	      BTC:  {
		      raw: 1,
		      byCurr: 9539.16, 
		      change: 1.2079870152469503
	      }
	   }

Dane te wyliczne są w następujący sposób:

    app.get(`${basePath}/me/currencies/:currency`,  async  (req,  res)  =>  {   
		...
		
		// Pobieranie wszystkich tranzakcji użytkownika 
	    const  transactions  =  await  getTransactions(req);  
	    
	    ...
	    
	    // Pobieranie aktualnych kursów
	    const  pricesList  =  await  Promise.all(	    
		    currenciesHelper.map(		    
			    async  symbol  =>			    
			    (await  cryptocompare.price(symbol, [currency]))[currency]		    
		    )
	    );   
	     
	    ...
	    
	    // Pobieranie kursów z przed 24h
	    const  histPricesList  =  await  Promise.all(
		    currenciesHelper.map(	    
			    async  symbol  =>	    
				    (	    
					    await  cryptocompare.priceHistorical(	    
						    symbol,	    
						    [currency],	    
						    yesterday	    
					    )	    
				    )[currency]	    
		    )	    
	    );   
	      
	    ...    
	    
	    // Wyliczanie obecnej wartości oraz zmiany procentowej
	    for (let  symbol  in  currencies) {	    
		    currencies[symbol].byCurr  =  currencies[symbol].raw  *  prices[symbol];		    
		    currencies[symbol].change  =		    
			    100  *		    
			    ((prices[symbol] -  histPrices[symbol]) /		    
			    ((prices[symbol] +  histPrices[symbol]) /  2));	    
	    }    

	    res.json(currencies);	    
   	});    
	  

## Podsumowanie

Cel projektowy został osiągnięty. Została stworzona aplikacja pozwalająca na zapisywanie, śledzenie oraz analizowanie danych dotyczących portfolio. Nie napotkano trudności podczas realizacji.

### Kierunek rozwoju

Portfolio stat może zostać w przyszłości wzbogacony o większą ilość prezentowanych danych analitycznych skupiających np.: się na poszczególnych walutach itp. Dużą wartość przyniosła by także automatyzacja polegająca na importowaniu transakcji z poszczególnych giełd udostępniających odpowiednie API. Możliwa jest także zmiana przepływu wykorzystujących HTTP na WebSocket, co pozwoliło by na aktualizowanie danych w czasie rzeczywistym bez konieczności odświeżania całej strony.

> [Backend app](https://github.com/salat97/portfolio-stat-api)
