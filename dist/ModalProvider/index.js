"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var qs_1 = __importDefault(require("qs"));
var body_scroll_lock_1 = require("body-scroll-lock");
var generateCSS_1 = __importDefault(require("./generateCSS"));
var context_1 = __importDefault(require("./context"));
var reducer_1 = __importDefault(require("./reducer"));
var getSearchQuery = function () {
    if (typeof window !== 'undefined') {
        return qs_1.default.parse(window.location.search, { ignoreQueryPrefix: true });
    }
};
var getModalParamArray = function () {
    var searchQuery = getSearchQuery();
    var params = [];
    if (searchQuery && searchQuery.modal) {
        if (typeof searchQuery.modal === 'string') {
            params = [searchQuery.modal];
        }
        else if (Array.isArray(searchQuery.modal)) {
            params = searchQuery.modal;
        }
    }
    return params;
};
var ModalProvider = function (props) {
    var classPrefix = props.classPrefix, _a = props.minifyCSS, minifyCSS = _a === void 0 ? true : _a, _b = props.generateCSS, shouldGenerateCSS = _b === void 0 ? true : _b, _c = props.zIndex, zIndex = _c === void 0 ? 9999 : _c, handleParamChange = props.handleParamChange, children = props.children, _d = props.transTime, transTime = _d === void 0 ? 250 : _d;
    var containerRef = (0, react_1.useRef)(null);
    var _e = (0, react_1.useReducer)(reducer_1.default, {}, function () {
        var initialParams = getModalParamArray();
        var initialState = initialParams.reduce(function (acc, param) {
            acc[param] = {
                slug: param,
                isOpen: true,
                openedOn: Date.now(),
            };
            return acc;
        }, {});
        return initialState;
    }), modalState = _e[0], dispatchModalState = _e[1];
    var _f = (0, react_1.useState)(false), oneIsOpen = _f[0], setOneIsOpen = _f[1];
    var _g = (0, react_1.useState)(false), closeOnBlur = _g[0], setCloseOnBlur = _g[1];
    var _h = (0, react_1.useState)(false), bodyScrollIsLocked = _h[0], setBodyScrollIsLocked = _h[1];
    var _j = (0, react_1.useState)(''), cssString = _j[0], setCSSString = _j[1];
    var escIsBound = (0, react_1.useRef)(false);
    var bindEsc = (0, react_1.useCallback)(function (e) {
        if (e.code === 'Escape') {
            dispatchModalState({
                type: 'CLOSE_LATEST_MODAL',
            });
        }
    }, []);
    // Bind esc key to close all modals
    (0, react_1.useEffect)(function () {
        if (!escIsBound.current) {
            document.addEventListener('keydown', function (e) { return bindEsc(e); }, false);
            escIsBound.current = true;
        }
        return function () {
            if (escIsBound.current) {
                document.removeEventListener('keydown', function (e) { return bindEsc(e); }, false);
            }
        };
    }, [bindEsc]);
    // Generate CSS to inject into stylesheet
    (0, react_1.useEffect)(function () {
        if (shouldGenerateCSS) {
            var newString = '';
            newString = (0, generateCSS_1.default)({
                classPrefix: classPrefix,
                zIndex: zIndex
            });
            if (minifyCSS)
                newString = newString.replace(/\n/g, '').replace(/\s\s+/g, ' ');
            setCSSString(newString);
        }
    }, [
        shouldGenerateCSS,
        minifyCSS,
        zIndex,
        classPrefix
    ]);
    // Handle param changes
    (0, react_1.useEffect)(function () {
        if (typeof handleParamChange === 'function') {
            handleParamChange(modalState);
        }
        if (typeof handleParamChange === 'boolean' && handleParamChange) {
            var openModals = Object.keys(modalState).filter(function (slug) { return modalState[slug].isOpen; });
            var queryWithModal = qs_1.default.stringify({
                modal: openModals
            }, {
                addQueryPrefix: true,
                encode: false,
            });
            var newURL = "".concat(window.location.pathname).concat(queryWithModal);
            window.history.pushState({}, '', newURL);
        }
    }, [
        modalState,
        handleParamChange,
    ]);
    // Determine if any modals are open
    (0, react_1.useEffect)(function () {
        var isOneOpen = Object.keys(modalState).some(function (key) { return modalState[key].isOpen; });
        setOneIsOpen(isOneOpen);
    }, [modalState]);
    var setBodyScrollLock = (0, react_1.useCallback)(function (shouldLock, excludingRef) {
        if (excludingRef) {
            if (shouldLock) {
                (0, body_scroll_lock_1.disableBodyScroll)(excludingRef);
                setBodyScrollIsLocked(true);
            }
            else {
                (0, body_scroll_lock_1.enableBodyScroll)(excludingRef);
                setBodyScrollIsLocked(false);
            }
        }
    }, []);
    var setContainerRef = (0, react_1.useCallback)(function (ref) {
        containerRef.current = ref;
    }, []);
    var openModal = (0, react_1.useCallback)(function (slug) {
        dispatchModalState({
            type: 'OPEN_MODAL',
            payload: {
                slug: slug,
            }
        });
    }, []);
    var closeModal = (0, react_1.useCallback)(function (slug) {
        dispatchModalState({
            type: 'CLOSE_MODAL',
            payload: {
                slug: slug,
            }
        });
    }, []);
    var closeAllModals = (0, react_1.useCallback)(function () {
        dispatchModalState({
            type: 'CLOSE_ALL_MODALS'
        });
    }, []);
    var toggleModal = (0, react_1.useCallback)(function (slug) {
        dispatchModalState({
            type: 'TOGGLE_MODAL',
            payload: {
                slug: slug,
            }
        });
    }, []);
    var isModalOpen = (0, react_1.useCallback)(function (slug) {
        return modalState[slug] && modalState[slug].isOpen;
    }, [modalState]);
    var inheritedProps = __assign({}, props);
    delete inheritedProps.children;
    return (react_1.default.createElement(react_1.Fragment, null,
        shouldGenerateCSS && react_1.default.createElement("style", { dangerouslySetInnerHTML: { __html: cssString } }),
        react_1.default.createElement(context_1.default.Provider, { value: __assign(__assign({}, inheritedProps), { transTime: transTime, 
                // state
                containerRef: containerRef, modalState: modalState, oneModalIsOpen: oneIsOpen, isModalOpen: isModalOpen, closeOnBlur: closeOnBlur, bodyScrollIsLocked: bodyScrollIsLocked, classPrefix: classPrefix, 
                // methods
                closeAllModals: closeAllModals, setCloseOnBlur: setCloseOnBlur, openModal: openModal, closeModal: closeModal, toggleModal: toggleModal, setBodyScrollLock: setBodyScrollLock, setContainerRef: setContainerRef }) }, children)));
};
exports.default = ModalProvider;
//# sourceMappingURL=index.js.map