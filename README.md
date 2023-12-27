# JQueryDOM
## JQuery的插件，使用对象来管理DOM。

### 功能
- 优化JQuery增删改查DOM的体验。
- 使用对象代替HTML字符串来生成HTML DOM对象。

### 使用方法
#### 获取DOM字符串

- 注意：这是简单的获取DOM字符串，无法获取子元素。

- ```javascript
  $.getDOMString(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  ```

#### 获取JQueryDOM对象

- ```javascript
  $.getDOMObject(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  ```

#### 获取JQueryDOM HTML

- ```javascript
  $.getDOMHtml(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  $.getHtml(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  ```


#### 插入元素

- 语法与JQuery相同，只是在append、prepend、before、after、html后面添加“DOM”。下面仅使用appendDOM作为示例。

- ```javascript
  $(`body`).appendDOM(dom_tag, dom_attr, dom_html);
  $(`body`).prependDOM(dom_tag, dom_attr, dom_html);
  $(`body`).beforeDOM(dom_tag, dom_attr, dom_html);
  $(`body`).afterDOM(dom_tag, dom_attr, dom_html);
  $(`body`).htmlDOM(dom_tag, dom_attr, dom_html);
  // 示例：
  $(`body`).appendDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  $(`body`).prependDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  $(`body`).beforeDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  $(`body`).afterDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  $(`body`).htmlDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
  ```

- 使用数组传递class

  - ```javascript
    $(`body`).appendDOM(`div`,{id:`div`,class:[`div1`,`div2`]}, `This is a DIV.`);
    ```

#### 事件绑定

- ```javascript
  $(`body`).appendDOM(`div`,{
  id:`div`,class:`div`,html:`This is a DIV.`
  bind:{
  	click:{
  		function(e){
  			console.log(`click`,e);
  		}
  	},
  	dblclick:{
  		function(e){
  			console.log(`dblclick`,e);
  		}
  	},
  }
  });
  ```

- 上述事件绑定可简写为如下形式：

  - ```javascript
    $(`body`).appendDOM(`div`,{
    	id:`div`,class:[`div`,`div2`],
    	bind:{
    		click(e){
    			console.log(`click`,e);
    		}
    		dblclick(e){
    			console.log(`dblclick`,e);
    		}
    	}
    },`This is a DIV.`);
    ```

- 事件绑定中传递数据：

  - ```javascript
    $(`body`).appendDOM(`div`,{
        id:`div`,class:`div`,html:`This is a DIV.`
        bind:{
        	click:{
        		data:{index:1},
    			function(e){
    				console.log(e.data.index);
    			}
             }
        }
    });
    ```

#### CSS样式

- 使用JQuery标准的CSS格式。

