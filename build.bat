@echo off
mkdir dist
move /y *.min.js dist\
copy /y react.extensions.dom.module.js dist\react-extensions-dom-module.js
copy /y react.extensions.dom.module.js npm\index.js
pause