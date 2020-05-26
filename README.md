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
 - [ ] finding and configuring services providing data on currency rates - 3h,
 - [ ] implementation of logic for analytical data - 8h,
 - [x] frontend transactions form - 4h
 - [ ] displaying the transaction - 4h,
 - [ ] presentation of analytical data frontend - 6h

## Architecture

![enter image description here](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/architecture.png)

## Authentication flow
![enter image description here](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/auth.png)

## Classes 
![enter image description here](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/classes.png)

## Db relations
![enter image description here](https://raw.githubusercontent.com/salat97/portfolio-stat-web/master/static/relations.png)

> [Backend app](https://github.com/salat97/portfolio-stat-api)
