# DOMHtml for React

## React的插件，使用对象替代JSX来管理React元素。

### 功能

- 使用对象替代JSX，简洁而优雅。

### 使用方法：

- 引入ReactDOMHtml

  - 使用NPM安装：

    - ```shell
	  npm install react-extensions-dom
	  ```
	
	- ```javascript
	  import { reactDOM, rDOM } from react-extensions-dom;
	  ```

  - 直接引入模块：

    - 将react-extensions-dom-module.js复制到您的项目目录。

	- ```javascript
	  import { reactDOM, rDOM } from './react-extensions-dom-module';
	  ```

  - 不使用模块，直接从HTML引入：

	- ```html
	  <script src="react.extensions.dom.min.js"></script>
	  ```

- reactDOMHtml(object)或rDOM(object)。参数结构和JQueryDOM一致。

- 参数为数组时，将返回类似「\<\>\<div\>\</div\>\</\>」的结构。

- tag为字符串时，为HTML标签。tag为Function时，为React组件，使用方法和JSX保持一致。

- props使用attr对象传递，也可以使用单层对象。

- html为特殊的children，仅支持字符串。children支持字符串、对象、数组等任意类型，与JSX保持一致。

- 可使用class、for替代className、htmlFor。它们会被自动转换为className、htmlFor，因此在接收prop时必须使用className、htmlFor。

- 示例如下：

- ```javascript
  function Table({index}){
  	return rDOM({tag:`table`,id:`table${index}`,class:`table table${index}`,tr:[
  		{id:`tr`,class:`tr1`,td:[
  			`This is Table ${index}, tr 1, td 1`,
  			{id:`td2`,html:`This is tr 1, td 2`},
  			{id:`td3`,html:`This is tr 1, td 3`},
  		]},
  		{id:`tr2`,class:`tr2`,td:[
  			`This is Table ${index}, tr 2, td 1`,
  			{id:`td2`,html:`This is tr 2, td 2`},
  			{id:`td3`,html:`This is tr 2, td 3`},
  		]},
  	]});
  }
  
  function Test({id,className,children}){
  	const [count,setCount]=React.useState(0);
  	function handleClick(){
  		setCount(count+1);
  	}
  	return rDOM([
  		{tag:`h3`,id:id, class:className, html:`This is Test123, h3, ${children}`},
  		{tag:`h4`,id:id, class:className, html:`This is Test123, h4, ${children}`},
  		{tag:`h5`,id:id, class:className, html:children},
  		{tag:`button`,id:id, class:className, html:`${children} count: ${count}`, onClick:handleClick},
  		{tag:Test2,html:`This is ${children}, but controled by button. The count is: ${count}`},
  	]);
  }
  
  function Test2(props){
  	const [input,setInput]=React.useState(props.children);
  	function handleChange(val){
  		setInput(val);
  	}
  	return rDOM([
  		{tag:`h3`,...props},
  		{tag:`h4`,...props},
  		{tag:`h5`,...props},
  		{tag:`input`,value:input,onChange:e=>handleChange(e.target.value)},
  		{tag:`div`,html:`Input content: ${input}`},
  	]);
  }
  
  const root=ReactDOM.createRoot(document.getElementById('app'));
  root.render(rDOM({tag:`div`,id:`test`,class:`test`,children:[
  	{tag:`h1`,key:1,html:`Test1`},
  	{tag:`h2`,key:2,html:`Test2`,},
  	{tag:`br`},
  	{tag:`span`,html:`Test33333333333333333333`},
  	{tag:`br`},
  	{tag:`span`,html:`Test44444444444444444444`},
  	{tag:`hr`},
  	{tag:`div`,id:`div1`,class:`div div1`,html:`This is Div1.`,children:[
  		{tag:`div`,id:`div1.1`,class:`div div1.1`,html:`This is Div1.1.`,style:{backgroundColor:`#FF3366`}},
  		{tag:`div`,id:`div1.2`,class:`div div1.2`,html:`This is Div1.2.`},
  		{tag:`div`,id:`div1.3`,class:`div div1.3`,html:`This is Div1.3.`},
  		{tag:`button`,id:`button1.4`,class:`button button1.4`,html:`This is Button1.4.`,onClick:e=>console.log(e)},
  	]},
  	...(()=>{
  		let tableList=[];
  		for(let i=0; i<10; i++){
  			tableList.push({tag:Table,index:i});
  		}
  		return tableList;
  	})(),
  	{tag:Test,id:`Test123`,class:`Test123`,html:`Test 123456`},
  	{tag:Test,id:`Test123`,class:`Test123`,html:`Test 1234567890`},
  	{tag:Test2,id:`Test123`,class:`Test123`,html:`Test 789000`},
  ]}));
  ```

#### React官方文档中井字棋游戏的转制示例：

##### index.js

```javascript
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { rDOM } from 'react-extensions-dom';
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(rDOM(StrictMode,{children:[
	{tag:App},
]}));
```


##### App.js

```javascript
import { useState } from 'react';
import { Component } from 'react';
import { rDOM } from 'react-extensions-dom';

