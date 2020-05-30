# PortfolioStat Web

## Identification of the business issue

### Project purpose

The main goal of the project is to create a system that allows to track fiat and currency transactions. This system will allow users to easily and conveniently collect data about their portfolio in one place. The collected data can be used for analysis and, as a result, for making better financial decisions by the users of the application. 

### Specific objectives 

- support for the most popular fiduciary and crypto currencies,
- to enable the storage of transaction data, 
- possibility of displaying historical data, 
- presentation of portfolio data in a way that facilitates analysis

### Technical

- application in client-server architecture,
- client module available through a web browser in the SPA station,
- communication between the server and the customer using REST,
- scalable and easy-to-maintain database with authentication

### Functional 

- possibility to create an individual account, 
- manually add, delete and modify transactions, 
- displaying transaction history, 
- presentation of general portfolio data on the home page (value of the portfolio, ratio of individual currencies, etc.),
- presentation of statistical data of transactions by means of charts (time line transactions, etc.), 
- synchronization with services providing information on current currency rates, 
- possibility of downloading charts in the form of images / PDFs 

## Work schedule

 - [x] creating a database - 1h,
 - [x] creating repositories and basic projects - 1h,  
 - [x] adding the frontend authentication - 3h,
 - [x] adding a backend authentication - 3h,
 - [x] implementation of database connection - 1h,
 - [x] creating a REST API with CRUD for models - 6h,
 - [x] finding and configuring services providing data on currency rates - 3h,
 - [x] implementation of logic for analytical data - 8h,
 - [x] frontend transactions form - 4h
 - [x] displaying the transaction - 4h,
 - [x] presentation of analytical data frontend - 6h,
 - [x] PDF generation - 3h

## Architecture

![Architecture](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/architecture.png)

## Authentication flow
![Authentication](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/auth.png)

## Classes 
![Classes](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/classes.png)

## Db relations
![db_relations](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/relations.png)

## Data flow
![data_flow](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/dataflow.png)

## Implementation

### Authentication

User authentication was solved using Firebase Auth and the library [firebase/auth](https://www.npmjs.com/package/@firebase/auth).

**Registration** consists of filling in the appropriate form (email and password). When the user enters the correct data, a profile is first created in the auth database, and then in Firebase. This order of operations is required because without the created auth profile we will not get the token required to verify the request to stat-profile-api.

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

**The request verification** on the backend side has been resolved using [firebase/admin](https://www.npmjs.com/package/firebase-admin). The user verification mechanism was placed in the Express middleware and consists of checking the token from the header of each request.

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

Firebase/admin also allows you to get the email of the user sending the query. This feature is used in controllers whose path contains `/me`.

    // auth.ts
    export  const  getUserEmail  =  async  (req:  Request)  =>
	    admin
		    .auth()
		    .verifyIdToken(req.headers.authtoken as  string)
		    .then(user  =>  user.email);


**Frontend automation** is about listening to user status changes using the `onAuthStateChanged` method from the firebase library.

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

This change is then saved in a context state that can be used in other components.

**Private routes**- these are sub-pages that only the logged-in user has access to. They use AuthContextu. If an attempt is made to access a non-authenticated user, a redirection to the login page will be made.

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
The portfolio-stat-web uses the library [MobX](https://mobx.js.org/README.html) and React Context to manage the global state. In addition to storing data, the store also has functions - actions. Sore is divided according to the types of stored data: analitic, currenncym opertion, transation and user.

    // StoreContext.tsx
    import store,  {  TStore  }  from  '../Mobx';
    
    export  const  StoreContext  =  createContext<TStore>({}  as  TStore);
    
    const  StoreProvider:  FC  =  ({  children  })  => (
	    <StoreContext.Provider  value={store}>{children}</StoreContext.Provider>
    );

	// useStore.tsx
	const  useStore  =  ()  =>  useContext(StoreContext);

### Current portfolio status

Analytical data presented in the application are calculated using current exchange rates. These data are fetch from the [cryptocompare](https://www.cryptocompare.com/) API using the [library](https://www.npmjs.com/package/cryptocompare) of the same name. This library provides both current and historical data (in a limited form). 

The user can download data on the current status of the portfolio in any currency: `/analitic/me/currencies/:currency`. Example answer for USD:

      {
	      ADA:  {
		      raw: 200, // amount of currency  
		      byCurr: 14.113999999999999, // value in USD
		      change: 8.802426214956723  // percentage change in price - 24 hours
	      },
	      BTC:  {
		      raw: 1,
		      byCurr: 9539.16, 
		      change: 1.2079870152469503
	      }
	   }

These data are calculated as follows:

    app.get(`${basePath}/me/currencies/:currency`,  async  (req,  res)  =>  {   
		...
		
		// Downloading all user transactions 
	    const  transactions  =  await  getTransactions(req);  
	    
	    ...
	    
	    // Downloading current rates
	    const  pricesList  =  await  Promise.all(	    
		    currenciesHelper.map(		    
			    async  symbol  =>			    
			    (await  cryptocompare.price(symbol, [currency]))[currency]		    
		    )
	    );   
	     
	    ...
	    
	    // Getting rates from before 24 hours
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
	    
	    // Calculation of present value and percentage change
	    for (let  symbol  in  currencies) {	    
		    currencies[symbol].byCurr  =  currencies[symbol].raw  *  prices[symbol];		    
		    currencies[symbol].change  =		    
			    100  *		    
			    ((prices[symbol] -  histPrices[symbol]) /		    
			    ((prices[symbol] +  histPrices[symbol]) /  2));	    
	    }    

	    res.json(currencies);	    
   	});    
	  

## Summary

The project objective has been achieved. An application has been created that allows for saving, tracking and analyzing portfolio data. No difficulties were encountered during implementation.

### Direction of development 
In the future, the stat portfolio may be enriched with a larger amount of presented analytical data focusing e.g. on particular currencies, etc. Automation consisting in importing transactions from particular stock exchanges providing access to appropriate APIs would also bring great value. It is also possible to change the data flow from HTTP to WebSocket, which would allow to update the data in real time without having to refresh the whole page.

> [Backend app](https://github.com/salat97/portfolio-stat-api)
