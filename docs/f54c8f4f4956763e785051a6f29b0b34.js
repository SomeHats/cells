// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({13:[function(require,module,exports) {
"use strict";var e=function(e,r,n,i,o,a,t,f){if(!e){var s;if(void 0===r)s=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[n,i,o,a,t,f],l=0;(s=new Error(r.replace(/%s/g,function(){return d[l++]}))).name="Invariant Violation"}throw s.framesToPop=1,s}};module.exports=e;
},{}],15:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){return function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var n=[],i=!0,r=!1,u=void 0;try{for(var h,a=t[Symbol.iterator]();!(i=(h=a.next()).done)&&(n.push(h.value),!e||n.length!==e);i=!0);}catch(t){r=!0,u=t}finally{try{!i&&a.return&&a.return()}finally{if(r)throw u}}return n}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),e=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),n=require("invariant"),i=r(n);function r(t){return t&&t.__esModule?t:{default:t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var h=function(){function n(t,e,r){u(this,n),(0,i.default)(t>0,"width must be positive"),(0,i.default)(e>0,"height must be positive"),this.width=t,this.height=e,null!=r?((0,i.default)(r.length===t*e,"initial cell length must equal WxH"),this.cells=r):this.cells=new Array(t*e).fill(null)}return e(n,[{key:"coordsToIndex",value:function(t,e){return(0,i.default)(t>=0,"x must be greater than 0"),(0,i.default)(t<this.width,"x must be less than width"),(0,i.default)(e>=0,"y must be greater than 0"),(0,i.default)(e<this.height,"y must be less than height"),t+e*this.width}},{key:"wrapX",value:function(t){return t<0?this.width+t%this.width:t%this.width}},{key:"indexToXCoord",value:function(t){return(0,i.default)(t>=0,"index must be greater than 0"),(0,i.default)(t<this.length,"index must be less than length"),t%this.width}},{key:"wrapY",value:function(t){return t<0?this.height+t%this.height:t%this.height}},{key:"indexToYCoord",value:function(t){return(0,i.default)(t>=0,"index must be greater than 0"),(0,i.default)(t<this.length,"index must be less than length"),Math.floor(t/this.width)}},{key:"forEach",value:function(t){var e=this;this.cells.forEach(function(n,i){var r=e.indexToXCoord(i),u=e.indexToYCoord(i);t(n,r,u,e)})}},{key:"map",value:function(t){var e=this,i=new Array(this.length);return this.forEach(function(n,r,u){var h=e.coordsToIndex(r,u);i[h]=t(n,r,u,e)}),new n(this.width,this.height,i)}},{key:"fill",value:function(t){return this.map(function(){return t})}},{key:"valueAtIndex",value:function(t){return(0,i.default)(t>=0,"index must be positive"),(0,i.default)(t<this.length,"index must be less than length"),this.cells[t]}},{key:"valueAtCoords",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2]?this.coordsToIndex(this.wrapX(t),this.wrapY(e)):this.coordsToIndex(t,e);return this.valueAtIndex(n)}},{key:"neighboursRoundCoord",value:function(e,n){var i=this;return[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]].map(function(r){var u=t(r,2),h=u[0],a=u[1];return i.valueAtCoords(i.wrapX(e+h),i.wrapY(n+a))})}},{key:"areCoordsAtEdge",value:function(t,e){return 0===t||t===this.width-1||0===e||e===this.height-1}},{key:"length",get:function(){return(0,i.default)(this.cells.length===this.width*this.height,"length must be consistent"),this.cells.length}}]),n}();exports.default=h;
},{"invariant":13}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=i;var t=require("./grid"),e=F(t);function F(t){return t&&t.__esModule?t:{default:t}}var h=["#000000","#FFFFFF","#ff1744","#1DE9B6","#F50057","#00E676","#D500F9","#76FF03","#651FFF","#C6FF00","#3D5AFE","#FFEA00","#2979FF","#FFC400","#00B0FF","#FF9100","#00E5FF","#FF3D00"];function i(t,e){var F=e.canvas;F.width!==t.width||F.height!==t.height?(F.width=t.width,F.height=t.height,F.style.width=4*t.width+"px",F.style.height=4*t.height+"px"):e.clearRect(0,0,t.width,t.height),t.forEach(function(t,F,i){e.fillStyle=null==t?"#777":h[t%h.length],e.fillRect(F,i,1,1)})}
},{"./grid":15}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default={initial:function(){return 0},step:function(){return Math.random()<.5?0:1}};
},{}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Grid"),r=t(e);function t(e){return e&&e.__esModule?e:{default:e}}exports.default={initial:function(){return Math.random()<.1?1:0},step:function(e,r,t,n){var u=n.neighboursRoundCoord(r,t).filter(function(e){return!!e}).length;return e&&u<2?0:e&&u>3?0:e?1:e||3!==u?0:1}};
},{"../Grid":15}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("../Grid"),e=r(t);function r(t){return t&&t.__esModule?t:{default:t}}exports.default={initial:function(){return 0},step:function(t,e,r,i,n){var a=e/10+n/300,u=(e+1)/10+n/300,o=i.height/2,s=o+Math.floor(o*Math.sin(a)),f=o+Math.floor(o*Math.sin(u)),h=Math.min(s,f),l=Math.max(s,f);return h<=r&&r<=l?1:0}};
},{"../Grid":15}],14:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=exports.constrain=function(t,e,r){var a=Math.min(t,e),n=Math.max(t,e);return Math.min(n,Math.max(a,r))},e=exports.chance=function(e){return Math.random()<t(0,1,e)};
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../Grid"),r=c(e),t=require("../lib/util");function c(e){return e&&e.__esModule?e:{default:e}}var n=0,a=n++,u=n++,o=n++,i=n++,h=n++,l=n++,d=n++,s=n++,f=.5,v=.005,A=.01,C=3,p=.4,_=4,M=.2;exports.default={initial:function(e,r,t){return r===t.height-1&&e===Math.floor(t.width/2)?o:a},step:function(e,r,c,n){var b=n.valueAtCoords(r,c+1,!0),q=n.valueAtCoords(r,c-1,!0),w=n.valueAtCoords(r-1,c,!0),x=n.valueAtCoords(r+1,c,!0),g=n.valueAtCoords(r-1,c+1,!0),j=n.valueAtCoords(r+1,c+1,!0),y=n.valueAtCoords(r-1,c-1,!0),G=n.valueAtCoords(r+1,c-1,!0);if(0===c||0===r||r===n.width-1)return a;if(e===a&&b===o&&(0,t.chance)(f))return o;if(e===o&&q!==a&&(0,t.chance)(v))return(0,t.chance)(.5)?i:h;if(e===o&&(0,t.chance)(A))return u;if(e===a&&b===a&&g===h&&(0,t.chance)(f*p))return h;if(e===a&&b===a&&j===i&&(0,t.chance)(f*p))return i;if((e===i&&y!==a||e===h&&G!==a)&&(0,t.chance)(v)){var O=e===i?l:d;return(0,t.chance)(.5)?O:s}return e!==i&&e!==h||!(0,t.chance)(A*C)?e===a&&b===s&&(0,t.chance)(f*M)?s:e===a&&x===l&&(0,t.chance)(f*M)?l:e===a&&w===d&&(0,t.chance)(f*M)?d:e!==s&&e!==d&&e!==l||!(0,t.chance)(A*_)?e:u:u}};
},{"../Grid":15,"../lib/util":14}],6:[function(require,module,exports) {
"use strict";var e=require("invariant"),n=v(e),r=require("./render"),t=v(r),a=require("./Grid"),i=v(a),u=require("./steppers/noise"),o=v(u),s=require("./steppers/conway"),d=v(s),c=require("./steppers/sin"),f=v(c),l=require("./steppers/tree"),p=v(l);function v(e){return e&&e.__esModule?e:{default:e}}function w(){var e=document.querySelector("canvas");(0,n.default)(e instanceof HTMLCanvasElement,"canvas must be a canvas");var r=e.getContext("2d");(0,n.default)(r instanceof CanvasRenderingContext2D,"context is borked"),m(r,p.default)}function m(e,n){var r=new i.default(100,100).map(function(e,r,t,a){return n.initial(r,t,a)});(0,t.default)(r,e),window.requestAnimationFrame(a);function a(){var i=window.performance.now();r=r.map(function(e,r,t,a){return n.step(e,r,t,a,i)}),(0,t.default)(r,e),window.requestAnimationFrame(a)}}window.addEventListener("load",w,!0);
},{"invariant":13,"./render":7,"./Grid":15,"./steppers/noise":9,"./steppers/conway":10,"./steppers/sin":11,"./steppers/tree":12}]},{},[6])