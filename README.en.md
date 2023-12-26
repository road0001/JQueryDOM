# JQueryDOM
## A plugin for JQuery, use object to manage DOM.

#### Feature:
- Optimize JQuery experience of insert DOM.
- Use object to instead string to generate HTML DOM string or objects.

#### How to use:
- Get the DOM string:

  - Notice: This is simple get DOM string, can't get the children elements.

  - ```javascript
    $.getDOMString(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

- Get the JQueryDOM object:

  - ```javascript
    $.getDOMObject(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

- Get the JQueryDOM html:

  - ```javascript
    $.getHtml(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

    

- Insert element:

  - ```javascript
    $(`body`).appendDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).prependDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).beforeDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).afterDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    $(`body`).htmlDOM(`div`,{id:`div`,class:`div`},`This is a DIV.`);
    ```

  - Use array classes:

    - ```javascript
      $(`body`).appendDOM(`div`,{id:`div`,class:[`div1`,`div2`]}, `This is a DIV.`);
      ```

- Events bind:

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

  - The bind events can also push the data:

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

- Styles with JQuery css object struct:

  - ```javascript
    $(`body`).appendDOM(`div`,{
        id:`div`,class:[`div`,`div2`],
        style:{
            backgrundColor:`#FFF`,
            opacity:0,
        }
    },`This is a DIV.`);
    ```

- Children elements:

  - You can direct insert multi-children in one element, and supports cascade.

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

- Table elements:

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

- HTML string in attributes without dom_html param:

  - Notice: the priority of HTML string in attributes is higher than dom_html param.

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

- Insert element without attributes:

  - ```javascript
    $(`body`).appendDOM(`div`,`This is a DIV.`);
    ```

- Use object to insert element:

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

- Batch insert elements:

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

    
