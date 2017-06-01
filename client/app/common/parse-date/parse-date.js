import angular from 'angular';
import parseDateFilter from './parse-date.filter';

let parseDateModule = angular.module('parseDate', [])

.filter('parseDate', parseDateFilter)

.name;

export default parseDateModule;
