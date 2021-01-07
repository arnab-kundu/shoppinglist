## Angular Introduction
### Install
 To install Angular globally in your system run `npm install -g @angular/cli` in CLI. This need to execute one time only in a system to install Angular.
### Create Project
To create new Angular project run this below commends.
```
ng new <your-app-name>
select css
next cd <your-app-name>
```
### Run Project
* Run `npm install` to install all node modules.
* To build project execute `ng build`
* To run project `ng serve`
* Then open http://localhost:4200 in browser.
* To run and access from other computer execute `ng serve --host=0.0.0.0 --disable-host-check`.
* To open from other computer or mobile open http://192.168.0.1:4200 in browser. Here `192.168.0.1` is  the IP address.
* _For development assistance with `ctrl` + `space` run this commend `npm install bootstrap --save`_.
```
`<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">`
```
* To create new component `ng generate component<your-component-name>`
* To create new service `ng g service <your-service-name>`


## Angular architecture
* 4 DataBinding
* Component
* Route 
    1. use app-route-outlate -> to use all route in that place   
    2. routerLink -> to stop page reload every time
    3. relative route (with / in front)/ absolute route (without / )
    4. define all the routes in root module then register them with  RouterModule.forRoot(ROUTES)s
    
**This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.**
    
### Development
* Run `ng serve` for a dev server. 
* Navigate to `http://localhost:4200/`. 
* The app will automatically reload if you change any of the source files.

### Code scaffolding
* Run `ng generate component component-name` to generate a new component. 
* You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 
* Use the `--prod` flag for a production build.

### Running unit tests
* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help
* To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