- ```javascript
  $(`body`).appendDOM(`div`,{
      id:`div`,class:[`div`,`div2`],
      style:{
          backgrundColor:`#FFF`,
          opacity:0,
      }
  },`This is a DIV.`);
  ```

#### 高级用法

##### 子元素

- 可以在一个元素中直接插入多个子元素，并且支持多层子元素。同时也可以直接在子元素中绑定事件、CSS。

- 子元素的tag、attr、html分别对应dom_tag、dom_attr、dom_html。

- ```javascript
  $(`body`).appendDOM(`div`,{
      id:`div`,class:[`div`,`div2`],
      children:[
          {
              tag:`div`,
              attr:{
                  id:`div_child_1`,class:[`div`,`div_child`],
                  children:{
                      tag:`div`,
                      attr:{
                          id:`div_grandson`,class:[`div`,`div_child`,`div_grandson`]
                      },
                      html:`This is a grandson DIV.`
                  }
              },
              html:`This is a child DIV.`
          },
          {
              tag:`div`,
              attr:{
                  id:`div_child_2`,class:[`div`,`div_child`],
                  html:`This is a child DIV.`
              },
          }
      ]
  },`This is a DIV.`);
  ```

##### 表格元素

- 表格元素拥有特殊的语法，顶层使用tbody或tr取代children，tr中使用td取代children，并且可省略tag。

- ```javascript
  $(`body`).appendDOM(`table`,{
      id:`testTable`,class:`testTable`,tbody:[
          {attr:{id:`tr1`,class:`tr1`},td:[
              {attr:{id:`td1`,class:`td1`,html:`test td 1`}},
              {attr:{id:`td2`,class:`td2`},html:`test td 2`},
              {html:`test td 3`},
              `test td 4`,
          ]},
          {td:[
              {attr:{id:`td1`,class:`td1`,html:`test td 31`}},
              {attr:{id:`td2`,class:`td2`},html:`test td 32`},
              {html:`test td 33`},
              `test td 34`,
          ]},
      ],
  });
  ```
  
- 注意：td内的元素隐含tag为td，因此不可使用其他tag取代。td内元素应写为如下形式：

- ```javascript
  $(`body`).appendDOM(`table`,{
      id:`testTable`,class:`testTable`,tbody:[
          {attr:{id:`tr1`,class:`tr1`},td:[
              {attr:{id:`td1`,class:`td1`,children:[
				{attr:{id:`tdiv1`,class:`tdiv1`},html:`test td div`},
			  ]}},
              {attr:{},html:`test td 2`},
              {html:`test td 3`},
              `test td 4`,
          ]},
          {td:[
              {attr:{id:`td1`,class:`td1`,html:`test td 31`}},
              {attr:{id:`td2`,class:`td2`},html:`test td 32`},
              {html:`test td 33`},
              `test td 34`,
          ]},
      ],
  });
  ```

- 可用tr替代tbody。

- 支持单层对象写法。

  - ```javascript
  	$(`body`).appendDOM(`table`,{
  	    id:`testTable`,class:`testTable`,tr:[
  	        {id:`tr1`,class:`tr1`,td:[
  	            {id:`td1`,class:`td1`,html:`test td 1`},
  	            {children:[
					{id:`tdiv1`,class:`tdiv1`,html:`test td div`},
				]},
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
  	// 对象参数写法：
  	$(`body`).appendDOM({
  	    tag:`table`,id:`testTable`,class:`testTable`,tr:[
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

##### 在attributes中使用html字段取代dom_html参数显示文本

- 注意：attributes中html字段的优先级大于dom_html参数。

  - ```javascript
    $(`body`).appendDOM(`div`,{
        id:`div`,class:[`div`,`div2`],
        html:`This is a DIV.`,
        children:{
            tag:`div`,
            attr:{
                id:`div_child_1`,class:[`div`,`div_child`],
                html:`This is a child DIV.`
            }
        }
    });
    ```


##### 插入没有attributes的元素

- ```javascript
  $(`body`).appendDOM(`div`,`This is a DIV.`);
  ```

##### 使用对象参数插入元素

- 为appendDOM传递元素对象，替代dom_tag、dom_attr、dom_html参数。

- ```javascript
  $(`body`).appendDOM({
      tag:`div`,
      attr:{
          id:`div`,class:[`div`,`div2`],
          html:`This is a DIV.`,
          children:{
              tag:`div`,
              attr:{
                  id:`div_child_1`,class:[`div`,`div_child`],
                  html:`This is a child DIV.`
              }
          }
      }
  });
  ```

##### 批量插入多个元素

- 为appendDOM传递包含元素对象的数组，即可批量插入多个元素。

- ```javascript
  $(`body`).appendDOM([
      {
          tag:`div`,
          attr:{
              id:`div1`,class:[`div`,`div1`],
              html:`This is a DIV 1.`,
              children:{
                  tag:`div`,
                  attr:{
                      id:`div_child_1`,class:[`div`,`div_child`],
                      html:`This is a child DIV 1.`
                  }
              }
          }
      },
      {
          tag:`div`,
          attr:{
              id:`div2`,class:[`div`,`div2`],
              html:`This is a DIV 2.`,
              children:{
                  tag:`div`,
                  attr:{
                      id:`div_child_1`,class:[`div`,`div_child`],
                      html:`This is a child DIV 2.`
                  }
              }
          }
      },
  ]);
  ```

##### dom_tag和dom_attr单层对象写法

- 在同一对象层中写tag、attribute、html，更加简洁易读。

- 注意：单层对象写法中，tag、attr和attachType为保留字。

- 如果需要在attribute中使用tag、attr，须更换成tagName、attrName（大小写敏感）。

- 如果需要在attribute中使用tagname、attrname、attachtype，须全部使用小写。

  - ```javascript
    $(`body`).appendDOM({
        tag:`div`,
        tagName:`tag_div`,
        attrName:`attr_div`,
        attachtype:`attach_type`,
        id:`div`,class:[`div`,`div2`],
        html:`This is a DIV.`,
        children:[
            {
                tag:`div`,
                tagName:`tag_div_child_1`,
                attrName:`attr_div_child_1`,
                attachtype:`attach_type_1`,
                id:`div_child_1`,class:[`div`,`div_child`],
                html:`This is a child DIV.`
            },
            {
                tag:`div`,
                tagName:`tag_div_child_2`,
                attrName:`attr_div_child_2`,
                attachtype:`attach_type_2`,
                id:`div_child_2`,class:[`div`,`div_child`],
                html:`This is a child DIV.`
            }
        ]
    });
    ```

    
