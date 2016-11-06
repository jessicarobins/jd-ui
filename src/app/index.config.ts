export function config ($logProvider, $mdThemingProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);
  
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('cyan', {
      'default': '500'
    });
}
