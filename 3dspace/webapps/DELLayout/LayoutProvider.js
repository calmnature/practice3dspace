define(["require", "exports", "DS/React18Loader/React"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DELLayoutContext = exports.DELLayoutProvider = void 0;
    exports.useDELLayoutContext = useDELLayoutContext;
    const DELLayoutContext = React.createContext(null);
    exports.DELLayoutContext = DELLayoutContext;
    function useDELLayoutContext() {
        const context = React.useContext(DELLayoutContext);
        if (!context) {
            throw new Error("useDELLayout must be used within a DELSidebarProvider");
        }
        return context;
    }
    // TODO: separer les providers et les components
    const DELLayoutProvider = React.forwardRef(({ className, style, children, ...props }, ref) => {
        const [activeComponent, setActiveComponent] = React.useState(null);
        const [pinnedComponent, setPinnedComponent] = React.useState(null);
        const [components, setComponents] = React.useState([]);
        const activateComponent = (component) => {
            // Clear active component
            if (component == null) {
                setComponents(components.filter((c) => c !== activeComponent));
                setActiveComponent(null);
                return;
            }
            // Set active component and manage components list
            setComponents(pinnedComponent ? [pinnedComponent, component] : [component]);
            setActiveComponent(component);
        };
        const pinComponent = (component) => {
            // Update pinned component and reset components to include it with active
            setPinnedComponent(component);
            setComponents([component]);
        };
        // Memoize the context value to avoid unnecessary re-renders
        const contextValue = React.useMemo(() => ({
            activeComponent,
            pinnedComponent,
            components,
            activateComponent,
            pinComponent,
        }), [activeComponent, pinnedComponent, components]);
        return (React.createElement(DELLayoutContext.Provider, { value: contextValue },
            React.createElement("div", { style: style, className: "d-flex w-100 min-vh-100 vh-100" + " " + className, ref: ref, ...props }, children)));
    });
    exports.DELLayoutProvider = DELLayoutProvider;
});
