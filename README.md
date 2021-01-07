# shoppinglist
MEAN Stack(MySQL, Express, Angular, Node)

# Installation guide for Angular
npm install -g @angular/cli  	-->install angular globally in your system

ng new <your-app-name>    	--> create new anguler project
select css
next cd <your-app-name>	-->go inside project folder

ng build 			--> to build project

ng serve 			--> to run the project and start project on localhost:4200 port
ng serve --host=0.0.0.0 --disable-host-check 	-> to run and access from other computer

after complied successfully
open in chrome		--> localhost:4200 

npm install bootstrap --save //For development assistance with ctrl+space
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">

ng generate component <your-component-name> ->to create new component

ng g service <your-service-name> -> to create new service

# Angular information
4 Databinding
============
Component
=========

route
=====
1.use app-route-outlate -> to use all route in that place
2.routerLink -> to stop page reload every time
3.relative route (with / in front)/ absolute route (without / )
4.define all the routes in root module then register them with  RouterModule.forRoot(ROUTES)

# Installation guide for node

npm install -> to install all node modules in package.json
npm start -> to start server on localhost:3000 port

### Language vs IDE
| Language  | jetbrains IDE |Other IDE(Free)|
|-----------|---------------|---------------|
| JAVA      | intellij idea | eclipse       |
| Ruby      | rubymine 	    | sublime       |
| Angular   | webstorm 	    | atom          |
| Php       | phpstorm 	    | netbeans      |
| Python	  | pycharm 		  | jupyter       |
| iOS       | appcode 		  | xcode         |
| mysql     | datagrip 		  |mysql workbench|
| mongodb	  | datagrip	    | mongodb       |
| Postgres	| datagrip	    | pgAdmin       |
| C / C++   | Clion 		    | Visual Studio for C ++|
| .Net	    | rider 		    | visual studio |
| GoLang	  | goland 		    | vscode        |
