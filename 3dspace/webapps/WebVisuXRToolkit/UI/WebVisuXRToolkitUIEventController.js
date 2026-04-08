/// <amd-module name="DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController"/>
define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitUIEventController = exports.XREvents = exports.FMEvents = exports.QMEvents = void 0;
    var QMEvents;
    (function (QMEvents) {
        QMEvents["QMUpdated"] = "qmUpdated";
        QMEvents["QMNewSkillSelected"] = "qmNewSkillSelected";
    })(QMEvents || (exports.QMEvents = QMEvents = {}));
    var FMEvents;
    (function (FMEvents) {
        //Add FM related events
    })(FMEvents || (exports.FMEvents = FMEvents = {}));
    var XREvents;
    (function (XREvents) {
        XREvents["FrameChanged"] = "frameChanged";
    })(XREvents || (exports.XREvents = XREvents = {}));
    class WebVisuXRToolkitUIEventController extends EventTarget {
        constructor() {
            super();
            // Stores listeners with optional priorities
            this.listenerMap = {};
        }
        static get instance() {
            if (!this.ins) {
                this.ins = new WebVisuXRToolkitUIEventController();
            }
            return this.ins;
        }
        emit(eventName, detail) {
            const event = new CustomEvent(eventName, { detail });
            this.dispatchEvent(event);
        }
        /**
         * Register an event listener with optional priority (default = 0)
         */
        on(eventName, callback, priority = 0) {
            if (!this.listenerMap[eventName]) {
                this.listenerMap[eventName] = [];
                // Attach a single dispatcher for this event
                super.addEventListener(eventName, (event) => {
                    const customEvent = event;
                    const sorted = [...this.listenerMap[eventName]].sort((a, b) => b.priority - a.priority);
                    for (const listener of sorted) {
                        listener.callback(customEvent);
                    }
                });
            }
            this.listenerMap[eventName].push({ callback, priority });
        }
        /**
         * Remove a previously registered listener
         */
        off(eventName, callback) {
            const listeners = this.listenerMap[eventName];
            if (!listeners)
                return;
            this.listenerMap[eventName] = listeners.filter(listener => listener.callback !== callback);
            // If no listeners left, remove the event listener completely (optional)
            if (this.listenerMap[eventName].length === 0) {
                delete this.listenerMap[eventName];
            }
        }
    }
    exports.WebVisuXRToolkitUIEventController = WebVisuXRToolkitUIEventController;
});
