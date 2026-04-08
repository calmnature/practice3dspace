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
define("DS/DELWebProcessStructViewer/components/DELSwimLaneComp", ["require", "exports", "react", "DS/React18Loader/React", "DS/DELSwimLaneChart_v2/DELSwimLaneChart"], function (require, exports, React, React_1, DELSwimLaneChart_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    DELSwimLaneChart_1 = __importDefault(DELSwimLaneChart_1);
    /**
     * SwimLaneChart component
     */
    const DELSwimLaneComp = (0, React_1.memo)(({ swimLaneChartProps = {}, className = undefined, id = undefined, swimLaneReady }) => {
        /**
         * Reference to the container element for the SwimLaneChart
         */
        const swimLaneChartContainerRef = (0, React_1.useRef)(null);
        /**
         * Reference to the SwimLaneChart instance
         */
        const swimLaneChartRef = (0, React_1.useRef)(null);
        /**
         * Memoize the entire props object
         */
        const memoizedProps = (0, React_1.useMemo)(() => ({
            swimLaneChartProps,
        }), [swimLaneChartProps]);
        /**
         * Effect to initialize or update the SwimLaneChart
         */
        (0, React_1.useEffect)(() => {
            var _a, _b, _c;
            if (!swimLaneChartContainerRef.current)
                return;
            // If chart doesn't exist, create it
            if (!swimLaneChartRef.current) {
                createSwimLaneChartView();
            }
            else {
                // If chart already exists, update its properties dynamically
                swimLaneChartRef.current.model = (_a = memoizedProps.swimLaneChartProps) === null || _a === void 0 ? void 0 : _a.model;
                swimLaneChartRef.current.searchBar = (_b = memoizedProps.swimLaneChartProps) === null || _b === void 0 ? void 0 : _b.searchBar;
                swimLaneChartRef.current.onNodeDblSelect = (_c = memoizedProps.swimLaneChartProps) === null || _c === void 0 ? void 0 : _c.onNodeDblSelect;
            }
        }, [memoizedProps]);
        // Cleanup only when unmounting
        (0, React_1.useEffect)(() => {
            return () => {
                deleteSwimLaneChartView();
                swimLaneChartRef.current = null; // Clear reference to avoid memory leak
            };
        });
        /**
         * Function to create a new SwimLaneChart instance
         */
        const createSwimLaneChartView = () => {
            var _a, _b, _c;
            if (swimLaneChartContainerRef.current) {
                swimLaneChartRef.current = new DELSwimLaneChart_1.default({
                    searchBar: (_a = memoizedProps.swimLaneChartProps) === null || _a === void 0 ? void 0 : _a.searchBar, // Default to true if undefined
                    model: (_b = memoizedProps.swimLaneChartProps) === null || _b === void 0 ? void 0 : _b.model, // Default to an empty model if undefined
                    onNodeDblSelect: (_c = memoizedProps.swimLaneChartProps) === null || _c === void 0 ? void 0 : _c.onNodeDblSelect,
                });
                swimLaneChartContainerRef.current.appendChild(swimLaneChartRef.current);
            }
        };
        /**
         * Function to delete the SwimLaneChart instance
         */
        const deleteSwimLaneChartView = () => {
            if (swimLaneChartContainerRef.current && swimLaneChartRef.current) {
                swimLaneChartContainerRef.current.removeChild(swimLaneChartRef.current);
            }
        };
        const waitUntilSwimLaneisReady = () => {
            var _a;
            const swimLaneDoc = (_a = swimLaneChartRef.current) === null || _a === void 0 ? void 0 : _a.swimLaneChartdocument;
            if (!swimLaneDoc)
                return;
            // getting all nodes
            const nodes = swimLaneDoc.getAllNodes();
            if (!nodes || nodes.length === 0) {
                return;
            }
            swimLaneReady === null || swimLaneReady === void 0 ? void 0 : swimLaneReady(swimLaneDoc);
        };
        (0, React_1.useEffect)(() => {
            const raf = requestAnimationFrame(() => {
                waitUntilSwimLaneisReady();
            });
            return () => cancelAnimationFrame(raf);
        });
        return React.createElement("div", { id: id, className: className, ref: swimLaneChartContainerRef });
    });
    exports.default = DELSwimLaneComp;
});
