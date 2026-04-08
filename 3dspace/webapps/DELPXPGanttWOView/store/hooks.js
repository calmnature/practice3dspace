/// <amd-module name="DS/DELPXPGanttWOView/store/hooks"/>
define("DS/DELPXPGanttWOView/store/hooks", ["require", "exports", "DS/ReactRedux/ReactRedux"], function (require, exports, ReactRedux_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.useAppSelector = exports.useAppDispatch = void 0;
    // Use throughout your app instead of plain `useDispatch` and `useSelector`
    const useAppDispatch = () => (0, ReactRedux_1.useDispatch)();
    exports.useAppDispatch = useAppDispatch;
    exports.useAppSelector = ReactRedux_1.useSelector;
});
