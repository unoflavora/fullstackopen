(this["webpackJsonppart2-notes"]=this["webpackJsonppart2-notes"]||[]).push([[0],{39:function(t,n,e){"use strict";e.r(n);var c=e(0),o=e(15),r=e.n(o),a=e(6),i=e(4),u=e(2),s=function(t){var n=t.note;return Object(c.jsx)("li",{children:n.content})},f=e(3),j=e.n(f),l="/api/notes",d=function(){return j.a.get(l).then((function(t){return t.data}))},b=function(t){return j.a.post(l,t).then((function(t){return t.data}))},h=function(t,n){return j.a.put("".concat(l,"/").concat(t),n).then((function(t){return t.data}))},p=function(){var t=Object(u.useState)([]),n=Object(i.a)(t,2),e=n[0],o=n[1],r=Object(u.useState)(""),f=Object(i.a)(r,2),j=f[0],l=f[1],p=Object(u.useState)(!1),O=Object(i.a)(p,2),m=O[0],g=O[1];Object(u.useEffect)((function(){console.log("effect"),d().then((function(t){o(t)}))}),[]);var v=m?e:e.filter((function(t){return t.important}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h1",{children:"Notes"}),Object(c.jsx)("div",{children:Object(c.jsxs)("button",{onClick:function(){return g(!m)},children:["show ",m?"important":"all"]})}),Object(c.jsx)("ul",{children:v.map((function(t){return Object(c.jsx)(s,{note:t,toggleImportance:function(){return function(t){console.log("importance of ".concat(t," needs to be toggled"));var n=e.find((function(n){return n.id===t})),c=Object(a.a)(Object(a.a)({},n),{},{important:!n.important});h(t,c).then((function(n){o(e.map((function(e){return e.id!==t?e:n})))})).catch((function(t){alert("".concat(n," is already deleted"))}))}(t.id)}},t.id)}))}),Object(c.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:j,date:(new Date).toISOString(),important:Math.random()>.5};b(n).then((function(t){o(e.concat(t)),l("")})).catch((function(t){alert("error ".concat(t))}))},children:[Object(c.jsx)("input",{value:j,onChange:function(t){console.log(t.target.value),l(t.target.value)}}),Object(c.jsx)("button",{type:"submit",children:"save"})]})]})};r.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.6840d565.chunk.js.map