'use strict';
var __env = window.__env || {};
var translations = window.translations || {};

// Declare app level module which depends on views, and components
var htAdmin = angular.module('htAdmin', [
	'ngSanitize',
	'pascalprecht.translate',
	'ngCookies',
	'ui.router',
	'ui.bootstrap',
	'ui.select'
]);
//config environment
htAdmin.constant('__env',__env);

//config language
htAdmin.config(function ($translateProvider, __env) {
	// add translation table
	var lang = __env.language;
	$translateProvider.useSanitizeValueStrategy('sanitize');
	$translateProvider.translations(lang, translations[lang]);
	$translateProvider.preferredLanguage(lang);
});
