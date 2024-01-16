const fs=require(`fs`);
const UglifyJS = require(`uglify-js`);

String.prototype.replaceAll=function(org,tgt){
	return this.split(org).join(tgt);
}

//创建文件夹
try{
	fs.mkdirSync(`dist`);
	fs.mkdirSync(`npm`);
}catch(e){}

// 读取VERSION.md获取版本号
let versionMd=fs.readFileSync(`VERSION.md`,`utf-8`);
let versionSplit=versionMd.split(`\n`);
let version=``;
for(let v of versionSplit){
	if(v.includes(`Version: `)){
		version=v.split(` `)[2];
		break;
	}
}
console.log(`Build version: ${version}`);
// 读取npm/package.json
let packageData={};
try{
	packageData=JSON.parse(fs.readFileSync(`npm/package.json`,`utf-8`));
}catch(e){}
if(version == packageData.version){
	console.warn(`Version ${version} is same as package.json!`);
}


// 压缩非模块脚本
const uglifyList=[
	`jquery.extensions.dom`,
	`html.dom`,
	`vue.extensions.dom`,
	`react.extensions.dom`,
]
for(let s of uglifyList){
	try{
		let origin=fs.readFileSync(`${s}.js`,`utf-8`);
		let target=UglifyJS.minify(origin);
		if (target.error) {
			console.error(`Error in minifying JS file: ${target.error}`);
		} else {
			fs.writeFileSync(`dist/${s}.min.js`, target.code, {encoding:`utf-8`});
			console.log(`Compression ${s} completed successfully!`);
		}
	}catch(e){
		console.error(`An error occurred while compressing the JS file: ${e}`);
	}
}

// 处理模块脚本
const moduleOriginTag=`/* --- FOR MODULE --- */`;
const moduleTargetTag=`/* MODULE INSERT */`;
const moduleList=[
	{origin:`react.extensions.dom`,target:`react.extensions.dom.module`,output:`react-extensions-dom-module`},
]
for(let m of moduleList){
	try{
		let origin=fs.readFileSync(`${m.origin}.js`,`utf-8`);
		let target=fs.readFileSync(`${m.target}.m`,`utf-8`);
		let originCode=origin.split(moduleOriginTag)[1];
		let targetCode=target.replaceAll(moduleTargetTag, originCode).trim();
		fs.writeFileSync(`dist/${m.output}.js`, targetCode, {encoding:`utf-8`});
		fs.writeFileSync(`npm/index.js`, targetCode, {encoding:`utf-8`});
		console.log(`Output module ${m.output} completed successfully!`);
	}catch(e){
		console.error(`An error occurred while output the JS module file: ${e}`);
	}
}

// 创建NPM包
// 创建package.json
const packageJson={
	name: `react-extensions-dom`,
	version: version,
	description: `A plugin for React, use object instead of JSX to manage React elements.`,
	main: `index.js`,
	keywords:[`react`,`extensions`,`dom`,`jsx`],
	scripts: {
		test: `echo "Error: no test specified" && exit 1`,
	},
	repository: {
		type: `git`,
		url: `git+https://github.com/road0001/JQueryDOM.git`,
	},
	author: ``,
	license: `MIT`,
	bugs: {
		url: `https://github.com/road0001/JQueryDOM/issues`,
	},
	homepage: `https://github.com/road0001/JQueryDOM#readme`,
}
// 写入package.json
try{
	fs.writeFileSync(`npm/package.json`, JSON.stringify(packageJson, null, `\t`), {encoding:`utf-8`});
	console.log(`Output package.json completed successfully!`);
}catch(e){
	console.error(`An error occurred while output the package.json file: ${e}`);
}
// 复制README.react.md
try {
    fs.copyFileSync(`README.react.md`, `npm/README.md`);
    console.log(`Copy README.react.md completed successfully!`);
} catch (err) {
    console.error(`An error occurred while copy the README.react.md file: ${e}`);
}
console.log(`Build completed!`);