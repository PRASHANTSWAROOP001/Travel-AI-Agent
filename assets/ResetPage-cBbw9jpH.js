import{r as l,j as e,n as o,v as m,w as x,x as h,o as f,L as u,I as j,p,B as g,T as E}from"./index-MVyLDV4l.js";function v(){const[a,t]=l.useState(""),[i,r]=l.useState(!1),n=s=>{s.target.value.length>0&&t(s.target.value)},d=s=>/\S+@\S+\.\S+/.test(s),c=async()=>{if(a.length==0){alert("add email");return}if(!d(a)){alert("Please enter a valid email address.");return}r(!0);try{await E(a)}catch{console.error("Error happend while sending reset mail")}finally{r(!1)}};return e.jsx("div",{className:"w-full flex flex-col items-center justify-center h-screen gap-10",children:e.jsxs(o,{className:"w-[350px]",children:[e.jsxs(m,{children:[e.jsx(x,{children:"Reset Password"}),e.jsx(h,{children:"Enter Email To Reset Password"})]}),e.jsx(f,{children:e.jsx("form",{children:e.jsx("div",{className:"grid w-full items-center gap-4",children:e.jsxs("div",{className:"flex flex-col space-y-1.5",children:[e.jsx(u,{htmlFor:"email",children:"Email"}),e.jsx(j,{value:a,onChange:n,id:"email",placeholder:"Enter Your Email"})]})})})}),e.jsx(p,{className:"flex justify-center",children:e.jsx(g,{disabled:i,onClick:c,size:"lg",variant:"green",children:"Reset"})})]})})}export{v as default};
