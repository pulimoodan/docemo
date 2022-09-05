exports.id = 533;
exports.ids = [533];
exports.modules = {

/***/ 1631:
/***/ ((module) => {

// Exports
module.exports = {
	"footer": "Footer_footer__AxF0B"
};


/***/ }),

/***/ 726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CartModal)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6796);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9097);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);





function CartModal({ show , setShow  }) {
    const cartItems = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_contexts_CartContext__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        show: show,
        size: "lg",
        "aria-labelledby": "contained-modal-title-vcenter",
        centered: true,
        onHide: ()=>setShow(false),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Header, {
                closeButton: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Title, {
                    id: "contained-modal-title-vcenter",
                    children: "Cart"
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.ListGroup, {
                variant: "flush",
                children: [
                    cartItems.items?.length == 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.ListGroup.Item, {
                        className: "py-3",
                        children: "Nothing here"
                    }),
                    cartItems.items?.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.ListGroup.Item, {
                            className: "py-3 d-flex justify-content-between align-items-center",
                            children: [
                                item.name,
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "badge bg-secondary rounded-pill me-3",
                                            children: item.quantity
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: "btn-group me-3",
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    className: "btn btn-dark",
                                                    onClick: ()=>cartItems.decreaseItem(item),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: `bi-dash m-auto text-white`
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                    className: "btn btn-dark",
                                                    onClick: ()=>cartItems.increaseItem(item),
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: `bi-plus m-auto text-white`
                                                    })
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                            className: "btn btn-danger",
                                            onClick: ()=>cartItems.removeItem(item),
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: `bi-x-lg m-auto text-white`
                                            })
                                        })
                                    ]
                                })
                            ]
                        }, item.id))
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal.Footer, {
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        className: "btn-secondary",
                        onClick: ()=>cartItems.resetItems(),
                        children: "Reset"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
                        href: "/checkout",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            className: "ms-auto",
                            disabled: cartItems.items.length == 0,
                            children: "Checkout"
                        })
                    })
                ]
            })
        ]
    });
};


/***/ }),

/***/ 8563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Footer_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1631);
/* harmony import */ var _Footer_module_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Footer_module_css__WEBPACK_IMPORTED_MODULE_1__);


function Footer() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("footer", {
        className: `${(_Footer_module_css__WEBPACK_IMPORTED_MODULE_1___default().footer)} bg-light`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "container",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "col-lg-6 h-100 text-center text-lg-start my-auto",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-muted small mb-4 mb-lg-0",
                        children: "\xa9 Docemo business solutions. All Rights Reserved."
                    })
                })
            })
        })
    });
};


/***/ }),

/***/ 8037:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ Navbar)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./contexts/CartContext.tsx
var CartContext = __webpack_require__(6796);
// EXTERNAL MODULE: ../../node_modules/next/link.js
var next_link = __webpack_require__(9097);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ../../assets/img/logo-1.png
/* harmony default export */ const logo_1 = ({"src":"/_next/static/media/logo-1.909ae0e2.png","height":47,"width":159,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAACCAYAAABllJ3tAAAATElEQVR4nGNkYGBgLt9gHM/Nz6q1pO06H8fuj8cunuH8cPfRn/sqQb/vgBSI5i3WDxCT55JfO/WuwP+Vr+6fO80p8ODZnztK/r93AQBk6R4nfWkkogAAAABJRU5ErkJggg=="});
;// CONCATENATED MODULE: ./components/navbar/index.tsx





function Navbar({ setShowCart  }) {
    const cartItems = (0,external_react_.useContext)(CartContext/* default */.Z);
    return /*#__PURE__*/ jsx_runtime_.jsx("nav", {
        className: "navbar navbar-expand-lg navbar-light bg-light",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "container justify-content-between",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: "/",
                    className: "navbar-brand",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        style: {
                            cursor: "pointer"
                        },
                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            src: logo_1.src,
                            alt: "Docemo logo",
                            style: {
                                width: "100px"
                            }
                        })
                    })
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                        type: "button",
                        className: "btn btn-primary position-relative",
                        onClick: ()=>setShowCart(true),
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                                className: `bi-bag m-auto text-white`
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                                className: "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",
                                children: [
                                    cartItems.items.length,
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        className: "visually-hidden",
                                        children: "unread messages"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};


/***/ }),

/***/ 6796:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const CartContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CartContext);


/***/ })

};
;