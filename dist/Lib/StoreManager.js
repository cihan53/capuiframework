var _obj,_init;function _applyDecoratedDescriptor(a,b,c,d,e){var f={};return Object.keys(d).forEach(function(a){f[a]=d[a]}),f.enumerable=!!f.enumerable,f.configurable=!!f.configurable,("value"in f||f.initializer)&&(f.writable=!0),f=c.slice().reverse().reduce(function(c,d){return d(a,b,c)||c},f),e&&void 0!==f.initializer&&(f.value=f.initializer?f.initializer.call(e):void 0,f.initializer=void 0),void 0===f.initializer&&(Object.defineProperty(a,b,f),f=null),f}import{observable,computed,action}from"mobx";const StoreManager=(_obj={__stores:new Map,add(a,b){this.__stores.set(a,b)},get(a){return this.__stores.get(a)},get stores(){return Array.from(this.__stores.values())},get keys(){return Array.from(this.__stores.keys())},get entries(){return Array.from(this.__stores.entries())},get size(){return this.__stores.size},toObject(){let a={};return this.__stores.forEach((b,c)=>{a[c]=b}),a},toJS(){return this.__stores.toJS()}},_applyDecoratedDescriptor(_obj,"__stores",[observable],(_init=Object.getOwnPropertyDescriptor(_obj,"__stores"),_init=_init?_init.value:void 0,{enumerable:!0,configurable:!0,writable:!0,initializer:function(){return _init}}),_obj),_applyDecoratedDescriptor(_obj,"add",[action],Object.getOwnPropertyDescriptor(_obj,"add"),_obj),_applyDecoratedDescriptor(_obj,"get",[action],Object.getOwnPropertyDescriptor(_obj,"get"),_obj),_applyDecoratedDescriptor(_obj,"stores",[computed],Object.getOwnPropertyDescriptor(_obj,"stores"),_obj),_applyDecoratedDescriptor(_obj,"keys",[computed],Object.getOwnPropertyDescriptor(_obj,"keys"),_obj),_applyDecoratedDescriptor(_obj,"entries",[computed],Object.getOwnPropertyDescriptor(_obj,"entries"),_obj),_applyDecoratedDescriptor(_obj,"size",[computed],Object.getOwnPropertyDescriptor(_obj,"size"),_obj),_obj);export default StoreManager;