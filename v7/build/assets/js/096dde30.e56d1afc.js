(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{108:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return b}));var n=r(0),o=r.n(n);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=o.a.createContext({}),l=function(e){var t=o.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},p=function(e){var t=l(e.components);return o.a.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,i=e.parentName,s=u(e,["components","mdxType","originalType","parentName"]),p=l(r),f=n,b=p["".concat(i,".").concat(f)]||p[f]||m[f]||a;return r?o.a.createElement(b,c(c({ref:t},s),{},{components:r})):o.a.createElement(b,c({ref:t},s))}));function b(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var u in t)hasOwnProperty.call(t,u)&&(c[u]=t[u]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},110:function(e,t,r){"use strict";r.d(t,"b",(function(){return a})),r.d(t,"a",(function(){return i}));var n=r(16),o=r(112);function a(){const{siteConfig:{baseUrl:e="/",url:t}={}}=Object(n.default)();return{withBaseUrl:(r,n)=>function(e,t,r,{forcePrependBaseUrl:n=!1,absolute:a=!1}={}){if(!r)return r;if(r.startsWith("#"))return r;if(Object(o.b)(r))return r;if(n)return t+r;const i=r.startsWith(t)?r:t+r.replace(/^\//,"");return a?e+i:i}(t,e,r,n)}}function i(e,t={}){const{withBaseUrl:r}=a();return r(e,t)}},112:function(e,t,r){"use strict";function n(e){return!0===/^(\w*:|\/\/)/.test(e)}function o(e){return void 0!==e&&!n(e)}r.d(t,"b",(function(){return n})),r.d(t,"a",(function(){return o}))},67:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return u})),r.d(t,"toc",(function(){return s})),r.d(t,"default",(function(){return p}));var n=r(3),o=r(8),a=(r(0),r(108)),i=r(110),c={id:"threejs",title:"In Three.js"},u={unversionedId:"threejs",id:"threejs",isDocsHomePage:!1,title:"In Three.js",description:"In this example you will learn how to use parts of emulators-ui with three.js renderer.",source:"@site/docs/threejs.md",slug:"/threejs",permalink:"/v7/build/docs/threejs",editUrl:"https://github.com/caiiiycuk/js-dos/edit/gh-pages/v7/docs/threejs.md",version:"current",sidebar:"someSidebar",previous:{title:"In React (TypeScript)",permalink:"/v7/build/docs/react"},next:{title:"UI Components",permalink:"/v7/build/docs/ui-components"}},s=[],l={toc:s};function p(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"In this example you will learn how to use parts of ",Object(a.b)("inlineCode",{parentName:"p"},"emulators-ui")," with ",Object(a.b)("inlineCode",{parentName:"p"},"three.js")," renderer.\nWe will create a rotating cube with a digger game."),Object(a.b)("img",{alt:"Result",src:Object(i.a)("img/threejs.jpg")}),Object(a.b)("p",null,"First you need to add ",Object(a.b)("inlineCode",{parentName:"p"},"emulators.js")," and ",Object(a.b)("inlineCode",{parentName:"p"},"emulators-ui.js"),":"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html"},'<script src="emulators/emulators.js"><\/script>\n<script src="emulators-ui/emulators-ui.js"><\/script>\n<script>\n  emulators.pathPrefix = "emulators/";\n')),Object(a.b)("p",null,"Complete example:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-html",metastring:'title="examples/threejs.html"',title:'"examples/threejs.html"'},"{}\n")))}p.isMDXComponent=!0}}]);