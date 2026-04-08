/// <amd-module name="DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitComputerMouse"/>
define("DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitComputerMouse", ["require", "exports", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebVisuXRToolkit/Skills/WebVisuXRToolkitSkillsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/Visualization/ThreeJS_DS"], function (require, exports, WebVisuXRToolkitInput_1, WebVisuXRToolkitSkillsUtils_1, WebVisuXRToolkit_1, THREE) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitComputerMouse = void 0;
    class WebVisuXRToolkitComputerMouse extends WebVisuXRToolkitInput_1.WebVisuXRToolkitNonXRInput {
        constructor(canvas) {
            super(WebVisuXRToolkitInput_1.InputHandedness.None);
            this._cssMousePos = new THREE.Vector2();
            this.handleMouseDown = (event) => {
                /*const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
            
                console.log(`Click coordinates (relative to canvas): X: ${x}, Y: ${y}`);*/
                this.startedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.MouseClick);
            };
            this.handleMouseUp = (event) => {
                /*const rect = this.canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
            
                console.log(`Click coordinates (relative to canvas): X: ${x}, Y: ${y}`);*/
                this.endedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.MouseClick);
            };
            this._touchAxes = [];
            this.canvas = canvas;
            this.canvas.addEventListener('mousedown', this.handleMouseDown);
            this.canvas.addEventListener('mouseup', this.handleMouseUp);
            this.canvas.addEventListener("mousemove", (event) => {
                const rect = this.canvas.getBoundingClientRect();
                this._cssMousePos.x = event.clientX - rect.left;
                this._cssMousePos.y = event.clientY - rect.top;
                this._mousePosition = (0, WebVisuXRToolkit_1.getViewer)().getMousePosition(this._cssMousePos);
            });
            this.canvas.addEventListener("mouseout", () => {
                this._mousePosition = undefined;
            });
        }
        get mousePosition() {
            return this._mousePosition;
        }
        _connect() {
            this.startedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.MousePassive);
        }
        _disconnect() {
            this.endedActions.add(WebVisuXRToolkitSkillsUtils_1.InputAction.MousePassive);
            this.canvas.removeEventListener('mousedown', this.handleMouseDown);
            this.canvas.removeEventListener('mouseup', this.handleMouseUp);
        }
        getAvailableInputs() {
            return new Set([WebVisuXRToolkitSkillsUtils_1.InputAction.MousePassive, WebVisuXRToolkitSkillsUtils_1.InputAction.MouseClick]);
        }
        get touchAxes() {
            return this._touchAxes;
        }
    }
    exports.WebVisuXRToolkitComputerMouse = WebVisuXRToolkitComputerMouse;
});
