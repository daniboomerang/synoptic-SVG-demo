/* loaderServices.js is called as soon as the angularApp is started.
It gets the information needed in order to initialise al the components of the app */

/* It retreives from the server the information needed by the modules monitor and dynamics
   Sets monitor configuration data by calling monitorConfigurationService providing it with all the iformation related
   to the synoptics, which for Demo-v2 is:
 	- Synoptic name.
   In future versions, when synoptics are created dynamically, the following info will be necessary  
 	- Synoptic SVG path (path to the image)
 	- Synoptic sensible data list (the list of image elements sensible to changes) (NOT USED YET); 	
   
   Sets dynamics configuration data by calling dynamicsConfigurationService providing it with all the information related
   to the dynamics, which for Demo-v2 is none.
   This is due to in Demo-v2, dynamics are hardcoded, not parsed dynamically.
   In future versions, the following information will be necessary: 
    - XML path to the description of the dynamics. */


'use strict';
			
// Define main module and inject all other modules as dependencies
var loader = angular.module('Loader',
  [
    'loaderControllers',
    'loaderServices',
    'monitorServices'
  ]
);