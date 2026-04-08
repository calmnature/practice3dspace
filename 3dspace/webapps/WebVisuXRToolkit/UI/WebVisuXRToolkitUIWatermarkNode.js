define("DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWatermarkNode", ["require", "exports", "DS/WebappsUtils/WebappsUtils", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkitUINode/HTMLWindow"], function (require, exports, WebappsUtils_1, WebVisuXRToolkit_1, WebVisuXRToolkitHelpers_1, THREE, HTMLWindow_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitUIWatermarkNode = void 0;
    class WebVisuXRToolkitUIWatermarkNode extends HTMLWindow_1.HTMLWindow {
        constructor(parentDom) {
            // Create the container
            const container = document.createElement("div");
            Object.assign(container.style, {
                display: "flex", // Pour aligner le logo et le texte côte à côte
                alignItems: "center", // Centrage vertical
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Blanc avec transparence
                padding: "15px 25px",
                borderRadius: "15px", // Coin supérieur droit arrondi (style technique)
                zIndex: "1000", // Pour s'assurer qu'il est au-dessus de la 3D
                color: "#3e5b78" // Couleur bleu-gris du texte
            });
            container.innerHTML = `
            <img src="${(0, WebappsUtils_1.getWebappsAssetUrl)("WebVisuXRToolkit", "UI_icons/compass.png")}" alt="3DEXPERIENCE Logo" style="
                    width: 48px;
                    height: 48px;
                    margin-right: 15px;  /* Espace entre l'image et le texte */
            ">            
            <div style="display: flex; flex-direction: column;">
                <div style="font-size: 22px; font-weight: 600; line-height: 1.1; color: #2c4b69;">
                    3DEXPERIENCE <span style="font-weight: 400;">Platform</span>
                </div>
                <div style="font-size: 15px; color: #5a7b9c; margin-top: 2px;">
                    Immersive High Definition Demo Mode
                </div>
            </div>
        `;
            super(parentDom, "WebVisuXRToolkit Watermark", true, container, true); // HTMLWindow
            this._wm_matrix = new THREE.Matrix4();
            this.update = (time, deltaTime) => {
                const headsetMatDec = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().decompose();
                const forward = new THREE.Vector3(0, 1, 0).applyQuaternion(headsetMatDec[1]);
                const up = new THREE.Vector3(0, 0, 1).applyQuaternion(headsetMatDec[1]);
                const idealPos = headsetMatDec[0].clone().add(forward.clone().multiplyScalar(100)).add(up.clone().multiplyScalar(-25));
                (0, WebVisuXRToolkitHelpers_1.makeRotationMatrix)(new THREE.Vector3(0, 0, 0), forward, up, this._wm_matrix).rotateZ(Math.PI).setPosition(idealPos); //.scale(new THREE.Vector3(2, 2, 2));
                this.setMatrix(this._wm_matrix);
            };
            this.displayHeader(false);
        }
    }
    exports.WebVisuXRToolkitUIWatermarkNode = WebVisuXRToolkitUIWatermarkNode;
});
