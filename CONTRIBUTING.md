
##Set Envioriments
 1. Install nodejs
 2. execute: `npm install -g typescript karma-cli protector`
 3. execute: `npm install`
 4. execute: `gulp dev` for watch, build and test files

##For sublimetext3, install this plugin
`https://github.com/Microsoft/TypeScript-Sublime-Plugin`

##For new library dependency, include related declaration type d.ts
Use (`tsd`)[https://github.com/DefinitelyTyped/tsd] tool and save install in ./tsd.json 

##Sulbime-build
Create file in Tools > BuildSystem > New Build System. Shell_cmd value should be `gulp build`