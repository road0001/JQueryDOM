# JQueryDOM
## JQuery的插件，使用对象来管理DOM。

#### 功能：
- 优化JQuery增删改查DOM的体验。
- 使用对象代替HTML字符串来生成HTML DOM对象。

#### 使用方法：
- 获取DOM字符串：

  - 注意：这是简单的获取DOM字符串，无法获取子元素。

  - ```javascript
    $.getDOMString(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

- 获取JQueryDOM对象：

  - ```javascript
    $.getDOMObject(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

- 获取JQueryDOM HTML：

  - ```javascript
    $.getHtml(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

    

- 插入元素：

  - ```javascript
    $(`body`).appendDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).prependDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).beforeDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).afterDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).htmlDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

  - 使用数组传递class：

    - ```javascript
      $(`body`).appendDOM(`div`,{id:`div`,class:[`div1`,`div2`]}, `This is a DIV.`);
      ```

- 事件绑定：

  - ```javascript
    $(`body`).appendDOM(`div`,{
        id:`div`,class:[`div`,`div2`],
        bind:{
            click(e){
                console.log(`test`);
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

- CSS样式：

  - ```javascript
    $(`body`).appendDOM(`div`,{
        id:`div`,class:[`div`,`div2`],
        style:{
            backgrundColor:`#FFF`,
            opacity:0,
        }
    },`This is a DIV.`);
    ```

- 子元素：

  - 可以在一个元素中直接插入多个子元素，并且支持多层子元素。

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

- 表格元素：

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

- 在attributes中使用html字段取代dom_html参数显示文本：

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

- 插入没有attributes的元素：

  - ```javascript
    $(`body`).appendDOM(`div`,`This is a DIV.`);
    ```

- 使用对象参数插入元素：

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

- 批量插入多个元素：

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

    