function Square({value,onSquareClick}){
	return rDOM(`button`,{class:`square`,html:value,onClick:onSquareClick});
}

export default function Game(){
	const [history, setHistory] = useState([Array(9).fill(null)]);
	const [currentMove, setCurrentMove] = useState(0);
	const xIsNext = currentMove % 2 === 0;
	const currentSquares = history[currentMove];

	function handlePlay(nextSquares){
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
		setHistory(nextHistory);
		setCurrentMove(nextHistory.length - 1);
	}

	function jumpTo(nextMove){
		setCurrentMove(nextMove);
	}

	const moves=history.map((squares, move)=>{
		let description;
		if (move > 0) {
			description = `Go to move #${move}`;
		} else {
			description = `Go to game start`;
		}
		return rDOM({tag:`li`,key:move,children:{tag:`button`,onClick:()=>jumpTo(move),html:description}});
	});

	return rDOM({tag:`div`,class:`game`,children:[
		{tag:`div`,class:`game-board`,children:[
			{tag:Board,xIsNext:xIsNext,squares:currentSquares,onPlay:handlePlay},
		]},
		{tag:`div`,class:`game-info`,children:[
			{tag:`ol`,children:moves},
		]},
	]});
}

function Board({xIsNext, squares, onPlay}) {
	function handleClick(i){
		if(squares[i] || calculateWinner(squares)) return;

		const nextSquares = squares.slice();
		if(xIsNext){
			nextSquares[i] = `X`;
		}else{
			nextSquares[i] = `O`;
		}
		onPlay(nextSquares);
	}
	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = 'Winner: ' + winner;
	} else {
		status = 'Next player: ' + (xIsNext ? 'X' : 'O');
	}
	return rDOM([
		{tag:`div`,class:`status`,html:status},
		{tag:`div`,class:`board-row`,children:[
			{tag:Square,value:squares[0],onSquareClick:()=>handleClick(0)},
			{tag:Square,value:squares[1],onSquareClick:()=>handleClick(1)},
			{tag:Square,value:squares[2],onSquareClick:()=>handleClick(2)},
		]},
		{tag:`div`,class:`board-row`,children:[
			{tag:Square,value:squares[3],onSquareClick:()=>handleClick(3)},
			{tag:Square,value:squares[4],onSquareClick:()=>handleClick(4)},
			{tag:Square,value:squares[5],onSquareClick:()=>handleClick(5)},
		]},
		{tag:`div`,class:`board-row`,children:[
			{tag:Square,value:squares[6],onSquareClick:()=>handleClick(6)},
			{tag:Square,value:squares[7],onSquareClick:()=>handleClick(7)},
			{tag:Square,value:squares[8],onSquareClick:()=>handleClick(8)},
		]},
	]);
}

function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
```