(this["webpackJsonpalgorithms-visualization"]=this["webpackJsonpalgorithms-visualization"]||[]).push([[0],{17:function(t,o,r){t.exports=r(32)},28:function(t,o,r){},29:function(t,o,r){},30:function(t,o,r){},31:function(t,o,r){},32:function(t,o,r){"use strict";r.r(o);var e=r(0),n=r.n(e),a=r(5),s=r.n(a),l=r(2),c=r(6),i={unsortedArray:u(),startSort:!1,isArraySorted:!1,randomAlgoClicks:0,isDarkTheme:!1,primaryColor:"darkkhaki",secondaryColor:"tomato",sortedColor:"#6ad4f7",defaultColor:"#b0b0b0",backgroundColor:"rgb(241, 241, 241)",algoButtonBg:"#ffffff",algoButtonColor:"#494949",algoButtonSelectedBg:"rgb(65, 146, 247)",algoButtonSelectedColor:"#ffffff",titleColor:"rgb(101, 196, 226)"};function u(){for(var t,o,r=[],e=0;e<120;e++)r.push((t=10,o=330,Math.floor(Math.random()*(o-t+1)+t)));return r}var h=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,o=arguments.length>1?arguments[1]:void 0;switch(o.type){case"SORTING_VISUALIZER_SHUFFLE_ARRAY":return Object.assign({},t,{unsortedArray:u(),startSort:!1,isArraySorted:!1});case"SORTING_VISUALIZER_RANDOMIZE_ALGO":return Object.assign({},t,{randomAlgoClicks:t.randomAlgoClicks+1,startSort:!1});case"SORTING_VISUALIZER_START_SORT":return Object.assign({},t,{startSort:!0,isArraySorted:!0});case"SORTING_VISUALIZER_CHANGE_THEME":return console.log("changed themes"),Object.assign({},t,{isDarkTheme:!t.isDarkTheme,primaryColor:t.isDarkTheme?"darkkhaki":"#ab9d78",secondaryColor:t.isDarkTheme?"tomato":"#822c2c",sortedColor:t.isDarkTheme?"#6ad4f7":"#2f787d",defaultColor:t.isDarkTheme?"#b0b0b0":"#71868f",backgroundColor:t.isDarkTheme?"rgb(241, 241, 241)":"rgb(45, 45, 45)",appBackgroundColor:t.isDarkTheme?"white":"#3a3a3a",algoButtonBg:t.isDarkTheme?"#ffffff":"#8a8a8a",algoButtonColor:t.isDarkTheme?"#494949":"#212121",algoButtonSelectedBg:t.isDarkTheme?"rgb(65, 146, 247)":"rgb(5, 105, 154)",algoButtonSelectedColor:t.isDarkTheme?"#ffffff":"rgb(206, 206, 206)",titleColor:t.isDarkTheme?"rgb(101, 196, 226)":"rgb(83, 147, 167)"});default:return t}},p=Object(c.b)(h,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__()),g=(r(28),r(4)),f=r(3),m=r(1),d=r(12),C=r(13),b=r(15),y=r(14),k=r(16);function S(t){var o=[];return function(t,o){var r=Math.floor(t.length/2-1),e=t.length-1;for(;r>=0;)v(t,t.length,r,o),r--;for(;e>=0;){var n=[t[e],t[0]];t[0]=n[0],t[e]=n[1],o.push([e,t[e],0,t[0],0]),v(t,e,0,o),e--}}(t,o),o}function v(t,o,r,e){var n=r,a=2*r+1,s=a+1;if(a<o&&t[a]>t[n]&&(n=a,e.push([n,a])),s<o&&t[s]>t[n]&&(n=s,e.push([n,s])),n!==r){e.push([n,t[r],r,t[n]]);var l=[t[n],t[r]];t[r]=l[0],t[n]=l[1],v(t,o,n,e)}return t}function T(t){if(t.length<=1)return t;var o=[],r=Object(g.a)(t);return function t(o,r,e,n,a){if(r===e)return;var s=Math.floor((r+e)/2);t(n,r,s,o,a),t(n,s+1,e,o,a),function(t,o,r,e,n,a){var s=o,l=o,c=r+1;if(t.length-1===e&&0===o){for(;l<=r&&c<=e;)a.push([l,c,0]),a.push([l,c,0]),n[l]<=n[c]?(a.push([s,n[l],0]),t[s++]=n[l++]):(a.push([s,n[c],0]),t[s++]=n[c++]);for(;l<=r;)a.push([l,l,0]),a.push([l,l,0]),a.push([s,n[l],0]),t[s++]=n[l++];for(;c<=e;)a.push([c,c,0]),a.push([c,c,0]),a.push([s,n[c],0]),t[s++]=n[c++]}else{for(;l<=r&&c<=e;)a.push([l,c]),a.push([l,c]),n[l]<=n[c]?(a.push([s,n[l]]),t[s++]=n[l++]):(a.push([s,n[c]]),t[s++]=n[c++]);for(;l<=r;)a.push([l,l]),a.push([l,l]),a.push([s,n[l]]),t[s++]=n[l++];for(;c<=e;)a.push([c,c]),a.push([c,c]),a.push([s,n[c]]),t[s++]=n[c++]}}(o,r,s,e,n,a)}(t,0,t.length-1,r,o),o}function E(t){var o=[];return function t(o,r,e,n){var a;o.length>1&&(a=function(t,o,r,e){var n=Math.floor((r+o)/2),a=t[n],s=o,l=r;for(;s<=l;){for(;t[s]<a;)e.push([s,n]),s++;for(;t[l]>a;)e.push([l,n]),l--;s<=l&&(A(t,s,l),e.push([s,t[s],l,t[l]]),s++,l--)}return s}(o,r,e,n),r<a-1&&t(o,r,a-1,n),a<e&&t(o,a,e,n));return o}(t,0,t.length-1,o),o}function A(t,o,r){var e=t[o];t[o]=t[r],t[r]=e}r(29);var O=["selectionSort","bubbleSort","mergeSort","heapSort","quickSort"];function R(t,o){return Math.floor(Math.random()*(o-t+1)+t)}var B=function(t){function o(t){var r;return Object(d.a)(this,o),(r=Object(b.a)(this,Object(y.a)(o).call(this,t))).selectionSort=function(){for(var t=function(t){for(var o=[],r=0;r<t.length-1;r++){for(var e=r,n=r+1;n<t.length;n++)o.push([n,e]),t[n]<t[e]&&(e=n);A(t,r,e),o.push([r,t[r],e,t[e]])}return o}(r.state[r.componentRef.current].array),o=r.componentRef.current.getElementsByClassName("array-bar"),e=0,n=0,a=function(a){if(4===t[a].length)setTimeout((function(){var s=Object(m.a)(t[a],4),l=s[0],c=s[1],i=s[2],u=s[3],h=o[l].style,p=o[i].style;h.height="".concat(c,"px"),p.height="".concat(u,"px"),setTimeout((function(){o[e++].style.backgroundColor=r.props.sortedColor}),2),119===++n&&setTimeout((function(){o[n].style.backgroundColor=r.props.sortedColor}),2)}),2*a);else{var s=Object(m.a)(t[a],2),l=s[0],c=s[1],i=o[l].style,u=o[c].style;setTimeout((function(){i.backgroundColor=r.props.secondaryColor,u.backgroundColor=r.props.secondaryColor,setTimeout((function(){i.backgroundColor=r.props.primaryColor,u.backgroundColor=r.props.primaryColor}),2)}),2*a)}},s=0;s<t.length;s++)a(s)},r.bubbleSort=function(){for(var t=function(t){for(var o=[],r=0;r<t.length-1;r++)for(var e=t.length-1-r,n=0;n<e;n++)o.push([n,n+1]),t[n+1]<t[n]&&A(t,n,n+1),o.push([n+1,t[n+1],n,t[n]]),o.push([n,n+1]);return o}(r.state[r.componentRef.current].array),o=r.componentRef.current.getElementsByClassName("array-bar"),e=119,n=119,a=function(a){if(a%3!==1){var s=Object(m.a)(t[a],2),l=s[0],c=s[1],i=o[l].style,u=o[c].style,h=a%3!==2?r.props.secondaryColor:r.props.primaryColor;setTimeout((function(){i.backgroundColor=h,u.backgroundColor=h}),2*a/3)}else setTimeout((function(){var s=Object(m.a)(t[a],4),l=s[0],c=s[1],i=s[2],u=s[3],h=o[l].style,p=o[i].style;h.height="".concat(c,"px"),p.height="".concat(u,"px"),i!==e&&l!==e||(setTimeout((function(){o[n--].style.backgroundColor=r.props.sortedColor}),2),0===--e&&setTimeout((function(){o[0].style.backgroundColor=r.props.sortedColor}),2))}),2*a/3)},s=0;s<t.length;s++)a(s)},r.handleClickAlgoButton=function(t){var o=r.highlightAlgoButton(t);r.props.isArraySorted?r.setState(Object(f.a)({},r.componentRef.current,{array:r.getSortedArray(),algorithm:o})):r.setState(Object(f.a)({},r.componentRef.current,{array:Object(g.a)(r.props.array),algorithm:o}))},r.componentRef=n.a.createRef(),r.componentRef.current=R(0,1e6),r.state=Object(f.a)({},r.componentRef.current,{array:[],algorithm:String}),r}return Object(k.a)(o,t),Object(C.a)(o,[{key:"componentDidMount",value:function(){var t=this.highlightAlgoButton(O[R(0,O.length-1)]);this.setState(Object(f.a)({},this.componentRef.current,{array:Object(g.a)(this.props.array),algorithm:t}))}},{key:"componentDidUpdate",value:function(t,o){if(t.array!==this.props.array){for(var r=this.componentRef.current.getElementsByClassName("array-bar"),e=0;e<r.length;e++)r[e].style.backgroundColor=this.props.defaultColor;var n=Object(g.a)(this.props.array);this.setState(Object(f.a)({},this.componentRef.current,{array:n,algorithm:o[this.componentRef.current].algorithm}))}if(t.randomAlgoClicks!==this.props.randomAlgoClicks){var a=this.highlightAlgoButton(O[R(0,O.length-1)]);this.props.isArraySorted?this.setState(Object(f.a)({},this.componentRef.current,{array:this.getSortedArray(),algorithm:a})):this.setState(Object(f.a)({},this.componentRef.current,{array:Object(g.a)(this.props.array),algorithm:a}))}if(t.startSort!==this.props.startSort&&this.props.startSort)switch(this.state[this.componentRef.current].algorithm){case O[0]:this.selectionSort();break;case O[1]:this.bubbleSort();break;case O[2]:this.mergeSort();break;case O[3]:this.heapSort();break;case O[4]:this.quickSort();break;default:console.error("no algorithm selected")}t.isDarkTheme!==this.props.isDarkTheme&&this.highlightAlgoButton(this.state[this.componentRef.current].algorithm)}},{key:"mergeSort",value:function(){for(var t=this,o=T(this.state[this.componentRef.current].array),r=this.componentRef.current.getElementsByClassName("array-bar"),e=function(e){if(e%3!==2){var n=Object(m.a)(o[e],2),a=n[0],s=n[1],l=r[a].style,c=r[s].style,i=e%3===0?t.props.secondaryColor:t.props.primaryColor;if(3!==o[e].length)setTimeout((function(){l.backgroundColor=i,c.backgroundColor=i}),2*e*3);else{var u=Object(m.a)(o[e],1)[0],h=r[u].style;setTimeout((function(){h.backgroundColor=t.props.sortedColor}),2*e*3)}}else{var p=Object(m.a)(o[e],2),g=p[0],f=p[1],d=r[g].style;setTimeout((function(){d.height="".concat(f,"px"),3===o[e].length&&setTimeout((function(){d.backgroundColor=t.props.secondaryColor,setTimeout((function(){d.backgroundColor=t.props.sortedColor}),1)}),0)}),2*e*3)}},n=0;n<o.length;n++)e(n)}},{key:"heapSort",value:function(){for(var t=this,o=S(this.state[this.componentRef.current].array),r=this.componentRef.current.getElementsByClassName("array-bar"),e=function(e){if(2===o[e].length){var n=Object(m.a)(o[e],2),a=n[0],s=n[1],l=r[a].style,c=r[s].style;setTimeout((function(){l.backgroundColor=t.props.secondaryColor,c.backgroundColor=t.props.secondaryColor,setTimeout((function(){l.backgroundColor=t.props.primaryColor,c.backgroundColor=t.props.primaryColor}),10)}),2*e*4.7)}else if(4===o[e].length){var i=Object(m.a)(o[e],4),u=i[0],h=i[1],p=i[2],g=i[3],f=r[u].style,d=r[p].style;setTimeout((function(){f.backgroundColor=t.props.secondaryColor,d.backgroundColor=t.props.secondaryColor,setTimeout((function(){f.height="".concat(h,"px"),d.height="".concat(g,"px"),f.backgroundColor=t.props.primaryColor,d.backgroundColor=t.props.primaryColor}),10)}),2*e*4.7)}else{var C=Object(m.a)(o[e],4),b=C[0],y=C[1],k=C[2],S=C[3],v=r[b].style,T=r[k].style;setTimeout((function(){v.height="".concat(y,"px"),T.height="".concat(S,"px"),v.backgroundColor=t.props.sortedColor,T.backgroundColor=t.props.secondaryColor,setTimeout((function(){T.backgroundColor=t.props.primaryColor}),10),e===o.length-1&&setTimeout((function(){r[0].style.backgroundColor=t.props.sortedColor}),10)}),2*e*4.75)}},n=0;n<o.length;n++)e(n)}},{key:"quickSort",value:function(){for(var t=this,o=E(this.state[this.componentRef.current].array),r=this.componentRef.current.getElementsByClassName("array-bar"),e=function(e){if(2===o[e].length){var n=Object(m.a)(o[e],2),a=n[0],s=n[1],l=r[a].style,c=r[s].style;setTimeout((function(){l.backgroundColor=t.props.secondaryColor,c.backgroundColor=t.props.secondaryColor,setTimeout((function(){l.backgroundColor=t.props.primaryColor,c.backgroundColor=t.props.primaryColor}),10)}),2*e*8.2)}else if(4===o[e].length){var i=Object(m.a)(o[e],4),u=i[0],h=i[1],p=i[2],g=i[3],f=r[u].style,d=r[p].style;setTimeout((function(){if(f.height="".concat(h,"px"),d.height="".concat(g,"px"),f.backgroundColor=t.props.secondaryColor,d.backgroundColor=t.props.secondaryColor,setTimeout((function(){f.backgroundColor=t.props.primaryColor,d.backgroundColor=t.props.primaryColor}),10),e===o.length-1)for(var n=function(o){var e=r[o].style;setTimeout((function(){e.backgroundColor=t.props.secondaryColor,setTimeout((function(){e.backgroundColor=t.props.sortedColor}),.05*o)}),8.5*o)},a=0;a<r.length;a++)n(a)}),2*e*8.2)}},n=0;n<o.length;n++)e(n)}},{key:"highlightAlgoButton",value:function(t){for(var o=this.componentRef.current.getElementsByClassName("algo-buttons"),r=0;r<o.length;r++)t===o[r].id?(o[r].style.color=this.props.algoButtonSelectedColor,o[r].style.backgroundColor=this.props.algoButtonSelectedBg):(o[r].style.color=this.props.algoButtonColor,o[r].style.backgroundColor=this.props.algoButtonBg);return t}},{key:"getSortedArray",value:function(){for(var t=this.componentRef.current.getElementsByClassName("array-bar"),o=[],r=0;r<t.length;r++)o.push(parseInt(t[r].style.height));return o}},{key:"testSortingAlgorithms",value:function(){var t=this.props.array.sort((function(t,o){return t-o})),o=E(this.props.array.slice());console.log(t),console.log(o),console.log(function(t,o){if(t.length!==o.length)return!1;for(var r=0;r<t.length;r++)if(t[r]!==o[r])return!1;return!0}(t,o))}},{key:"render",value:function(){var t=this;return n.a.createElement("div",{className:"canvas",style:{backgroundColor:this.props.backgroundColor},"data-test":"sorting-visualizer"},n.a.createElement("div",{className:"canvas-content","data-test":"content",ref:this.componentRef},n.a.createElement("div",{className:"array-container","data-test":"container"},this.state[this.componentRef.current].array.map((function(o,r){return n.a.createElement("div",{className:"array-bar",key:r,style:{backgroundColor:t.props.defaultColor,height:"".concat(o,"px")}})})),n.a.createElement("div",{className:"static-bar","data-test":"static",style:{height:"330px"}})),n.a.createElement("div",{className:"algo-bar","data-test":"algorithm-bar"},n.a.createElement("button",{className:"algo-buttons",id:"selectionSort",onClick:function(){return t.handleClickAlgoButton(O[0])}},"SelectionSort"),n.a.createElement("button",{className:"algo-buttons",id:"bubbleSort",onClick:function(){return t.handleClickAlgoButton(O[1])}},"BubbleSort"),n.a.createElement("button",{className:"algo-buttons",id:"mergeSort",onClick:function(){return t.handleClickAlgoButton(O[2])}},"MergeSort"),n.a.createElement("button",{className:"algo-buttons",id:"heapSort",onClick:function(){return t.handleClickAlgoButton(O[3])}},"HeapSort"),n.a.createElement("button",{className:"algo-buttons",id:"quickSort",onClick:function(){return t.handleClickAlgoButton(O[4])}},"QuickSort"))))}}]),o}(e.Component),N=Object(l.b)((function(t){return{array:t.unsortedArray,startSort:t.startSort,randomAlgoClicks:t.randomAlgoClicks,isArraySorted:t.isArraySorted,isDarkTheme:t.isDarkTheme,primaryColor:t.primaryColor,secondaryColor:t.secondaryColor,sortedColor:t.sortedColor,defaultColor:t.defaultColor,backgroundColor:t.backgroundColor,algoButtonBg:t.algoButtonBg,algoButtonColor:t.algoButtonColor,algoButtonSelectedBg:t.algoButtonSelectedBg,algoButtonSelectedColor:t.algoButtonSelectedColor}}))(B);r(30);var j=function(t){return n.a.createElement("div",{className:"nav-bar","data-test":"nav-component"},n.a.createElement("h2",{"data-test":"title",style:{color:t.titleColor}},"Sorting Visualizer"),n.a.createElement("button",{onClick:function(){return t.startSort()}},"Start"),n.a.createElement("button",{onClick:function(){return t.randomizeAlgo()}},"Randomize Algorithms"),n.a.createElement("button",{onClick:function(){return t.shuffleArray()}},"Shuffle"),n.a.createElement("button",{onClick:function(){return t.changeTheme()}},"Theme"))},_=Object(l.b)((function(t){return{titleColor:t.titleColor}}),(function(t){return{shuffleArray:function(){t({type:"SORTING_VISUALIZER_SHUFFLE_ARRAY"})},randomizeAlgo:function(){t({type:"SORTING_VISUALIZER_RANDOMIZE_ALGO"})},startSort:function(){t({type:"SORTING_VISUALIZER_START_SORT"})},changeTheme:function(){t({type:"SORTING_VISUALIZER_CHANGE_THEME"})}}}))(j);r(31);var I=function(t){return n.a.createElement("div",{className:"App","data-test":"app-component",style:{backgroundColor:t.appBackgroundColor}},n.a.createElement(_,null),n.a.createElement("div",{className:"grid","data-test":"grid-div"},n.a.createElement(N,null),n.a.createElement(N,null),n.a.createElement(N,null),n.a.createElement(N,null)))},D=Object(l.b)((function(t){return{appBackgroundColor:t.appBackgroundColor}}))(I);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(l.a,{store:p},n.a.createElement(D,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.628ca073.chunk.js.map