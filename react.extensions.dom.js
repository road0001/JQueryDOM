function reactDOMHtml(dom_tag,dom_attr,dom_html,dom_html_after){
	let rCreateEl;
	if(typeof createElement==`function`){
		rCreateEl=createElement;
	}else if(typeof React==`object` && typeof React.createElement==`function`){
		rCreateEl=React.createElement;
	}else{
		return null;
	}
	/* --- FOR MODULE --- */
	/* --- MODULE BEGIN --- */
	//dom_tag为数组时，批量为母元素添加元素
	const _fragment=Symbol.for('react.fragment');
	if(typeof dom_tag==`object` && dom_tag.length!=undefined){
		let domFullObject=[];
		let default_children={
			tag:undefined,attr:undefined,html:undefined,
		};
		for(let [index, cur] of dom_tag.entries()){
			if(typeof cur==`object` && cur.$$typeof){
				domFullObject.push(cur); // 已被React.createElement封装的情况下，不再重新封装
			}else if(cur && typeof cur==`object`){
				cur={
					...default_children,
					...cur,
				};
				domFullObject.push(reactDOMHtml(cur,undefined,undefined));
			}
		}
		return rCreateEl(_fragment,null,domFullObject); //顶层元素类似<></>形式
	}
	//dom_tag为对象时，和普通情况一样
	if(typeof dom_tag==`object` && dom_tag.length==undefined){
		dom_attr=dom_tag.attr || dom_tag;
		dom_tag=dom_tag.tag;
	}
	if(!dom_tag){
		dom_tag=_fragment;
	}
	if(!dom_attr){
		dom_attr={};
	}else if(typeof dom_attr==`string`){ // 例：rDOM(`div`, `This is Div`)
		dom_attr={html:dom_attr};
	}
	if(dom_attr.$$typeof){
		return dom_attr; // 已被React.createElement封装的情况下，直接返回此对象
	}

	//Model双向绑定
	if(typeof dom_attr.model==`object`){
		let modelObject={};
		if(dom_attr.model.length!=undefined && dom_attr.model.length>=2 && typeof dom_attr.model[dom_attr.model.length-1]==`function`){
			// model:[value, extend, onChange]
			modelObject.value=dom_attr.model[0];
			modelObject.extend=dom_attr.model.slice(1,dom_attr.model.length-1);
			modelObject.onChange=dom_attr.model[dom_attr.model.length-1];

			if(modelObject.extend.length<=0){
				delete modelObject.extend;
			}
		}else{
			modelObject=dom_attr.model;
		}

		if(dom_tag==`input` && dom_attr.type!=undefined){
			switch(dom_attr.type){
				case `checkbox`:
					dom_attr.checked=modelObject.value;
					delete modelObject.value;
				break;
				case `radio`:
					dom_attr.value=modelObject.value;
					if(typeof modelObject.extend==`object` && modelObject.extend.length>0){ //处理默认选项
						dom_attr.checked=modelObject.extend[0];
						delete modelObject.extend;
					}else if(modelObject.checked!=undefined){
						dom_attr.checked=modelObject.checked;
						delete modelObject.checked;
					}
				break;
			}
		}
		dom_attr={...dom_attr, ...modelObject};
	}

	dom_html=dom_attr.html || dom_html;
	dom_html_after=dom_attr.htmlAfter || dom_html_after;

	//对attr进行过滤和改名
	let dom_attr_fix_blacklist=[
		`tag`,`html`,`htmlAfter`,`model`,
	]
	let dom_attr_fix_replace=new Map([
		[`tagName`,`tag`],[`tag_name`,`tagName`],
		[`attrName`,`attr`],[`attr_name`,`attrName`],
		[`modelName`,`model`],[`model_name`,`modelName`],
		[`class`,`className`],[`for`,`htmlFor`],
	]);
	let dom_attr_fix={};
	for(let key in dom_attr){
		if(!dom_attr_fix_blacklist.includes(key) && dom_attr[key]!=undefined){
			let key_fix=key;
			if(dom_attr_fix_replace.get(key)){
				key_fix=dom_attr_fix_replace.get(key_fix);
			}
			dom_attr_fix[key_fix]=dom_attr[key];
		}
	}
	if(typeof dom_attr_fix.className==`object` && dom_attr_fix.className.length){
		dom_attr_fix.className=dom_attr_fix.className.join(` `).trim();
	}else if(typeof dom_attr_fix.className==`object` && dom_attr_fix.className.length==undefined){
		let classList=[];
		for(let key in dom_attr_fix.className){
			if(dom_attr_fix.className[key]==true){
				classList.push(key);
			}
		}
		dom_attr_fix.className=classList.join(` `).trim();
	}
	dom_attr=dom_attr_fix;

	//dom子项处理
	let dom_children=[];
	let reactDOMChildren=[];
	if(typeof dom_attr==`object`){
		if(typeof dom_attr.children==`object`){
			let default_children={
				tag:undefined,attr:undefined,html:undefined,
			};
			if(dom_attr.children.length==undefined){ //children为对象时，有且仅有一个子项
				dom_children.push({
					...default_children,
					...dom_attr.children,
				})
			}else{ // children为数组时，解构并插入到dom_children
				dom_children=[
					...dom_children,
					...dom_attr.children,
				];
			}
		}else if(typeof dom_attr.children==`string`){ //children为字符串时，进行兼容
			dom_children=[dom_attr.children];
		}
		delete dom_attr.children; //移除attr中的children
	}
	if(dom_html){
		reactDOMChildren.push(dom_html);
	}
	for(let [index, children] of dom_children.entries()){
		if(typeof children==`object`){
			reactDOMChildren.push(reactDOMHtml(children));
		}else if(typeof children==`string`){
			reactDOMChildren.push(children);
		}
	}
	if(dom_html_after){
		reactDOMChildren.push(dom_html_after);
	}

	//表格语法糖
	if(typeof dom_attr==`object` && (typeof dom_attr.tbody==`object` || typeof dom_attr.tr==`object`)){
		let reactDOMTbody={tag:`tbody`,children:[]};
		let trList=dom_attr.tbody || dom_attr.tr;
		for(let i=0; i<trList.length; i++){
			let default_tr={
				tag:`tr`,attr:undefined,html:undefined,children:[],
			};
			let default_td={
				tag:`td`,attr:undefined,html:undefined,children:[],
			}
			let curTr=trList[i];
			if(curTr){
				let tr={
					...default_tr,
					...curTr
				}
				if(curTr.td){
					for(let j=0; j<curTr.td.length; j++){
						let curTd=curTr.td[j];
						if(typeof curTd==`string`){
							curTd={html:curTd};
						}
						let td={
							...default_td,
							...curTd,
						}
						delete td.td;
						tr.children.push(td);
					}
				}
				delete tr.tr;
				delete tr.td;
				reactDOMTbody.children.push(tr);
			}
		}
		delete dom_attr.tr;
		delete dom_attr.tbody;
		reactDOMChildren.push(reactDOMHtml(reactDOMTbody));
	}
	if(reactDOMChildren.length<=0){
		reactDOMChildren=null;
	}else if(reactDOMChildren.length==1){ //只有单一子项时，直接指向，以避免兼容性问题。
		reactDOMChildren=reactDOMChildren[0];
	}
	return rCreateEl(dom_tag,dom_attr,reactDOMChildren);
}
function rDOM(dom_tag,dom_attr,dom_html,dom_html_after){
	return reactDOMHtml(dom_tag,dom_attr,dom_html,dom_html_after);
}
/* --- MODULE END --- */
/* --- FOR MODULE --- */