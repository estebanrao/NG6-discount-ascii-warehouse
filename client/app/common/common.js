import angular from 'angular';
import Api from './api/api';
import parseDate from './parse-date/parse-date';

let commonModule = angular.module('app.common', [
  Api,
  parseDate
])

.name;

export default commonModule;
