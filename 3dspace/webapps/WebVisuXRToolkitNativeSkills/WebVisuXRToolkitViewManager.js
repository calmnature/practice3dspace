/// <amd-module name="DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitViewManager"/>
define("DS/WebVisuXRToolkitNativeSkills/WebVisuXRToolkitViewManager", ["require", "exports", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitManager", "i18n!DS/WebVisuXRToolkit/assets/nls/WebVisuXRToolkitNativeSkills", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWindowManager"], function (require, exports, WebVisuXRToolkit_1, WebVisuXRToolkitManager_1, NLS, THREE, WebVisuXRToolkitUIWindowManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ControllerScreenshot = exports.ViewManagementSkillInfo = exports.undoButton = exports.viewpointButton = exports.modelButton = exports.groundButton = void 0;
    const settings = new WebVisuXRToolkit_1.HandMenuUIComponents();
    const positionLabel = new WebVisuXRToolkit_1.Label({ text: "0,0,0" }, 3);
    settings.insertAtRow(0, new WebVisuXRToolkit_1.Container("default", "row", [new WebVisuXRToolkit_1.Label({ text: "Position:" }, 2), positionLabel]));
    const _previousLocations = [];
    exports.groundButton = new WebVisuXRToolkit_1.Button(() => {
        const viewpoint = (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint;
        _previousLocations.push({ pos: viewpoint.getEyePosition(), orientation: viewpoint.control.orientation });
        const xrnodeMat = (0, WebVisuXRToolkit_1.getXRNode)().getMatrix();
        (0, WebVisuXRToolkit_1.getXRNode)().translateZ(-xrnodeMat.decompose()[0].z);
    }, { text: "Jump To Ground" });
    settings.insertAtRow(1, new WebVisuXRToolkit_1.Container("default", "row", [exports.groundButton]));
    exports.modelButton = new WebVisuXRToolkit_1.Button(() => {
        const viewpoint = (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint;
        _previousLocations.push({ pos: viewpoint.getEyePosition(), orientation: viewpoint.control.orientation });
        if ((0, WebVisuXRToolkit_1.isXRActive)()) {
            WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.reframe(viewpoint.getEyePosition(), viewpoint.camera.fov);
        }
        else {
            viewpoint.reframe();
        }
    }, { text: "Jump To Model" });
    settings.insertAtRow(2, new WebVisuXRToolkit_1.Container("default", "row", [exports.modelButton]));
    exports.viewpointButton = new WebVisuXRToolkit_1.Button(() => {
        const viewpoint = (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint;
        _previousLocations.push({ pos: viewpoint.getEyePosition(), orientation: viewpoint.control.orientation });
        (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint.moveTo({ eyePosition: WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.startViewpointPos, orientation: WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.sceneManager.startViewpointOrientation, duration: 0, positionIsOnFeet: false });
    }, { text: "Jump To Viewpoint" });
    settings.insertAtRow(3, new WebVisuXRToolkit_1.Container("default", "row", [exports.viewpointButton]));
    exports.undoButton = new WebVisuXRToolkit_1.Button(() => {
        const previousLocation = _previousLocations.pop();
        if (!previousLocation)
            return;
        (0, WebVisuXRToolkit_1.getViewer)().currentViewpoint.moveTo({ eyePosition: previousLocation.pos, orientation: previousLocation.orientation, duration: 0 });
    }, { text: "Undo Jump" });
    settings.insertAtRow(4, new WebVisuXRToolkit_1.Container("default", "row", [exports.undoButton]));
    let lastDisplayedPos = "";
    exports.ViewManagementSkillInfo = {
        UIComponents: settings,
        frameUpdateCallback: (time, deltaTime) => {
            const pos = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().decompose()[0];
            const toDisplay = pos.x.toFixed(0) + ", " + pos.y.toFixed(0) + ", " + pos.z.toFixed(0);
            //const toDisplay = (pos.x / 1000).toFixed(2) + ", " + (pos.y / 1000).toFixed(2) + ", " + (pos.z / 1000).toFixed(2);
            if (toDisplay !== lastDisplayedPos) {
                lastDisplayedPos = toDisplay;
                positionLabel.value = { text: toDisplay };
            }
        },
        displayed_name: NLS.ViewManagementName
    };
    function pixelDataToImageSrc(screenshotData) {
        const { data, width, height } = screenshotData;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('Could not get 2D context');
        }
        const clampedData = new Uint8ClampedArray(data);
        const imageData = new ImageData(clampedData, width, height);
        ctx.putImageData(imageData, 0, 0);
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = width;
        finalCanvas.height = height;
        const finalCtx = finalCanvas.getContext('2d');
        if (!finalCtx) {
            throw new Error('Could not get 2D context for flipping');
        }
        finalCtx.scale(1, -1);
        finalCtx.drawImage(canvas, 0, -height);
        return finalCanvas.toDataURL('image/png');
    }
    // function pixelDataToBlob(screenshotData: { data: Uint8Array, width: number, height: number }): Promise<Blob>
    // {
    //     const { data, width, height } = screenshotData;
    //     for (let i = 0; i < data.length; i += 4)
    //     {
    //         data[i + 3] = 255; // Met le canal Alpha à 255
    //     }
    //     // 1. Canvas temporaire pour coller les pixels
    //     const canvas = document.createElement('canvas');
    //     canvas.width = width;
    //     canvas.height = height;
    //     const ctx = canvas.getContext('2d');
    //     if (!ctx)
    //     {
    //         return Promise.reject(new Error('Could not get 2D context'));
    //     }
    //     // 2. Créer un objet ImageData
    //     const clampedData = new Uint8ClampedArray(data);
    //     const imageData = new ImageData(clampedData, width, height);
    //     // 3. Coller les données dans le canvas (l'image sera à l'envers)
    //     ctx.putImageData(imageData, 0, 0);
    //     // 4. Canvas final pour retourner l'image
    //     const finalCanvas = document.createElement('canvas');
    //     finalCanvas.width = width;
    //     finalCanvas.height = height;
    //     const finalCtx = finalCanvas.getContext('2d');
    //     if (!finalCtx)
    //     {
    //         return Promise.reject(new Error('Could not get 2D context for flipping'));
    //     }
    //     // 5. Retourner l'image verticalement
    //     finalCtx.scale(1, -1); // Inverse l'axe Y
    //     finalCtx.drawImage(canvas, 0, -height); // Dessine l'image inversée
    //     // 6. Exporter en Blob (asynchrone) au lieu de Data URL
    //     return new Promise((resolve, reject) =>
    //     {
    //         finalCanvas.toBlob((blob) =>
    //         {
    //             if (blob)
    //             {
    //                 resolve(blob);
    //             } else
    //             {
    //                 reject(new Error('failed to create blob'));
    //             }
    //         }, 'image/png'); // Spécifie le type MIME
    //     });
    // }
    class ControllerScreenshot {
        constructor() {
            this.bindings = new Set([WebVisuXRToolkit_1.InputAction.FirstButtonPress]);
            this.desiredHandedness = new Set([WebVisuXRToolkit_1.AbstractHandedness.Primary]);
        }
        onActivate(input) {
        }
        onActivateBegin(input, activatingAction) {
        }
        onActivateEnd(input, deActivatingAction) {
            const imgSrc = pixelDataToImageSrc(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.makeScreenshot());
            const img = document.createElement("img");
            img.src = imgSrc;
            const window = WebVisuXRToolkitUIWindowManager_1.WebVisuXRToolkitUIWindowManager.instance.createWindow(WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.domUI, "screenshot", "screenshot", WebVisuXRToolkitManager_1.WebVisuXRToolkitManager.instance.UIManager.Intersectables, img);
            (0, WebVisuXRToolkit_1.getXRObjects)().addChild(window);
            const forward = new THREE.Vector3(0, 1, 0);
            const dec = (0, WebVisuXRToolkit_1.getHeadWorldMatrix)().rotateZ(Math.PI).decompose();
            forward.applyQuaternion(dec[1]);
            window.setMatrix(new THREE.Matrix4().compose(dec[0].add(forward.multiplyScalar(-500)), dec[1], new THREE.Vector3(1, 1, 1)));
        }
        onUnregisterInput(input) {
        }
        onRegisterInput(input) {
        }
    }
    exports.ControllerScreenshot = ControllerScreenshot;
});
