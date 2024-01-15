# JQuery DOM

- Version: 1.1.6 Build 20240115
	- 优化构建脚本。
	- 加入自动移除class前后空格功能。
	- 当dom_tag为空时，为其指定默认tag。
	- 修复dom_attr参数为null或undefined时，会报错的bug。
	- 修复dom_attr参数为字符串时，无法输出html文本的bug。

- Version: 1.1.5 Build 20240112
	- 更新文档。
	- 加入NPM模块打包发布脚本。
	- 修复传入的对象、子项为已被React.createElement封装的对象时报错的bug。

- Version: 1.1.4 Build 20240110
	- 加入构建脚本。
	- 加入ReactDOMHtml模块导出。
	- 修复使用标准参数时无法输出html文本的bug。
	- 修复ReactDOMHtml中class为数组时不生效的bug。

- Version: 1.1.3 Build 20240109
	- 加入ReactDOMHtml。
	- 整理项目资源。
	- 优化vueDOMHtml结构，拆分DOMHtml和VueDOMHtml。

- Version: 1.1.2 Build 20240105
	- 加入vueDOMHtml功能。

- Version: 1.1.1 Build 20240104
	- 修复数组形式插入DOM时无法插入的bug。

- Version: 1.1.0 Build 20231229
	- 加入attribute PascalCase→kebab-case转换。
	- 优化DOM插入性能。

- Version: 1.0.9 Build 20231228
	- 将$更名为jQuery以适配更多场合。
	- 加入原生getDOMHtml功能。

- Version: 1.0.9 Build 20231227
	- 将getHtml更名为getDOMHtml。
	- 加入表格使用tr替代tbody功能。
	- 加入dom_tag和dom_attr单层对象写法。
	- 更新文档。

- Version: 1.0.8 Build 20231222
	- 加入获取生成的HTML功能。

- Version: 1.0.7 Build 20230606
	- 加入表格DOM的语法糖。
	- 修复部分情况下，元素中children会出现重复内容的bug。

- Version: 1.0.6 Build 20210514
	- 修复部分情况下，appendDOM中直接传递对象时无法添加元素的bug。