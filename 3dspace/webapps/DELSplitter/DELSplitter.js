/// <amd-module name="DS/DELSplitter/DELSplitter"/>
define("DS/DELSplitter/DELSplitter", ["require", "exports", "DS/React18Loader/React"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Splitter = ({ children }) => {
        let _left, _right;
        const [leftWidth, setLeftWidth] = React.useState(500);
        const containerRef = React.useRef(null);
        const isDragging = React.useRef(false);
        const startDragging = () => {
            isDragging.current = true;
        };
        const stopDragging = () => {
            isDragging.current = false;
        };
        const handleMouseMove = (e) => {
            if (!isDragging.current)
                return;
            const container = containerRef.current;
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const newLeftWidth = e.clientX - containerRect.left;
                if (newLeftWidth > 10 && newLeftWidth < containerRect.width - 10) {
                    setLeftWidth(newLeftWidth);
                }
            }
        };
        React.useEffect(() => {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", stopDragging);
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", stopDragging);
            };
        }, []);
        React.Children.forEach(children, (child) => {
            if (!child) {
                return;
            }
            if (child.type === SplitLayoutRight) {
                return (_right = child);
            }
            if (child.type === SplitLayoutLeft) {
                return (_left = child);
            }
        });
        return (React.createElement("div", { className: "d-flex w-100 h-100 position-relative", ref: containerRef },
            React.createElement("div", { style: { width: leftWidth }, className: _right ? "h-100" : "w-100 h-100" }, _left),
            React.createElement("div", { "data-testid": "splitter-handle", className: _right ? "position-relative z-1" : "d-none", style: {
                    cursor: "ew-resize",
                    width: 8,
                    margin: "0 -2px",
                    boxSizing: "border-box",
                    backgroundColor: "transparent",
                }, onMouseDown: startDragging }),
            React.createElement("div", { style: { borderLeft: "1px solid #d1d4d4", flex: 1 }, className: _right ? "w-100" : "d-none" }, _right)));
    };
    // Define sub-components to represent the left and right panes
    Splitter.Left = ({ children }) => {
        return React.createElement("div", null, children);
    };
    Splitter.Right = ({ children }) => {
        return React.createElement("div", null, children);
    };
    const SplitLayoutLeft = ({ children }) => (React.createElement("div", { className: "overflow-auto h-100" }, children));
    const SplitLayoutRight = ({ children }) => (React.createElement("div", { className: "overflow-auto h-100" }, children));
    Splitter.Left = SplitLayoutLeft;
    Splitter.Right = SplitLayoutRight;
    exports.default = Splitter;
});
