/// <amd-module name="DS/WebVisuXRToolkit/Skills/SystemSkills/DebugTooltip"/>
define("DS/WebVisuXRToolkit/Skills/SystemSkills/DebugTooltip", ["require", "exports", "DS/WebVisuXRToolkitUINode/HTMLNode", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitHandMenuUIElements", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers"], function (require, exports, HTMLNode_1, THREE, WebVisuXRToolkitManager_1, WebVisuXRToolkit_1, WebVisuXRToolkitHandMenuUIElements_1, WebVisuXRToolkitHelpers_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DebugTooltipNode = exports.DebugSliderSkill = exports.DebugTooltip = exports.DebugSliderUI = void 0;
    //import WebVisuXRToolkitConfigManager = require("../WebVisuXRToolkitConfigManager");
    /* Debug Node ( activated from the start menu in the Dev settings panel )
    
    It follows the off (left) hand
    
    It works by "channels"
    
    DebugTooltip.print(channel: number, args: any[])
    
    Note: it can convert THREE Vector 3 and Quaternion to string, more conversions can be added easily
    
    ex:
    import { DebugTooltip } from 'DS/WebVisuXRToolkit/dev/DebugTooltip';
    
    const vectors = input.getMatrixWorld().decompose();
    DebugTooltip.print(0, "test") // will print "test" on the first line (channel 0)
    DebugTooltip.print(1, vectors[0], vectors[1], vectors[2]) // will print the following arguments with a '\n' between each from the 2nd line (channel 1)
    
    
    
    DebugTooltip.setDebugGizmoMatrix(name, matrix) functions:
    Allows to quickly spawn and move a debug gizmo
    for debug visualisation purposes
    
    */
    /* Debug Slider
    Dynamic values, the slider needs to be initialised in JustAddYourSliderInThisFunction() below this comment
    Node: right now the skill related to these is init in the file DebugPanelComponentNoe.ts which is only active in the appId "SANDBOX_NOE_WEBVISUXRTOOLKIT"
    
    You can then retrieve the value from anywhere else:
    
    //! TO DELETE >>>
    const wrist_x = getSliderValue("X")
    //! TO DELETE <<<
    
    */
    exports.DebugSliderUI = new WebVisuXRToolkitHandMenuUIElements_1.HandMenuUIComponents();
    const container = new WebVisuXRToolkitHandMenuUIElements_1.Container("default", "column");
    function Vector3ToString(vec) {
        return `${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}`;
    }
    function QuaternionToString(vec) {
        return `${vec.x.toFixed(2)}, ${vec.y.toFixed(2)}, ${vec.z.toFixed(2)}, ${vec.w.toFixed(2)}`;
    }
    function Matrix4ToString(mat) {
        const te = mat.elements;
        const m11 = te[0], m12 = te[4], m13 = te[8], m14 = te[12];
        const m21 = te[1], m22 = te[5], m23 = te[9], m24 = te[13];
        const m31 = te[2], m32 = te[6], m33 = te[10], m34 = te[14];
        const m41 = te[3], m42 = te[7], m43 = te[11], m44 = te[15];
        return `${m11.toFixed(2)}, ${m12.toFixed(2)}, ${m13.toFixed(2)}, ${m14.toFixed(2)}\n` +
            `${m21.toFixed(2)}, ${m22.toFixed(2)}, ${m23.toFixed(2)}, ${m24.toFixed(2)}\n` +
            `${m31.toFixed(2)}, ${m32.toFixed(2)}, ${m33.toFixed(2)}, ${m34.toFixed(2)}\n` +
            `${m41.toFixed(2)}, ${m42.toFixed(2)}, ${m43.toFixed(2)}, ${m44.toFixed(2)}\n`;
    }
    class DebugTooltip {
        constructor() { }
        static SetInstanceNode(node) {
            if (this._node)
                console.log("DebugTooltip node set more than once");
            this._node = node;
        }
        static IsDebutTooltipActive() {
            return (this._node !== undefined);
        }
        static print(channel, ...args) {
            if (!this.IsDebutTooltipActive())
                return;
            const arr = [];
            args.forEach((el) => {
                if (el === undefined)
                    arr.push("undefined");
                else if (el instanceof THREE.Matrix4)
                    arr.push(Matrix4ToString(el));
                else if (el instanceof THREE.Vector3)
                    arr.push(Vector3ToString(el));
                else if (el instanceof THREE.Quaternion)
                    arr.push(QuaternionToString(el));
                else if (typeof el === "string")
                    arr.push(el);
                else
                    arr.push(el.toString());
            });
            this._lines.set(channel, arr.join('\n'));
            const textToSend = [...this._lines.values()].join('\n');
            this._node?.SetText(textToSend);
        }
        static setDebugGizmoCompose(name, pos, rot = new THREE.Quaternion(), size = 1.0) {
            const matrix = new THREE.Matrix4().compose(pos, rot, new THREE.Vector3(size, size, size));
            this.setDebugGizmoMatrix(name, matrix);
        }
        static setDebugGizmoMatrix(name, matrix, size = undefined) {
            if (!this.IsDebutTooltipActive())
                return;
            let gizmo = this._cube.get(name);
            if (!gizmo) {
                gizmo = (0, WebVisuXRToolkitHelpers_1.getDebugAxis)();
                (0, WebVisuXRToolkit_1.getXRNode)().addChild(gizmo);
                this._cube.set(name, gizmo);
            }
            if (size) {
                const matrix_dec = matrix.decompose();
                const new_matrix = new THREE.Matrix4().compose(matrix_dec[0], matrix_dec[1], new THREE.Vector3(size, size, size));
                gizmo.setMatrix(new_matrix);
            }
            else
                gizmo.setMatrix(matrix);
        }
        static addSlider(sliderName, rangeMin, rangeMax, step = 0.1, defaultVal) {
            const slider = new WebVisuXRToolkit_1.Slider(sliderName, rangeMax, rangeMin, step, defaultVal);
            container.addElement(slider);
            this._sliders.set(sliderName, slider);
        }
        static JustAddYourSliderInThisFunction() {
            this.isSet = true;
            DebugTooltip.addSlider("X", -100, 100, 1, 1);
            DebugTooltip.addSlider("Y", -100, 100, 1, 1);
            DebugTooltip.addSlider("Z", -100, 100, 1, 1);
            DebugTooltip.addSlider("rY", 0, 2, 0.1, 0.5);
            DebugTooltip.addSlider("rZ", 0, 2, 0.1, 0.5);
            DebugTooltip.addSlider("A", 0.1, 10, 0.1, 0.5);
            exports.DebugSliderUI.insertAtRow(0, container);
        }
        static getSliderVal(sliderName) {
            const val = this._sliders.get(sliderName)?.value;
            if (val === undefined) {
                console.warn("DebugTooltip: A slider value was query-ed but didn't exist, returning 1");
                return 1;
            }
            return val;
        }
    }
    exports.DebugTooltip = DebugTooltip;
    DebugTooltip.isSet = false;
    DebugTooltip._node = undefined;
    DebugTooltip._lines = new Map();
    DebugTooltip._cube = new Map();
    DebugTooltip._sliders = new Map();
    class DebugSliderSkill {
        constructor() {
            this.bindings = new Set([]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary, WebVisuXRToolkit_1.AbstractHandedness.Secondary]);
        }
        /*public static getSliderValue(name: string): number
        {
            const val = WebVisuXRToolkitConfigManager.instance.getSkillInfos("DebugSlider")?.UIComponents?.getElementValue(name);
            if (val === undefined)
            {
                console.warn("DebugSliderSkill: the value query-ed doesn't have a slider assigned, returning -1 as default");
                return -1;
            }
            return val;
        }*/
        onActivate(input) {
            return new Set();
        }
        onActivateBegin(input, activatingAction) {
            return new Set();
        }
        onActivateEnd(input, deActivatingAction) {
            return new Set();
        }
        onRegisterInput(input) { }
        onUnregisterInput(input) { }
    }
    exports.DebugSliderSkill = DebugSliderSkill;
    class DebugTooltipNode extends HTMLNode_1.HTMLNode {
        constructor(domParent) {
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.flexDirection = 'column';
            container.style.height = '100%';
            container.style.width = '10cm';
            // Create text area
            const textArea = document.createElement('div');
            textArea.style.flexGrow = '1';
            textArea.style.overflowY = 'auto';
            textArea.style.padding = '1rem';
            textArea.style.backgroundColor = 'black';
            textArea.style.color = 'white';
            textArea.style.fontSize = '6mm';
            textArea.style.width = '10cm';
            textArea.style.textAlign = 'start';
            textArea.textContent = 'Hello';
            container.appendChild(textArea);
            domParent.appendChild(container);
            super(container, "Debug Tooltip", true, false);
            this.tmp_vec = new THREE.Vector3();
            this._textArea = textArea;
            DebugTooltip.SetInstanceNode(this);
        }
        SetText(text) {
            this._textArea.innerText = text;
        }
        update(time) {
            this.recomputeMatrix();
            this.tmp_vec.set(DebugTooltip.getSliderVal('X'), DebugTooltip.getSliderVal('Y'), DebugTooltip.getSliderVal('Z'));
            DebugTooltip.print(0, this.tmp_vec);
        }
        recomputeMatrix() {
            const headset_rotation = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.HeadWorldMatrix.decompose()[1];
            const left_controller_hand = WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.inputManager.getInputs().left;
            if (!left_controller_hand)
                return;
            const matrix = left_controller_hand.getMatrixWorld().decompose();
            this.setMatrix(new THREE.Matrix4().compose(matrix[0].add(new THREE.Vector3(0, 0, 200)), headset_rotation.multiply(new THREE.Quaternion(0, 0, 1, 0)), new THREE.Vector3(2, 2, 2)));
        }
    }
    exports.DebugTooltipNode = DebugTooltipNode;
});
