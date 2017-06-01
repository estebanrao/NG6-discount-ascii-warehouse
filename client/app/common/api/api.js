import angular from 'angular';
import ApiFactory from './api.factory';

let apiModule = angular.module('api', [])

.factory('Api', ApiFactory)

.name;

export default apiModule;
