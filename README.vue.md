# DOMHtml for Vue

## Vue的插件，使用对象来管理Vue模板。

### 功能

- 优化Vue在传统开发环境中使用组件和模板的体验。

- 使用对象代替HTML字符串，用于Vue组件中的模板。

### 注意：

- 需要同时引入html.dom.js和vue.extensions.dom.js。

- 该插件不适用于Vue的单文件组件。

- 该插件仅会返回带Vue特性的HTML字符串，仅用于为Vue提供模板。

### 使用方法

- vueDOMHtml(object)或vDOM(object)。参数结构和JQueryDOM一致。

- camelCase写法（如vIf、vBindAttr、vFor、vModel、vOnClick等）将自动转换为Vue标准的写法（v-bind:attr、v-on:click等）。

- 使用Vattr或VAttr的写法（attr前面加大写的V）来替代「:attr」。

- 所有的「v-」开头的key必须加引号。

  - 不推荐此写法，可使用上述camelCase写法替代。

- 带有「:」的key必须加引号。
  
  - 不推荐此写法，可使用上述camelCase写法替代。

- 不可使用带有@的key，必须改成「v-on:」或「vOn」。

- 为了方便Vue中Attribute绑定时的变量引用，引用变量可采用如下形式：

    - Text1{{index}}Text2

    - 上述字符串会被自动转换为「\`Text1${index}Text2\`」。

    - 表达式中字符串的部分必须加空格以分隔，如：

        - 「Text1{{index}} == Text2{{index}}」会被转换为：

        - 「\`Text1${index}\` == \`Text2${index}\`」

          - 如果不加空格，则：

          - 「Text1{{index}}==Text2{{index}}」会被转换为：

          - 「\`Text1{{index}}==Text2{{index}}\`」

    - 使用此特性时，字符串中若需要用到空格，应用「\&nbsp;」替代，如：
    
      - 「Text1\&nbsp;{{index}}」→「\`Text1 ${index}\`」

      - 如果使用空格，则会被格式化成下面的形式：

        - 「Text1 {{index}}」→「Text1 \`${index}\`」

- ```javascript
  export default {
      props: {
          msg: String,
          vtdiv: Boolean,
          vtshow: Boolean,
          vtbu: Boolean,
          vtbus: Array,
      },
      methods: {
          vbutest(d) {
              console.log(d);
          }
      },
      template: vueDOMHtml(
          [
              {
                  tag: `div`,id: `div1`, class: `div`,html: `{{msg}}`,
                  Vclass: `{vtdiv:vtshow}`, vIf: `vtshow`,
                  children: [{
                          tag: `div`,'v-for': `(bu, index) in vtbus`,
                          children: [{
                              tag: `button`,
                              class: `vbutton`,
                              html: `{{index}}: {{bu.name}}`,
                              'vBind:id': `button_{{index}}`,
                              ':class': `vtbu`,
                              'v-if': `index % 2 == 0`,
                              'vOn:click': `
                                  vbutest(bu.shit); 
                                  this.$parent.vbutest(bu.name)
                              `
                          }, ]
                      },
                      {
                          tag: `button`,
                          class: `vbutton`,
                          html: `{{index}}: {{bu.name}}`,
                          Vid: `'button_' + index`,
                          vBindClass: `vtbu`,
                          vFor: `(bu, index) in vtbus`,
                          vOnClick: `
                              vbutest(bu.shit); 
                              this.$parent.vbutest(bu.name)
                        `
                      },
                  ]
              },
              {
                  tag: `div`,id: `div1`,class: `div`,html: `{{msg}}`,
                  ':class': `vtdiv`,vIf: `vtshow`,
              },
          ]
      ),
  }
  ```