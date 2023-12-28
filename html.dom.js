getDOMHtml=function(dom_tag,dom_attr,dom_html){
	let domFullHtml=[];
	//dom_tag为数组时，批量为母元素添加元素
	if(typeof dom_tag==`object` && dom_tag.length!=undefined){
		let default_children={
			tag:undefined,attr:undefined,html:undefined,attachType:`append`
		};
		for(let cur of dom_tag){
			cur={
				...JSON.parse(JSON.stringify(default_children)),
				...cur,
			}
			domFullHtml.push(getDOMHtml(cur));
		}
		return domFullHtml.join(``);
	}

	//dom_tag为对象时，和普通情况一样
	if(typeof dom_tag==`object` && dom_tag.length==undefined){
		let dom_attr_fix_blacklist=[
			`tag`,`attachType`,
		]
		let dom_attr_fix_replace={
			tagName:`tag`, attrName:`attr`,
		}
		let dom_attr_fix={};
		if(dom_tag.attr==undefined){
			for(let key in dom_tag){
				if(!dom_attr_fix_blacklist.includes(key)){
					let key_fix=key;
					for(let origin in dom_attr_fix_replace){
						key_fix=key_fix.replace(origin,dom_attr_fix_replace[origin]);
					}
					dom_attr_fix[key_fix]=dom_tag[key];
				}
			}
		}
		dom_attr=dom_tag.attr || dom_attr_fix;
		dom_html=dom_attr.html || dom_tag.html;
		dom_tag=dom_tag.tag;
	}

	if(typeof dom_attr==`object`){
		if(typeof dom_attr.class==`object` && dom_attr.class.length){
			dom_attr.class=dom_attr.class.join(` `);
		}
		if(typeof dom_attr.style==`object`){
			let styleList=[];
			for(let key in dom_attr.style){
				styleList.push(`${key.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${dom_attr.style[key]}`);
			}
			dom_attr.style=styleList.join(`;`);
		}
	}

	let attr_blacklist=[
		`bind`,`children`,`html`,`tbody`,`tr`,`td`,
	]
	let domElement=document.createElement(dom_tag);
	if(typeof dom_attr==`object`){
		for(let key in dom_attr){
			if(!attr_blacklist.includes(key)){
				domElement.setAttribute(key, dom_attr[key]);
			}
		}
	}else if(typeof dom_attr==`string`){
		domFullHtml.push(dom_attr);
	}
	if(dom_html){
		domFullHtml.push(dom_html);
	}

	if(typeof dom_attr==`object` && typeof dom_attr.children==`object`){
		let default_children={
			tag:undefined,attr:undefined,html:undefined,
		};

		if(dom_attr.children.length==undefined){
			/*仅一个子项时，可以直接使用Object
			{
				tag:`html`,attr:{id:`id`},html:`Test`,attachType:`append`
			}
			*/
			let children={
				...JSON.parse(JSON.stringify(default_children)),
				...dom_attr.children,
			}
			domFullHtml.push(getDOMHtml(children));
		}else{
			/*多个子项时，采用数组形式
			[
				{
					tag:`html`,attr:{id:`id1`},html:`Test1`,attachType:`append`
				},
				{
					tag:`html`,attr:{id:`id2`},html:`Test2`,attachType:`append`
				},
			]
			*/
			for(let i=0; i<dom_attr.children.length; i++){
				let children={
					...JSON.parse(JSON.stringify(default_children)),
					...dom_attr.children[i],
				}
				domFullHtml.push(getDOMHtml(children));
			}
		}
	}

	if(typeof dom_attr==`object` && (typeof dom_attr.tbody==`object` || typeof dom_attr.tr==`object`)){
		let default_tr={
			tag:`tr`,attr:undefined,html:undefined,children:[],
		};
		let default_td={
			tag:`td`,attr:undefined,html:undefined,children:[],
		}
		let trList=dom_attr.tbody || dom_attr.tr;
		let domTrHtml=[];
		for(let i=0; i<trList.length; i++){
			let curTr=trList[i];
			let tr={
				...JSON.parse(JSON.stringify(default_tr)),
				...curTr
			}
			for(let j=0; j<curTr.td.length; j++){
				let curTd=curTr.td[j];
				if(typeof curTd==`string`){
					curTd={html:curTd};
				}
				let td={
					...JSON.parse(JSON.stringify(default_td)),
					...curTd,
				}
				tr.children.push(td);
			}
			domTrHtml.push(tr);
		}
		domFullHtml.push(getDOMHtml(domTrHtml));
	}

	domElement.innerHTML=domFullHtml.join(``);
	return domElement.outerHTML;
}