(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[745],{1459:function(t,e,i){"use strict";i.d(e,{n:function(){return l}});var s=i(7351),n=i(5802),r=i(6098);function a(){return(a=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=i[s])}return t}).apply(this,arguments)}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,s=Array(e);i<e;i++)s[i]=t[i];return s}var l=function(t){var e,i=(function(t){if(Array.isArray(t))return t}(e=(0,s.useState)(function(){return(0,n.Df)()}))||function(t,e){var i=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=i){var s,n,r,a,o=[],l=!0,u=!1;try{if(r=(i=i.call(t)).next,0===e){if(Object(i)!==i)return;l=!1}else for(;!(l=(s=r.call(i)).done)&&(o.push(s.value),o.length!==e);l=!0);}catch(t){u=!0,n=t}finally{try{if(!l&&null!=i.return&&(a=i.return(),Object(a)!==a))return}finally{if(u)throw n}}return o}}(e,1)||function(t,e){if(t){if("string"==typeof t)return o(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if("Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i)return Array.from(t);if("Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return o(t,e)}}(e,1)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())[0],l=(0,s.useRef)(!1);return(0,r.useServerInsertedHTML)(function(){var t=(0,n.EN)(i,{plain:!0});return l.current?null:(l.current=!0,s.createElement("style",{id:"antd-cssinjs","data-rc-order":"prepend","data-rc-priority":"-1000",dangerouslySetInnerHTML:{__html:t}}))}),s.createElement(n.V9,a({},t,{cache:i}))}},7461:function(){},6793:function(t,e,i){"use strict";function s(t,e,i){if(!e.has(t))throw TypeError("attempted to "+i+" private field on non-instance");return e.get(t)}function n(t,e){var i=s(t,e,"get");return i.get?i.get.call(t):i.value}function r(t,e){if(e.has(t))throw TypeError("Cannot initialize the same private elements twice on an object")}function a(t,e,i){r(t,e),e.set(t,i)}function o(t,e,i){var n=s(t,e,"set");return!function(t,e,i){if(e.set)e.set.call(t,i);else{if(!e.writable)throw TypeError("attempted to set read only private field");e.value=i}}(t,n,i),i}function l(t,e){var i=s(t,e,"update");return function(t,e){if(e.set){if(!e.get)throw TypeError("attempted to read set only private field");return"__destrWrapper"in e||(e.__destrWrapper={set value(v){e.set.call(t,v)},get value(){return e.get.call(t)}}),e.__destrWrapper}if(!e.writable)throw TypeError("attempted to set read only private field");return e}(t,i)}i.d(e,{S:function(){return tg}});var u,h,c,d,f,p,y,b,g,m,w,O,M,S,F,P,E,k,q,A,C,D,Q,T,R,W,x,j,K,U="Deno"in globalThis;function H(){}function I(t,e){let{type:i="all",exact:s,fetchStatus:n,predicate:r,queryKey:a,stale:o}=t;if(a){if(s){if(e.queryHash!==G(a,e.options))return!1}else if(!N(e.queryKey,a))return!1}if("all"!==i){let t=e.isActive();if("active"===i&&!t||"inactive"===i&&t)return!1}return("boolean"!=typeof o||e.isStale()===o)&&(!n||n===e.state.fetchStatus)&&(!r||!!r(e))}function L(t,e){let{exact:i,status:s,predicate:n,mutationKey:r}=t;if(r){if(!e.options.mutationKey)return!1;if(i){if(_(e.options.mutationKey)!==_(r))return!1}else if(!N(e.options.mutationKey,r))return!1}return(!s||e.state.status===s)&&(!n||!!n(e))}function G(t,e){return((null==e?void 0:e.queryKeyHashFn)||_)(t)}function _(t){return JSON.stringify(t,(t,e)=>z(e)?Object.keys(e).sort().reduce((t,i)=>(t[i]=e[i],t),{}):e)}function N(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&!Object.keys(e).some(i=>!N(t[i],e[i]))}function B(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function z(t){if(!J(t))return!1;let e=t.constructor;if(void 0===e)return!0;let i=e.prototype;return!!(J(i)&&i.hasOwnProperty("isPrototypeOf"))}function J(t){return"[object Object]"===Object.prototype.toString.call(t)}function V(t,e){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=[...t,e];return i&&s.length>i?s.slice(1):s}function $(t,e){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=[e,...t];return i&&s.length>i?s.slice(0,-1):s}var X=Symbol();function Y(t,e,i){if(!e.has(t))throw TypeError("attempted to get private field on non-instance");return i}function Z(t,e){r(t,e),e.add(t)}var tt=function(){let t=[],e=0,i=t=>{t()},s=t=>{t()},n=t=>setTimeout(t,0),r=s=>{e?t.push(s):n(()=>{i(s)})},a=()=>{let e=t;t=[],e.length&&n(()=>{s(()=>{e.forEach(t=>{i(t)})})})};return{batch:t=>{let i;e++;try{i=t()}finally{--e||a()}return i},batchCalls:t=>function(){for(var e=arguments.length,i=Array(e),s=0;s<e;s++)i[s]=arguments[s];r(()=>{t(...i)})},schedule:r,setNotifyFunction:t=>{i=t},setBatchNotifyFunction:t=>{s=t},setScheduler:t=>{n=t}}}(),te=class{subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}},ti=new(u=new WeakMap,h=new WeakMap,c=new WeakMap,class extends te{onSubscribe(){n(this,h)||this.setEventListener(n(this,c))}onUnsubscribe(){var t;this.hasListeners()||(null===(t=n(this,h))||void 0===t||t.call(this),o(this,h,void 0))}setEventListener(t){var e;o(this,c,t),null===(e=n(this,h))||void 0===e||e.call(this),o(this,h,t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()}))}setFocused(t){n(this,u)!==t&&(o(this,u,t),this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){var t;return"boolean"==typeof n(this,u)?n(this,u):(null===(t=globalThis.document)||void 0===t?void 0:t.visibilityState)!=="hidden"}constructor(){super(),a(this,u,{writable:!0,value:void 0}),a(this,h,{writable:!0,value:void 0}),a(this,c,{writable:!0,value:void 0}),o(this,c,t=>{if(!U&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}})}}),ts=new(d=new WeakMap,f=new WeakMap,p=new WeakMap,class extends te{onSubscribe(){n(this,f)||this.setEventListener(n(this,p))}onUnsubscribe(){var t;this.hasListeners()||(null===(t=n(this,f))||void 0===t||t.call(this),o(this,f,void 0))}setEventListener(t){var e;o(this,p,t),null===(e=n(this,f))||void 0===e||e.call(this),o(this,f,t(this.setOnline.bind(this)))}setOnline(t){n(this,d)!==t&&(o(this,d,t),this.listeners.forEach(e=>{e(t)}))}isOnline(){return n(this,d)}constructor(){super(),a(this,d,{writable:!0,value:void 0}),a(this,f,{writable:!0,value:void 0}),a(this,p,{writable:!0,value:void 0}),o(this,d,!0),o(this,p,t=>{if(!U&&window.addEventListener){let e=()=>t(!0),i=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",i,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",i)}}})}});function tn(t){return Math.min(1e3*2**t,3e4)}function tr(t){return(null!=t?t:"online")!=="online"||ts.isOnline()}var ta=class{constructor(t){this.revert=null==t?void 0:t.revert,this.silent=null==t?void 0:t.silent}};function to(t){return t instanceof ta}function tl(t){let e,i,s,n=!1,r=0,a=!1,o=new Promise((t,e)=>{i=t,s=e}),l=()=>ti.isFocused()&&("always"===t.networkMode||ts.isOnline())&&t.canRun(),u=()=>tr(t.networkMode)&&t.canRun(),h=s=>{if(!a){var n;a=!0,null===(n=t.onSuccess)||void 0===n||n.call(t,s),null==e||e(),i(s)}},c=i=>{if(!a){var n;a=!0,null===(n=t.onError)||void 0===n||n.call(t,i),null==e||e(),s(i)}},d=()=>new Promise(i=>{var s;e=t=>{(a||l())&&i(t)},null===(s=t.onPause)||void 0===s||s.call(t)}).then(()=>{if(e=void 0,!a){var i;null===(i=t.onContinue)||void 0===i||i.call(t)}}),f=()=>{let e;if(!a){try{e=t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(h).catch(e=>{var i,s,o;if(a)return;let u=null!==(s=t.retry)&&void 0!==s?s:U?0:3,h=null!==(o=t.retryDelay)&&void 0!==o?o:tn,p="function"==typeof h?h(r,e):h,y=!0===u||"number"==typeof u&&r<u||"function"==typeof u&&u(r,e);if(n||!y){c(e);return}r++,null===(i=t.onFail)||void 0===i||i.call(t,r,e),new Promise(t=>{setTimeout(t,p)}).then(()=>l()?void 0:d()).then(()=>{n?c(e):f()})})}};return{promise:o,cancel:e=>{if(!a){var i;c(new ta(e)),null===(i=t.abort)||void 0===i||i.call(t)}},continue:()=>(null==e||e(),o),cancelRetry:()=>{n=!0},continueRetry:()=>{n=!1},canStart:u,start:()=>(u()?f():d().then(f),o)}}var tu=(y=new WeakMap,class{destroy(){this.clearGcTimeout()}scheduleGc(){var t;this.clearGcTimeout(),"number"==typeof(t=this.gcTime)&&t>=0&&t!==1/0&&o(this,y,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,null!=t?t:U?1/0:3e5)}clearGcTimeout(){n(this,y)&&(clearTimeout(n(this,y)),o(this,y,void 0))}constructor(){a(this,y,{writable:!0,value:void 0})}}),th=(b=new WeakMap,g=new WeakMap,m=new WeakMap,w=new WeakMap,O=new WeakMap,M=new WeakMap,S=new WeakSet,class extends tu{get meta(){return this.options.meta}setOptions(t){this.options={...n(this,O),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||n(this,m).remove(this)}setData(t,e){var i,s;let n=(i=this.state.data,"function"==typeof(s=this.options).structuralSharing?s.structuralSharing(i,t):!1!==s.structuralSharing?function t(e,i){if(e===i)return e;let s=B(e)&&B(i);if(s||z(e)&&z(i)){let n=s?e:Object.keys(e),r=n.length,a=s?i:Object.keys(i),o=a.length,l=s?[]:{},u=0;for(let r=0;r<o;r++){let o=s?r:a[r];!s&&void 0===e[o]&&void 0===i[o]&&n.includes(o)?(l[o]=void 0,u++):(l[o]=t(e[o],i[o]),l[o]===e[o]&&void 0!==e[o]&&u++)}return r===o&&u===r?e:l}return i}(i,t):t);return Y(this,S,tc).call(this,{data:n,type:"success",dataUpdatedAt:null==e?void 0:e.updatedAt,manual:null==e?void 0:e.manual}),n}setState(t,e){Y(this,S,tc).call(this,{type:"setState",state:t,setStateOptions:e})}cancel(t){var e,i;let s=null===(e=n(this,w))||void 0===e?void 0:e.promise;return null===(i=n(this,w))||void 0===i||i.cancel(t),s?s.then(H).catch(H):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(n(this,b))}isActive(){return this.observers.some(t=>!1!==t.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return!!this.state.isInvalidated||(this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):void 0===this.state.data)}isStaleByTime(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return this.state.isInvalidated||void 0===this.state.data||!Math.max(this.state.dataUpdatedAt+(t||0)-Date.now(),0)}onFocus(){var t;let e=this.observers.find(t=>t.shouldFetchOnWindowFocus());null==e||e.refetch({cancelRefetch:!1}),null===(t=n(this,w))||void 0===t||t.continue()}onOnline(){var t;let e=this.observers.find(t=>t.shouldFetchOnReconnect());null==e||e.refetch({cancelRefetch:!1}),null===(t=n(this,w))||void 0===t||t.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),n(this,m).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(e=>e!==t),this.observers.length||(n(this,w)&&(n(this,M)?n(this,w).cancel({revert:!0}):n(this,w).cancelRetry()),this.scheduleGc()),n(this,m).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||Y(this,S,tc).call(this,{type:"invalidate"})}fetch(t,e){var i,s,r;if("idle"!==this.state.fetchStatus){if(void 0!==this.state.data&&(null==e?void 0:e.cancelRefetch))this.cancel({silent:!0});else if(n(this,w))return n(this,w).continueRetry(),n(this,w).promise}if(t&&this.setOptions(t),!this.options.queryFn){let t=this.observers.find(t=>t.options.queryFn);t&&this.setOptions(t.options)}let a=new AbortController,l={queryKey:this.queryKey,meta:this.meta},u=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>(o(this,M,!0),a.signal)})};u(l);let h={fetchOptions:e,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>this.options.queryFn&&this.options.queryFn!==X?(o(this,M,!1),this.options.persister)?this.options.persister(this.options.queryFn,l,this):this.options.queryFn(l):Promise.reject(Error("Missing queryFn: '".concat(this.options.queryHash,"'")))};u(h),null===(i=this.options.behavior)||void 0===i||i.onFetch(h,this),o(this,g,this.state),("idle"===this.state.fetchStatus||this.state.fetchMeta!==(null===(s=h.fetchOptions)||void 0===s?void 0:s.meta))&&Y(this,S,tc).call(this,{type:"fetch",meta:null===(r=h.fetchOptions)||void 0===r?void 0:r.meta});let c=t=>{if(to(t)&&t.silent||Y(this,S,tc).call(this,{type:"error",error:t}),!to(t)){var e,i,s,r;null===(e=(i=n(this,m).config).onError)||void 0===e||e.call(i,t,this),null===(s=(r=n(this,m).config).onSettled)||void 0===s||s.call(r,this.state.data,t,this)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};return o(this,w,tl({fn:h.fetchFn,abort:a.abort.bind(a),onSuccess:t=>{var e,i,s,r;if(void 0===t){c(Error("".concat(this.queryHash," data is undefined")));return}this.setData(t),null===(e=(i=n(this,m).config).onSuccess)||void 0===e||e.call(i,t,this),null===(s=(r=n(this,m).config).onSettled)||void 0===s||s.call(r,t,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:c,onFail:(t,e)=>{Y(this,S,tc).call(this,{type:"failed",failureCount:t,error:e})},onPause:()=>{Y(this,S,tc).call(this,{type:"pause"})},onContinue:()=>{Y(this,S,tc).call(this,{type:"continue"})},retry:h.options.retry,retryDelay:h.options.retryDelay,networkMode:h.options.networkMode,canRun:()=>!0})),n(this,w).start()}constructor(t){super(),Z(this,S),a(this,b,{writable:!0,value:void 0}),a(this,g,{writable:!0,value:void 0}),a(this,m,{writable:!0,value:void 0}),a(this,w,{writable:!0,value:void 0}),a(this,O,{writable:!0,value:void 0}),a(this,M,{writable:!0,value:void 0}),o(this,M,!1),o(this,O,t.defaultOptions),this.setOptions(t.options),this.observers=[],o(this,m,t.cache),this.queryKey=t.queryKey,this.queryHash=t.queryHash,o(this,b,t.state||function(t){let e="function"==typeof t.initialData?t.initialData():t.initialData,i=void 0!==e,s=i?"function"==typeof t.initialDataUpdatedAt?t.initialDataUpdatedAt():t.initialDataUpdatedAt:0;return{data:e,dataUpdateCount:0,dataUpdatedAt:i?null!=s?s:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:i?"success":"pending",fetchStatus:"idle"}}(this.options)),this.state=n(this,b),this.scheduleGc()}});function tc(t){this.state=(e=>{var i,s,r;switch(t.type){case"failed":return{...e,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...e,fetchStatus:"paused"};case"continue":return{...e,fetchStatus:"fetching"};case"fetch":return{...e,...(r=e.data,{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:tr(this.options.networkMode)?"fetching":"paused",...void 0===r&&{error:null,status:"pending"}}),fetchMeta:null!==(i=t.meta)&&void 0!==i?i:null};case"success":return{...e,data:t.data,dataUpdateCount:e.dataUpdateCount+1,dataUpdatedAt:null!==(s=t.dataUpdatedAt)&&void 0!==s?s:Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let a=t.error;if(to(a)&&a.revert&&n(this,g))return{...n(this,g),fetchStatus:"idle"};return{...e,error:a,errorUpdateCount:e.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:e.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error"};case"invalidate":return{...e,isInvalidated:!0};case"setState":return{...e,...t.state}}})(this.state),tt.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate()}),n(this,m).notify({query:this,type:"updated",action:t})})}var td=(F=new WeakMap,class extends te{build(t,e,i){var s;let n=e.queryKey,r=null!==(s=e.queryHash)&&void 0!==s?s:G(n,e),a=this.get(r);return a||(a=new th({cache:this,queryKey:n,queryHash:r,options:t.defaultQueryOptions(e),state:i,defaultOptions:t.getQueryDefaults(n)}),this.add(a)),a}add(t){n(this,F).has(t.queryHash)||(n(this,F).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){let e=n(this,F).get(t.queryHash);e&&(t.destroy(),e===t&&n(this,F).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){tt.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return n(this,F).get(t)}getAll(){return[...n(this,F).values()]}find(t){let e={exact:!0,...t};return this.getAll().find(t=>I(e,t))}findAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.getAll();return Object.keys(t).length>0?e.filter(e=>I(t,e)):e}notify(t){tt.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){tt.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){tt.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}constructor(t={}){super(),a(this,F,{writable:!0,value:void 0}),this.config=t,o(this,F,new Map)}}),tv=(P=new WeakMap,E=new WeakMap,k=new WeakMap,q=new WeakSet,class extends tu{setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){n(this,P).includes(t)||(n(this,P).push(t),this.clearGcTimeout(),n(this,E).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){o(this,P,n(this,P).filter(e=>e!==t)),this.scheduleGc(),n(this,E).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){n(this,P).length||("pending"===this.state.status?this.scheduleGc():n(this,E).remove(this))}continue(){var t,e;return null!==(e=null===(t=n(this,k))||void 0===t?void 0:t.continue())&&void 0!==e?e:this.execute(this.state.variables)}async execute(t){var e,i,s,r,a,l,u,h,c,d,f,p,y,b,g,m,w,O,M,S,F;o(this,k,tl({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{Y(this,q,tf).call(this,{type:"failed",failureCount:t,error:e})},onPause:()=>{Y(this,q,tf).call(this,{type:"pause"})},onContinue:()=>{Y(this,q,tf).call(this,{type:"continue"})},retry:null!==(e=this.options.retry)&&void 0!==e?e:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>n(this,E).canRun(this)}));let P="pending"===this.state.status,A=!n(this,k).canStart();try{if(!P){Y(this,q,tf).call(this,{type:"pending",variables:t,isPaused:A}),await (null===(d=(f=n(this,E).config).onMutate)||void 0===d?void 0:d.call(f,t,this));let e=await (null===(p=(y=this.options).onMutate)||void 0===p?void 0:p.call(y,t));e!==this.state.context&&Y(this,q,tf).call(this,{type:"pending",context:e,variables:t,isPaused:A})}let e=await n(this,k).start();return await (null===(i=(s=n(this,E).config).onSuccess)||void 0===i?void 0:i.call(s,e,t,this.state.context,this)),await (null===(r=(a=this.options).onSuccess)||void 0===r?void 0:r.call(a,e,t,this.state.context)),await (null===(l=(u=n(this,E).config).onSettled)||void 0===l?void 0:l.call(u,e,null,this.state.variables,this.state.context,this)),await (null===(h=(c=this.options).onSettled)||void 0===h?void 0:h.call(c,e,null,t,this.state.context)),Y(this,q,tf).call(this,{type:"success",data:e}),e}catch(e){try{throw await (null===(b=(g=n(this,E).config).onError)||void 0===b?void 0:b.call(g,e,t,this.state.context,this)),await (null===(m=(w=this.options).onError)||void 0===m?void 0:m.call(w,e,t,this.state.context)),await (null===(O=(M=n(this,E).config).onSettled)||void 0===O?void 0:O.call(M,void 0,e,this.state.variables,this.state.context,this)),await (null===(S=(F=this.options).onSettled)||void 0===S?void 0:S.call(F,void 0,e,t,this.state.context)),e}finally{Y(this,q,tf).call(this,{type:"error",error:e})}}finally{n(this,E).runNext(this)}}constructor(t){super(),Z(this,q),a(this,P,{writable:!0,value:void 0}),a(this,E,{writable:!0,value:void 0}),a(this,k,{writable:!0,value:void 0}),this.mutationId=t.mutationId,o(this,E,t.mutationCache),o(this,P,[]),this.state=t.state||{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0},this.setOptions(t.options),this.scheduleGc()}});function tf(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),tt.batch(()=>{n(this,P).forEach(e=>{e.onMutationUpdate(t)}),n(this,E).notify({mutation:this,type:"updated",action:t})})}var tp=(A=new WeakMap,C=new WeakMap,class extends te{build(t,e,i){let s=new tv({mutationCache:this,mutationId:++l(this,C).value,options:t.defaultMutationOptions(e),state:i});return this.add(s),s}add(t){var e;let i=ty(t),s=null!==(e=n(this,A).get(i))&&void 0!==e?e:[];s.push(t),n(this,A).set(i,s),this.notify({type:"added",mutation:t})}remove(t){let e=ty(t);if(n(this,A).has(e)){var i;let s=null===(i=n(this,A).get(e))||void 0===i?void 0:i.filter(e=>e!==t);s&&(0===s.length?n(this,A).delete(e):n(this,A).set(e,s))}this.notify({type:"removed",mutation:t})}canRun(t){var e;let i=null===(e=n(this,A).get(ty(t)))||void 0===e?void 0:e.find(t=>"pending"===t.state.status);return!i||i===t}runNext(t){var e,i;let s=null===(e=n(this,A).get(ty(t)))||void 0===e?void 0:e.find(e=>e!==t&&e.state.isPaused);return null!==(i=null==s?void 0:s.continue())&&void 0!==i?i:Promise.resolve()}clear(){tt.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}getAll(){return[...n(this,A).values()].flat()}find(t){let e={exact:!0,...t};return this.getAll().find(t=>L(e,t))}findAll(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.getAll().filter(e=>L(t,e))}notify(t){tt.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){let t=this.getAll().filter(t=>t.state.isPaused);return tt.batch(()=>Promise.all(t.map(t=>t.continue().catch(H))))}constructor(t={}){super(),a(this,A,{writable:!0,value:void 0}),a(this,C,{writable:!0,value:void 0}),this.config=t,o(this,A,new Map),o(this,C,Date.now())}});function ty(t){var e,i;return null!==(i=null===(e=t.options.scope)||void 0===e?void 0:e.id)&&void 0!==i?i:String(t.mutationId)}function tb(t,e){let{pages:i,pageParams:s}=e,n=i.length-1;return t.getNextPageParam(i[n],i,s[n],s)}var tg=(D=new WeakMap,Q=new WeakMap,T=new WeakMap,R=new WeakMap,W=new WeakMap,x=new WeakMap,j=new WeakMap,K=new WeakMap,class{mount(){l(this,x).value++,1===n(this,x)&&(o(this,j,ti.subscribe(async t=>{t&&(await this.resumePausedMutations(),n(this,D).onFocus())})),o(this,K,ts.subscribe(async t=>{t&&(await this.resumePausedMutations(),n(this,D).onOnline())})))}unmount(){var t,e;l(this,x).value--,0===n(this,x)&&(null===(t=n(this,j))||void 0===t||t.call(this),o(this,j,void 0),null===(e=n(this,K))||void 0===e||e.call(this),o(this,K,void 0))}isFetching(t){return n(this,D).findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return n(this,Q).findAll({...t,status:"pending"}).length}getQueryData(t){var e;let i=this.defaultQueryOptions({queryKey:t});return null===(e=n(this,D).get(i.queryHash))||void 0===e?void 0:e.state.data}ensureQueryData(t){let e=this.getQueryData(t.queryKey);if(void 0===e)return this.fetchQuery(t);{let i=this.defaultQueryOptions(t),s=n(this,D).build(this,i);return t.revalidateIfStale&&s.isStaleByTime(i.staleTime)&&this.prefetchQuery(i),Promise.resolve(e)}}getQueriesData(t){return n(this,D).findAll(t).map(t=>{let{queryKey:e,state:i}=t;return[e,i.data]})}setQueryData(t,e,i){let s=this.defaultQueryOptions({queryKey:t}),r=n(this,D).get(s.queryHash),a=null==r?void 0:r.state.data,o="function"==typeof e?e(a):e;if(void 0!==o)return n(this,D).build(this,s).setData(o,{...i,manual:!0})}setQueriesData(t,e,i){return tt.batch(()=>n(this,D).findAll(t).map(t=>{let{queryKey:s}=t;return[s,this.setQueryData(s,e,i)]}))}getQueryState(t){var e;let i=this.defaultQueryOptions({queryKey:t});return null===(e=n(this,D).get(i.queryHash))||void 0===e?void 0:e.state}removeQueries(t){let e=n(this,D);tt.batch(()=>{e.findAll(t).forEach(t=>{e.remove(t)})})}resetQueries(t,e){let i=n(this,D),s={type:"active",...t};return tt.batch(()=>(i.findAll(t).forEach(t=>{t.reset()}),this.refetchQueries(s,e)))}cancelQueries(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i={revert:!0,...e};return Promise.all(tt.batch(()=>n(this,D).findAll(t).map(t=>t.cancel(i)))).then(H).catch(H)}invalidateQueries(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return tt.batch(()=>{var i,s;if(n(this,D).findAll(t).forEach(t=>{t.invalidate()}),"none"===t.refetchType)return Promise.resolve();let r={...t,type:null!==(s=null!==(i=t.refetchType)&&void 0!==i?i:t.type)&&void 0!==s?s:"active"};return this.refetchQueries(r,e)})}refetchQueries(){var t;let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=arguments.length>1?arguments[1]:void 0,s={...i,cancelRefetch:null===(t=null==i?void 0:i.cancelRefetch)||void 0===t||t};return Promise.all(tt.batch(()=>n(this,D).findAll(e).filter(t=>!t.isDisabled()).map(t=>{let e=t.fetch(void 0,s);return s.throwOnError||(e=e.catch(H)),"paused"===t.state.fetchStatus?Promise.resolve():e}))).then(H)}fetchQuery(t){let e=this.defaultQueryOptions(t);void 0===e.retry&&(e.retry=!1);let i=n(this,D).build(this,e);return i.isStaleByTime(e.staleTime)?i.fetch(e):Promise.resolve(i.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(H).catch(H)}fetchInfiniteQuery(t){var e;return t.behavior=(e=t.pages,{onFetch:(t,i)=>{let s=async()=>{var i,s,n,r,a,o;let l;let u=t.options,h=null===(n=t.fetchOptions)||void 0===n?void 0:null===(s=n.meta)||void 0===s?void 0:null===(i=s.fetchMore)||void 0===i?void 0:i.direction,c=(null===(r=t.state.data)||void 0===r?void 0:r.pages)||[],d=(null===(a=t.state.data)||void 0===a?void 0:a.pageParams)||[],f=!1,p=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?f=!0:t.signal.addEventListener("abort",()=>{f=!0}),t.signal)})},y=t.options.queryFn&&t.options.queryFn!==X?t.options.queryFn:()=>Promise.reject(Error("Missing queryFn: '".concat(t.options.queryHash,"'"))),b=async(e,i,s)=>{if(f)return Promise.reject();if(null==i&&e.pages.length)return Promise.resolve(e);let n={queryKey:t.queryKey,pageParam:i,direction:s?"backward":"forward",meta:t.options.meta};p(n);let r=await y(n),{maxPages:a}=t.options,o=s?$:V;return{pages:o(e.pages,r,a),pageParams:o(e.pageParams,i,a)}};if(h&&c.length){let t="backward"===h,e={pages:c,pageParams:d},i=(t?function(t,e){var i;let{pages:s,pageParams:n}=e;return null===(i=t.getPreviousPageParam)||void 0===i?void 0:i.call(t,s[0],s,n[0],n)}:tb)(u,e);l=await b(e,i,t)}else{l=await b({pages:[],pageParams:[]},null!==(o=d[0])&&void 0!==o?o:u.initialPageParam);let t=null!=e?e:c.length;for(let e=1;e<t;e++){let t=tb(u,l);l=await b(l,t)}}return l};t.options.persister?t.fetchFn=()=>{var e,n;return null===(e=(n=t.options).persister)||void 0===e?void 0:e.call(n,s,{queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},i)}:t.fetchFn=s}}),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(H).catch(H)}resumePausedMutations(){return ts.isOnline()?n(this,Q).resumePausedMutations():Promise.resolve()}getQueryCache(){return n(this,D)}getMutationCache(){return n(this,Q)}getDefaultOptions(){return n(this,T)}setDefaultOptions(t){o(this,T,t)}setQueryDefaults(t,e){n(this,R).set(_(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){let e=[...n(this,R).values()],i={};return e.forEach(e=>{N(t,e.queryKey)&&(i={...i,...e.defaultOptions})}),i}setMutationDefaults(t,e){n(this,W).set(_(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){let e=[...n(this,W).values()],i={};return e.forEach(e=>{N(t,e.mutationKey)&&(i={...i,...e.defaultOptions})}),i}defaultQueryOptions(t){if(t._defaulted)return t;let e={...n(this,T).queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=G(e.queryKey,e)),void 0===e.refetchOnReconnect&&(e.refetchOnReconnect="always"!==e.networkMode),void 0===e.throwOnError&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),!0!==e.enabled&&e.queryFn===X&&(e.enabled=!1),e}defaultMutationOptions(t){return(null==t?void 0:t._defaulted)?t:{...n(this,T).mutations,...(null==t?void 0:t.mutationKey)&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){n(this,D).clear(),n(this,Q).clear()}constructor(t={}){a(this,D,{writable:!0,value:void 0}),a(this,Q,{writable:!0,value:void 0}),a(this,T,{writable:!0,value:void 0}),a(this,R,{writable:!0,value:void 0}),a(this,W,{writable:!0,value:void 0}),a(this,x,{writable:!0,value:void 0}),a(this,j,{writable:!0,value:void 0}),a(this,K,{writable:!0,value:void 0}),o(this,D,t.queryCache||new td),o(this,Q,t.mutationCache||new tp),o(this,T,t.defaultOptions||{}),o(this,R,new Map),o(this,W,new Map),o(this,x,0)}})},8228:function(t,e,i){"use strict";i.d(e,{aH:function(){return a}});var s=i(7351),n=i(6560),r=s.createContext(void 0),a=t=>{let{client:e,children:i}=t;return s.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),(0,n.jsx)(r.Provider,{value:e,children:i})}}}]);