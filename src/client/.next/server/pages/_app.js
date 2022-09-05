"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 6796:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartContext);


/***/ }),

/***/ 5118:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contexts_CartContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6796);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);





function App({ Component , pageProps  }) {
    const { 0: items , 1: setItems  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: updatedTrigger , 1: setUpdatedTrigger  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const addItem = (product)=>{
        const index = items.map((item)=>item.id).indexOf(product.id);
        if (index > -1) {
            const newItems = items;
            newItems[index].quantity += 1;
            setItems(newItems);
        } else {
            setItems((oldItems)=>[
                    ...oldItems,
                    {
                        ...product,
                        quantity: 1
                    }
                ]);
        }
        setUpdatedTrigger((state)=>!state);
    };
    const removeItem = (product)=>{
        const newItems = items.filter((item)=>item.id != product.id);
        setItems(newItems);
    };
    const increaseItem = (product)=>{
        const index = items.findIndex((x)=>x.id === product.id);
        const newItems = items;
        newItems[index].quantity += 1;
        setItems(newItems);
        setUpdatedTrigger((state)=>!state);
    };
    const decreaseItem = (product)=>{
        const index = items.findIndex((x)=>x.id === product.id);
        const newItems = items;
        newItems[index].quantity -= 1;
        if (newItems[index].quantity <= 0) {
            removeItem(product);
        } else {
            setItems(newItems);
        }
        setUpdatedTrigger((state)=>!state);
    };
    const resetItems = ()=>{
        setItems([]);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_contexts_CartContext__WEBPACK_IMPORTED_MODULE_1__/* ["default"].Provider */ .Z.Provider, {
        value: {
            updatedTrigger,
            items,
            addItem,
            removeItem,
            resetItems,
            increaseItem,
            decreaseItem
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
            ...pageProps
        })
    });
};


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(5118));
module.exports = __webpack_exports__;

})();