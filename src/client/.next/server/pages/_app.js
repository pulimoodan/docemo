/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./contexts/CartContext.tsx":
/*!**********************************!*\
  !*** ./contexts/CartContext.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartContext);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0cy9DYXJ0Q29udGV4dC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXNDO0FBRXRDLE1BQU1DLFdBQVcsaUJBQUdELG9EQUFhLENBQUMsSUFBSSxDQUFDO0FBRXZDLGlFQUFlQyxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb250ZXh0cy9DYXJ0Q29udGV4dC50c3g/NTQ1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xyXG5cclxuY29uc3QgQ2FydENvbnRleHQgPSBjcmVhdGVDb250ZXh0KG51bGwpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ2FydENvbnRleHQ7Il0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJDYXJ0Q29udGV4dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./contexts/CartContext.tsx\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bootstrap/dist/css/bootstrap.css */ \"../../node_modules/bootstrap/dist/css/bootstrap.css\");\n/* harmony import */ var bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bootstrap_dist_css_bootstrap_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap-icons/font/bootstrap-icons.css */ \"../../node_modules/bootstrap-icons/font/bootstrap-icons.css\");\n/* harmony import */ var bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap_icons_font_bootstrap_icons_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../contexts/CartContext */ \"./contexts/CartContext.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nfunction App({ Component , pageProps  }) {\n    const { 0: items , 1: setItems  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)([]);\n    const { 0: updatedTrigger , 1: setUpdatedTrigger  } = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(false);\n    const addItem = (product)=>{\n        let index = items.map((item)=>item.id).indexOf(product.id);\n        if (index > -1) {\n            let newItems = items;\n            newItems[index].quantity += 1;\n            setItems(newItems);\n        } else {\n            setItems((oldItems)=>[\n                    ...oldItems,\n                    {\n                        ...product,\n                        quantity: 1\n                    }\n                ]);\n        }\n        setUpdatedTrigger((state)=>!state);\n    };\n    const removeItem = (product)=>{\n        let newItems = items.filter((item)=>item.id != product.id);\n        setItems(newItems);\n    };\n    const increaseItem = (product)=>{\n        let index = items.findIndex((x)=>x.id === product.id);\n        let newItems = items;\n        newItems[index].quantity += 1;\n        setItems(newItems);\n        setUpdatedTrigger((state)=>!state);\n    };\n    const decreaseItem = (product)=>{\n        let index = items.findIndex((x)=>x.id === product.id);\n        let newItems = items;\n        newItems[index].quantity -= 1;\n        if (newItems[index].quantity <= 0) {\n            removeItem(product);\n        } else {\n            setItems(newItems);\n        }\n        setUpdatedTrigger((state)=>!state);\n    };\n    const resetItems = ()=>{\n        setItems([]);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Provider, {\n        value: {\n            updatedTrigger,\n            items,\n            addItem,\n            removeItem,\n            resetItems,\n            increaseItem,\n            decreaseItem\n        },\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"G:\\\\windows-server-support\\\\src\\\\client\\\\pages\\\\_app.tsx\",\n            lineNumber: 56,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"G:\\\\windows-server-support\\\\src\\\\client\\\\pages\\\\_app.tsx\",\n        lineNumber: 55,\n        columnNumber: 9\n    }, this);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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WUFBRXJCLGNBQWM7WUFBRUYsS0FBSztZQUFFSSxPQUFPO1lBQUVXLFVBQVU7WUFBRU0sVUFBVTtZQUFFSixZQUFZO1lBQUVHLFlBQVk7U0FBRTtrQkFDL0csNEVBQUN0QixTQUFTO1lBQUUsR0FBR0MsU0FBUzs7Ozs7Z0JBQUk7Ozs7O1lBQ1QsQ0FDMUI7Q0FFSiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcblxyXG5pbXBvcnQgJ2Jvb3RzdHJhcC9kaXN0L2Nzcy9ib290c3RyYXAuY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAtaWNvbnMvZm9udC9ib290c3RyYXAtaWNvbnMuY3NzJztcclxuXHJcbmltcG9ydCBDYXJ0Q29udGV4dCBmcm9tICcuLi9jb250ZXh0cy9DYXJ0Q29udGV4dCc7XHJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpIHtcclxuICAgIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGUoW10pO1xyXG4gICAgY29uc3QgW3VwZGF0ZWRUcmlnZ2VyLCBzZXRVcGRhdGVkVHJpZ2dlcl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgY29uc3QgYWRkSXRlbSA9IChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gaXRlbXMubWFwKGl0ZW0gPT4gaXRlbS5pZCkuaW5kZXhPZihwcm9kdWN0LmlkKTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBsZXQgbmV3SXRlbXMgPSBpdGVtcztcclxuICAgICAgICAgICAgbmV3SXRlbXNbaW5kZXhdLnF1YW50aXR5ICs9IDFcclxuICAgICAgICAgICAgc2V0SXRlbXMobmV3SXRlbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEl0ZW1zKG9sZEl0ZW1zID0+IFsuLi5vbGRJdGVtcywgeyAuLi5wcm9kdWN0LCBxdWFudGl0eTogMSB9XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFVwZGF0ZWRUcmlnZ2VyKChzdGF0ZSkgPT4gIXN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW1vdmVJdGVtID0gKHByb2R1Y3QpID0+IHtcclxuICAgICAgICBsZXQgbmV3SXRlbXMgPSBpdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0uaWQgIT0gcHJvZHVjdC5pZCk7XHJcbiAgICAgICAgc2V0SXRlbXMobmV3SXRlbXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluY3JlYXNlSXRlbSA9IChwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gaXRlbXMuZmluZEluZGV4KHggPT4geC5pZCA9PT0gcHJvZHVjdC5pZCk7XHJcbiAgICAgICAgbGV0IG5ld0l0ZW1zID0gaXRlbXM7XHJcbiAgICAgICAgbmV3SXRlbXNbaW5kZXhdLnF1YW50aXR5ICs9IDE7XHJcbiAgICAgICAgc2V0SXRlbXMobmV3SXRlbXMpO1xyXG4gICAgICAgIHNldFVwZGF0ZWRUcmlnZ2VyKChzdGF0ZSkgPT4gIXN0YXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBkZWNyZWFzZUl0ZW0gPSAocHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGxldCBpbmRleCA9IGl0ZW1zLmZpbmRJbmRleCh4ID0+IHguaWQgPT09IHByb2R1Y3QuaWQpO1xyXG4gICAgICAgIGxldCBuZXdJdGVtcyA9IGl0ZW1zO1xyXG4gICAgICAgIG5ld0l0ZW1zW2luZGV4XS5xdWFudGl0eSAtPSAxO1xyXG4gICAgICAgIGlmIChuZXdJdGVtc1tpbmRleF0ucXVhbnRpdHkgPD0gMCkge1xyXG4gICAgICAgICAgICByZW1vdmVJdGVtKHByb2R1Y3QpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEl0ZW1zKG5ld0l0ZW1zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2V0VXBkYXRlZFRyaWdnZXIoKHN0YXRlKSA9PiAhc3RhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc2V0SXRlbXMgPSAoKSA9PiB7XHJcbiAgICAgICAgc2V0SXRlbXMoW10pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPENhcnRDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt7IHVwZGF0ZWRUcmlnZ2VyLCBpdGVtcywgYWRkSXRlbSwgcmVtb3ZlSXRlbSwgcmVzZXRJdGVtcywgaW5jcmVhc2VJdGVtLCBkZWNyZWFzZUl0ZW0gfX0+XHJcbiAgICAgICAgICAgIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cclxuICAgICAgICA8L0NhcnRDb250ZXh0LlByb3ZpZGVyPlxyXG4gICAgKVxyXG5cclxufSJdLCJuYW1lcyI6WyJDYXJ0Q29udGV4dCIsInVzZVN0YXRlIiwiQXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIiwiaXRlbXMiLCJzZXRJdGVtcyIsInVwZGF0ZWRUcmlnZ2VyIiwic2V0VXBkYXRlZFRyaWdnZXIiLCJhZGRJdGVtIiwicHJvZHVjdCIsImluZGV4IiwibWFwIiwiaXRlbSIsImlkIiwiaW5kZXhPZiIsIm5ld0l0ZW1zIiwicXVhbnRpdHkiLCJvbGRJdGVtcyIsInN0YXRlIiwicmVtb3ZlSXRlbSIsImZpbHRlciIsImluY3JlYXNlSXRlbSIsImZpbmRJbmRleCIsIngiLCJkZWNyZWFzZUl0ZW0iLCJyZXNldEl0ZW1zIiwiUHJvdmlkZXIiLCJ2YWx1ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "../../node_modules/bootstrap-icons/font/bootstrap-icons.css":
/*!*******************************************************************!*\
  !*** ../../node_modules/bootstrap-icons/font/bootstrap-icons.css ***!
  \*******************************************************************/
/***/ (() => {



/***/ }),

/***/ "../../node_modules/bootstrap/dist/css/bootstrap.css":
/*!***********************************************************!*\
  !*** ../../node_modules/bootstrap/dist/css/bootstrap.css ***!
  \***********************************************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();