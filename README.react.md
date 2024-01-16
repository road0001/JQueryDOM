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
    

#### 调用和参数

- reactDOMHtml(dom_tag, dom_attr, dom_html, dom_html_after)或rDOM(dom_tag, dom_attr, dom_html, dom_html_after)，返回React.createElement对象。

  - ```javascript
    return reactDOMHtml(`div`,
        {
            id:`div`,
            class:`div`,
            style:{
                backgroundColor:`#000`
            }
        },
        `This is a DIV.`
    );
    //<div id="div" className="div" style={backgroundColor:`#000`}>This is a DIV.</div>
    ```

- 在dom_attr中，html字段的优先级大于dom_html参数。

  - ```javascript
    return reactDOMHtml(`div`,
        {
            id:`div`,
            class:`div`,style:{
                backgroundColor:`#000`
            },
            html:`This is a DIV.`
        },`This is a DIV 111.`);
    //<div id="div" className="div" style={{backgroundColor:`#000`}}>This is a DIV.</div>
    ```

- dom_tag参数为对象时，将使用对象中的tag、attr、html构建，dom_attr、dom_html、dom_html_after参数将被忽略。

  - ```javascript
    return reactDOMHtml({
        tag:`div`,attr:{
            id:`div1`,class:`div1`
        },html:`This is DIV1.`
    });
    //<div id="div1" className="div1">This is a DIV1.</div>
    ```

- dom_tag参数为对象时，可省略attr，在同一对象层中写tag、attribute、html，更加简洁易读，因此推荐这种写法。

  - 注意：单层对象写法中，tag、attr为保留字。如果需要使用tag、attr，须更换成tagName、attrName（大小写敏感）。

  - 如果需要使用tagName、attrName，须写成tag_name、attr_name，会被自动转换。

  - ```javascript
    return reactDOMHtml({
        tag:`div`,
        tag_name:`tagName`,
        id:`div1`,class:`div1`,
        html:`This is DIV1.`
    });
    //<div id="div1" tagName="tagName" className="div1">This is a DIV1.</div>
    ```

- dom_tag或tag为字符串时，为HTML标签。tag为Function时，为React组件，使用方法和JSX保持一致。

  - ```javascript
    return reactDOMHtml({
        tag:Component1,id:`com1`,class:`com1`,html:`Component1`
    });
    //<Component1 id="com1" className="com1">Component1</Component1>
    ```

- dom_attr为字符串时，将返回html字符串。

  - ```javascript
    return reactDOMHtml(`div`,`This is a DIV.`);
    //<div>This is a DIV.</div>
    ```

- props使用attr对象传递，也可以使用单层对象。

- html、html_after（对象中为htmlAfter）为特殊的children，仅支持字符串。children支持字符串、对象、数组等任意类型，与JSX保持一致。

  - html永远在children之前，html_after永远在children之后。

- dom_tag参数为数组时，将返回JSX中类似「\<\>\<Component1\>\</Component1\>\<Component2\>\</Component2\>...\</\>」的结构，每个元素的结构和上述对象保持一致，dom_attr、dom_html、dom_html_after参数将被忽略。

  - ```javascript
    return reactDOMHtml([
        {tag:`div`,id:`div1`,class:`div1`,html:`This is DIV1.`},
        {tag:`div`,id:`div2`,class:`div2`,html:`This is DIV2.`},
        {tag:`div`,id:`div3`,class:`div3`,html:`This is DIV3.`},
    ]);
    /*
    <>
        <div id="div1" className="div1">This is DIV1.</div>
        <div id="div2" className="div2">This is DIV2.</div>
        <div id="div3" className="div3">This is DIV3.</div>
    </>
    */
    ```

- 可使用class、for替代className、htmlFor。它们会被自动转换为className、htmlFor，因此在传递prop时必须使用className、htmlFor。

#### 使用数组或对象传递class

- 使用数组传递class

  - 数组中的class会按顺序依次添加到元素的class中。

  - ```javascript
    return reactDOMHtml({
        tag:`div`,id:`div`,
        class:[`div1`,`div2`],
        html:`This is a DIV.`
    });
    //<div id="div" className="div1 div2">This is a DIV.</div>
    ```

- 使用对象传递class

  - class对象中key对应的value为true时，才会将此key添加到元素的class中。

  - ```javascript
    return reactDOMHtml({
        tag:`div`,id:`div`,
        class:{
            div1:true, 
            div2:false, 
            div3:true
        },html:`This is a DIV.`
    });
    //<div id="div" className="div1 div3">This is a DIV.</div>
    ```

#### CSS样式

- 使用JSX标准的CSS格式。

- ```javascript
  return reactDOMHtml({
      tag:`div`,
      id:`div`,
      class:[`div`,`div2`],
      style:{
          backgrundColor:`#FFF`,
          opacity:0,
      },
      html:`This is a DIV.`
  });
  //<div id="div" className="div div2" style={{backgrundColor:`#FFF`,opacity:0,}}>This is a DIV.</div>
  ```

#### 子元素

- 可以在一个元素中直接插入多个子元素，并且支持多层子元素。

- 如果children为对象，则为单一子元素。如果children为数组，则为多个子元素。

- 子元素的tag、attr、html分别对应dom_tag、dom_attr、dom_html，同样支持上述单层对象写法。

  - ```javascript
    return reactDOMHtml({
        tag:`div`,
        id:`div`,
        class:[`div`,`div2`],
        html:`This is a DIV.`
        children:[
            {
                tag:`div`,
                id:`div_child_1`,
                class:[`div`, `div_child`],
                html:`This is a child DIV.`,
                children:{
                    tag:`div`,
                    id:`div_grandson`,
                    class:[`div`,`div_child`,`div_grandson`],
                    html:`This is a grandson DIV.`,
                },
            },
            {
                tag:`div`,
                attr:{
                    id:`div_child_2`,class:[`div`,`div_child`],
                    html:`This is a child DIV.`
                },
            }
        ],
    });
    /*
    <div id="div" className="div div2">
        This is a DIV.
        <div id="div_child_1" className="div div_child">
            This is a child DIV.
            <div id="div_grandson" className="div div_child div_grandson">
                This is a grandson DIV.
            </div>
        </div>
        <div id="div_child_2" className="div div_child">
            This is a child DIV.
        </div>
    </div>
    */
    ```

#### 表格元素

- 表格元素拥有特殊的语法，顶层使用tbody或tr取代children，tr中使用td取代children，并且可省略tag。

- 表格只建议使用单层对象写法。

- 可用tbody替代tr。

  - ```javascript
    return reactDOMHtml({
        tag:`table`,
        id:`testTable`,class:`testTable`,tr:[
            {id:`tr1`,class:`tr1`,td:[
                {id:`td1`,class:`td1`,html:`test td 1`},
                {id:`td2`,class:`td2`,html:`test td 2`},
                {html:`test td 3`},
                `test td 4`,
            ]},
            {td:[
                {id:`td1`,class:`td1`,html:`test td 31`},
                {id:`td2`,class:`td2`,html:`test td 32`},
                {html:`test td 33`},
                `test td 34`,
            ]},
        ],
    });
    /*
    <table id="testTable" className="testTable">
        <tbody>
            <tr id="tr1" className="tr1">
                <td id="td1" className="td1">test td 1</td>
                <td id="td2" className="td2">test td 2</td>
                <td>test td 3</td>
                <td>test td 4</td>
            </tr>
            <tr>
                <td id="td1" className="td1">test td 31</td>
                <td id="td2" className="td2">test td 32</td>
                <td>test td 33</td>
                <td>test td 34</td>
            </tr>
        </tbody>
    </table>
    */
    ```

- 注意：td内的元素隐含tag为td，因此不可使用其他tag取代。td内元素应写为如下形式：

  - ```javascript
    return reactDOMHtml({
        tag:`table`,
        id:`testTable`,class:`testTable`,tr:[
            {id:`tr1`,class:`tr1`,td:[
                {id:`td1`,class:`td1`,children:[
                    {tag:`div`,id:`tdiv1`,class:`tdiv1`,html:`test td div`},
              ]},
                {html:`test td 2`},
                {html:`test td 3`},
                `test td 4`,
            ]},
            {td:[
                {id:`td1`,class:`td1`,html:`test td 31`},
                {id:`td2`,class:`td2`,html:`test td 32`},
                {html:`test td 33`},
                `test td 34`,
            ]},
        ],
    });
    /*
    <table id="testTable" className="testTable">
        <tbody>
            <tr id="tr1" className="tr1">
                <td id="td1" clasclassNames="td1">
                    <div id="tdiv1" className="tdiv1">test td div</div>
                </td>
                <td>test td 2</td>
                <td>test td 3</td>
                <td>test td 4</td>
            </tr>
            <tr>
                <td id="td1" className="td1">test td 31</td>
                <td id="td2" className="td2">test td 32</td>
                <td>test td 33</td>
                <td>test td 34</td>
            </tr>
        </tbody>
    </table>
    */
    ```

### 写法和示例

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

#### React官方文档中井字棋游戏的转制示例

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