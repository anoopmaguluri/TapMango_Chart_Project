# Dashboard Chart App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.

## Prerequisites
Before setting up the project, ensure that the following tools are installed on your system:

  - Node.js: Version 18.19.1 or newer. Download it from the official Node.js website.
  
  - npm (Node Package Manager): Comes bundled with Node.js. Verify the installation by running `npm -v` in your terminal.
  
  - Angular CLI: Version 18. Install it globally using the following command:
  - `npm install -g @angular/cli@18.2.11`


## Development server

- Navigate to the project's root directory and run `npm install`.
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

To effectively test the application with various datasets, you can modify the `ngOnInit` method in `area-chart.component.ts` to sequentially fetch data from different services and update the chart accordingly. Here's how you can implement this: 

utilize the provided services designed for this purpose:
Data Services:
- getSteadyGrowthData(): Retrieves data representing steady growth patterns.
- getSeasonalFluctuationData(): Fetches data illustrating seasonal fluctuations.
- getCombinedData(): Provides a combination of different data patterns.
  
These services are implemented in the DataService class and can be invoked to obtain the respective datasets. By leveraging these services, you can seamlessly integrate and test different datasets within the application.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
