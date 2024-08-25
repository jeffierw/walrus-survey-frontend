(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[313],{8001:function(e,t,l){Promise.resolve().then(l.bind(l,5449))},5449:function(e,t,l){"use strict";l.r(t);var n,o,a=l(6560),r=l(7351),s=l(6098),i=l(3043);l(1959);var d=l(2118),c=l(5242),u=l(3232),x=l(379),m=l(5765);(n=o||(o={}))[n.Text=1]="Text",n[n.Textarea=2]="Textarea",n[n.Checkbox=3]="Checkbox",n[n.Radio=4]="Radio",n[n.Select=5]="Select",t.default=()=>{let e=(0,d.Os)();(0,s.useRouter)();let{openLoginbox:t}=(0,m.R)(),[l,n]=(0,r.useState)(!1),[o,h]=(0,r.useState)(!1),[p,v]=(0,r.useState)(null),[g,b]=(0,r.useState)("New Survey"),[f,y]=c.ZP.useMessage(),[w,j]=(0,r.useState)([{title:"Question 1",name:"question1",type:1,placeholder:"Question 1"}]),N=(e,t)=>{let l=[...w];l[e].value=t,l[e].title=t,j(l)},C=e=>{let t=w.filter((t,l)=>l!==e),l=t.map((e,t)=>({...e,title:"Question ".concat(t+1),name:"question".concat(t+1),placeholder:"Question ".concat(t+1)}));console.log("test",e,t,l),j(l)},k=async l=>{var o,a,r,s,i,d,c,u;if(l.preventDefault(),!e.connected){t();return}if(0===w.length){f.open({type:"warning",content:"Please Add New Field"});return}let m={id:null==e?void 0:null===(o=e.account)||void 0===o?void 0:o.address,title:g,itemList:w.map(e=>{let{placeholder:t,...l}=e;return{...l,value:""}}),description:""};try{n(!0);let e=await fetch("".concat("http://localhost:3000/api/v1","/create-form"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)}),t=null===(a=e.body)||void 0===a?void 0:a.getReader(),l=[],o=!1;for(;!o;){let{value:e,done:n}=await (null==t?void 0:t.read());e&&l.push(e),o=n}let p=new Uint8Array(l.reduce((e,t)=>e+t.length,0)),g=0;for(let e of l)p.set(e,g),g+=e.length;let b=new TextDecoder().decode(p);console.log("Text:",b,JSON.parse(b));let y=JSON.parse(b);if(200===y.code){(0,x.Z)({particleCount:100,spread:70,origin:{y:.6}}),h(!0);let e=JSON.parse(y.data);(null==e?void 0:e.newlyCreated)?(v(null===(s=e.newlyCreated)||void 0===s?void 0:null===(r=s.blobObject)||void 0===r?void 0:r.blobId),console.log("test1",null===(d=e.newlyCreated)||void 0===d?void 0:null===(i=d.blobObject)||void 0===i?void 0:i.blobId)):(null==e?void 0:e.alreadyCertified)&&(v(null===(c=e.alreadyCertified)||void 0===c?void 0:c.blobId),console.log("test2",null===(u=e.alreadyCertified)||void 0===u?void 0:u.blobId))}else f.open({type:"error",content:"Create Survey Failed"})}catch(e){f.open({type:"error",content:"Create Survey Failed"})}finally{n(!1)}},S=p?"".concat(window.location.origin,"/survey?id=").concat(p):"";return(0,a.jsxs)(a.Fragment,{children:[y,(0,a.jsx)("main",{children:(0,a.jsx)("div",{className:"z-0",style:{backgroundImage:"url(/form_bg.png)",backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"},children:(0,a.jsxs)("div",{className:"min-h-screen",children:[(0,a.jsx)("div",{className:"absolute left-8",children:(0,a.jsx)("img",{src:"/logo2.png",className:"h-32 mt-4 ml-8",alt:"logo"})}),(0,a.jsx)("div",{className:"absolute right-8 mt-8",children:(0,a.jsx)(i.Z,{})}),o?(0,a.jsx)("div",{className:"flex flex-col items-center pt-48 px-4",children:(0,a.jsx)("div",{className:"max-w-md w-full",children:(0,a.jsxs)("p",{className:"text-2xl text-[#63948c] font-medium text-left leading-relaxed mb-4",children:["Congratulations! \uD83C\uDF89 You've created a survey! Copy and paste this ",(0,a.jsx)("a",{href:S,target:"_blank",rel:"noopener noreferrer",className:"text-blue-500 underline text-center",children:"URL"})," to share your survey in an email, on a website, or on social media."]})})}):(0,a.jsx)("div",{className:"flex flex-col items-center pt-12",children:(0,a.jsxs)("form",{id:"myForm",onSubmit:k,className:"w-full max-w-md flex flex-col items-center",children:[(0,a.jsx)("input",{type:"text",value:g,onChange:e=>b(e.target.value),className:"text-4xl font-semibold mb-6 border-none focus:outline-none text-center w-full bg-transparent text-[#63948c]",autoFocus:!0,onFocus:e=>{let t=e.target.value;e.target.value="",e.target.value=t}}),w.map((e,t)=>(0,a.jsx)("div",{className:"relative mb-4 w-full group flex items-center",children:(0,a.jsxs)("div",{className:"relative w-full flex",children:[(0,a.jsx)("input",{type:"text",required:!0,value:e.value||"",onChange:e=>N(t,e.target.value),placeholder:e.placeholder,className:"text-lg w-full p-2 border border-gray-100 focus:outline-none focus:border-[#63948c] focus:shadow-sm focus:shadow-gray-300",style:{paddingRight:"2rem"}}),(0,a.jsx)("button",{type:"button",onClick:()=>C(t),className:"absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hidden group-hover:block",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19 7H5m14 0l-1.342 12.195A2 2 0 0115.667 21H8.333a2 2 0 01-1.991-1.805L5 7m4 0V4a1 1 0 011-1h4a1 1 0 011 1v3M10 11v6m4-6v6"})})})]})},t)),(0,a.jsx)("div",{className:"mb-4 w-full",children:(0,a.jsxs)("button",{type:"button",onClick:()=>{if(!e.connected){t();return}let l={title:"Question ".concat(w.length+1),name:"question".concat(w.length+1),type:1,placeholder:"Question ".concat(w.length+1)};j([...w,l])},className:"text-base rounded-s px-6 py-2 w-full border border-dotted border-gray-300 bg-white text-[#5b91a5] flex items-center justify-center gap-2 transition duration-200",children:[(0,a.jsx)("div",{className:"bg-white p-1 rounded-xl",children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-4 w-4 text-[#5b91a5]",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",strokeWidth:2,children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 4v16m8-8H4"})})}),"Add New Field"]})}),(0,a.jsx)("button",{type:"submit",className:"text-base px-16 py-2 bg-[#5b91a5] text-white rounded-full mt-4 transition duration-200",children:"Finish"})]})}),(0,a.jsx)(u.Z,{spinning:l,fullscreen:!0})]})})})]})}}},function(e){e.O(0,[299,686,715,802,579,379,678,448,610,744],function(){return e(e.s=8001)}),_N_E=e.O()}]);