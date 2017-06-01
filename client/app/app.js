import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'oboe/dist/oboe-browser'
import ngOboe from 'angular-oboe/dist/angular-oboe'
import Common from './common/common';
import Components from './components/components';
import AppComponent from './app.component';
import $ from 'jquery'
import 'bootstrap-loader';

window.jQuery = $;

angular.module('app', [
    uiRouter,
    Common,
    Components,
    'ngOboe'
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
