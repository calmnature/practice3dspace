/// <amd-module name="DS/DELPXPPlanningChartsV1/typings/GanttTypes"/>
define("DS/DELPXPPlanningChartsV1/typings/GanttTypes", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebGantt = exports.TimeScale = exports.Node = exports.Row = exports.LoaderPlain = exports.Loader = void 0;
    class Loader {
        close() { }
        ;
        updateDataset(data) { }
        ;
    }
    exports.Loader = Loader;
    class LoaderPlain extends Loader {
        reloadData(options) { }
        ;
    }
    exports.LoaderPlain = LoaderPlain;
    class Row {
    }
    exports.Row = Row;
    class Node {
        setMoveMode(horizontalMove, verticalMove, dropOnNode) { }
        ;
        dropExternalNode(nodeId, dteId, startDate) { }
        ;
        highlightLinked(nodeIds, focus, doNotSelect) { }
        ;
        highlight(nodeIds, focus, doNotSelect) { }
        ;
        cancelHighlight() { }
        ;
        scrollTo(nodeId) { }
        ;
    }
    exports.Node = Node;
    class TimeScale {
        gotoDate(start, end, truncate) { }
        ;
        scrollTo(start) { }
        ;
    }
    exports.TimeScale = TimeScale;
    class WebGantt {
        static create(elem, opts, loader) { }
        ;
        static createPlainDataLoader(options) { }
        ;
        static createCustomDataLoader(options) { }
        ;
        setDataLoader(loader, mappings) { }
        ;
        resize(width, height) { }
        ;
        destroy() { }
        ;
        exportState(compress) { }
        ;
        registerEvent(name, callback, thisArg, tagName) { }
        ;
        unregisterEvent(name, tagName) { }
        ;
    }
    exports.WebGantt = WebGantt;
});
