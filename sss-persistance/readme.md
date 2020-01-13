Notes on repo:
+ This repo was initially conceived as a Persistance repo... but soon became a database repo
+ Database was conceived but no-sql was finally implemented. So, language for requirements may involve tables, keys and that orientation. But, implementation may use language that deals with no-sql terminology like documents and collections
+ Initial role for database was to store sss records (for producing variants), user-info (for use in registration and login) and a renarration table
+ Renarration table has not been implemented as it was inferable through queries
+ There was an initial intention to use Mongo Cloud DB but subsequently a mongodb server was finalized
+ There is a webservice API interfacing the MongoDB to the SSS-Renderer, SSS-Maker components
+ The Webservice API is the interface through which the SSS-Framework components interact with database. The service needs to have mongodb running in the backend. The service automatically detects the database (if it is on and running). That is, no need to configure the webservice to talk to a db. The port numbers might be default and understood.
+ There is no validation and checking of the input SSS information or user information. Sanity checking of inputs was not done because of volatility of the structures. The structure definitions have been changing and we need to freeze them before we put in the validation checking code.
+ There is no flush / refresh type command for the db
+ When testing use postman to work with APIs
+ When testing run MongoDB server on local host, run Postman and use terminal on db to see if the changes are indeed happening.