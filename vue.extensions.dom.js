function vueDOMHtml(dom_tag,dom_attr,dom_html){
	let vueFix={
		attr:{
			// vBind:`v-bind:`,
			vOn:`v-on:`,
			'@':`v-on:`,
			V:`:`,
		},
		attrKeywords:[
			`v-bind`,`V`,`:`,`v-if`,`v-else-if`,`v-else`,`v-show`,`v-for`,`v-model`,`v-on`,`@`,`v-html`,
		],
		attrValue:[
			{origin:/\S*{{2}\S*}{2}\S*/g,target:`\`${generalStrSymbol}\``}, //*%*为通配符
			{origin:`{{`,target:'${'},
			{origin:`}}`,target:'}'},
			{origin:`&nbsp;`,target:' '},
		]
	};
	return DOMHtml(dom_tag, dom_attr, dom_html, vueFix);
}

function vDOM(dom_tag,dom_attr,dom_html){
	return vueDOMHtml(dom_tag,dom_attr,dom_html);
}