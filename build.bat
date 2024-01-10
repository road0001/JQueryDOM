@echo off
mkdir dist
move /y *.min.js dist\
copy /y react.extensions.dom.module.js dist\
pause