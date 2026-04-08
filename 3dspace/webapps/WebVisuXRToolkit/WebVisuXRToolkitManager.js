/// <amd-module name="DS/WebVisuXRToolkit/WebVisuXRToolkitManager"/>
define("DS/WebVisuXRToolkit/WebVisuXRToolkitManager", ["require", "exports", "DS/Visualization/ThreeJS_DS", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInputManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitSceneManager", "DS/WebVisuXRToolkit/WebVisuXRToolkitConfigManager", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIManager", "DS/WebVisuXRToolkit/dev/FPSCounter", "DS/WebVisuXRToolkit/Skills/SystemSkills/DebugTooltip", "DS/WebVisuXRToolkit/Inputs/WebVisuXRToolkitInput", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIEventController", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUITutorialNode", "DS/WebVisuXRToolkit/WebVisuXRToolkit", "DS/WebVisuXRToolkit/WebVisuXRToolkitHelpers", "DS/i3DXCompassPlatformServices/i3DXCompassPlatformServices", "DS/WebVisuXRToolkit/UI/WebVisuXRToolkitUIWatermarkNode"], function (require, exports, THREE, WebVisuXRToolkitInputManager_1, WebVisuXRToolkitSceneManager_1, WebVisuXRToolkitConfigManager, WebVisuXRToolkitUIManager_1, FPSCounter_1, DebugTooltip_1, WebVisuXRToolkitInput_1, WebVisuXRToolkitUIEventController_1, WebVisuXRToolkitUITutorialNode_1, WebVisuXRToolkit_1, WebVisuXRToolkitHelpers_1, i3DXCompassPlatformServices, WebVisuXRToolkitUIWatermarkNode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebVisuXRToolkitManager = void 0;
    /**
     * This file is the main entrypoint of WebVisuXRToolkit
     * This Singleton requests every information from the WebXR Browser API and converts its basis to 3DS Basis convention
     * This class also handles the new main loop with XR Animation frames
     */
    const null_vec3 = new THREE.Vector3(0, 0, 0);
    class WebVisuXRToolkitManager {
        static get instance() {
            if (this._instance) {
                return this._instance;
            }
            throw new Error("WebVisuXRToolkitManager not initialized");
        }
        get sceneManager() {
            return this._sceneManager;
        }
        get inputManager() {
            return this._inputManager;
        }
        get UIManager() {
            return this._UIManager;
        }
        get skillsManager() {
            return this._skillsManager;
        }
        get collabManager() {
            return this._collabManager;
        }
        constructor(session, referenceSpace, xrContext, mode, sceneManager, skillsManager, collabManager, domOverlay, xr_binding) {
            this._inputManager = new WebVisuXRToolkitInputManager_1.WebVisuXRToolkitInputManager();
            this._isFirstFrameDrawn = false;
            this._isRunning = false;
            this._computeMatrix = new THREE.Matrix4();
            this._previousTime = 0.0;
            this._dt = 0.0;
            this._isStereoRendering = false;
            this.onAnimationFrame = (time, frame) => {
                this._dt = (time - this._previousTime) * 0.001;
                this._previousTime = time;
                if (this._session) {
                    this._session.requestAnimationFrame(this.onAnimationFrame);
                }
                else {
                    if (this._isRunning) {
                        window.requestAnimationFrame(this.onAnimationFrame);
                    }
                }
                if (frame) {
                    const pose = frame.getViewerPose(this._referenceSpace);
                    if (pose) {
                        if (!this._isFirstFrameDrawn && !this.sceneManager._is_cameraSystemActive()) {
                            this._sceneManager._toggleCameraSystem(true);
                        }
                        /*this.session.updateRenderState({
                        depthNear: 0.1,
                        depthFar: Infinity
                        });*/
                        const views = pose.views;
                        const glLayer = this._session.renderState.baseLayer;
                        this._sceneManager._cameraSystem.setNbViews(views.length);
                        for (let i = 0; i < views.length; i++) {
                            let viewport;
                            let renderTargetParams = { attributes: this._xrContext?.getContextAttributes(), colorTextures: null, framebuffer: null, viewport: { x: 0, y: 0, width: 0, height: 0 } };
                            if (glLayer) {
                                viewport = glLayer.getViewport(views[i]);
                            }
                            else if (this._xr_binding && this.glProjLayer) {
                                // const glSubImage = this._xr_binding.getViewSubImage(this.glProjLayer, views[i]);
                                // viewport = glSubImage.viewport;
                                // // For side-by-side projection, we only produce a single texture for both eyes.
                                // (renderTargetParams.colorTextures as any) = [glSubImage.colorTexture];
                                const subImage = this._xr_binding.getViewSubImage(this.glProjLayer, views[i]);
                                viewport = subImage.viewport;
                                if (subImage.colorTexture instanceof WebGLTexture) {
                                    renderTargetParams.colorTextures = [subImage.colorTexture];
                                }
                                else {
                                    //@ts-ignore
                                    const colorTexture = subImage.colorTexture.createView(subImage.getViewDescriptor());
                                    renderTargetParams.colorTextures = [colorTexture];
                                    if (subImage.depthStencilTexture) {
                                        //@ts-ignore
                                        const depthTexture = subImage.depthStencilTexture.createView(subImage.getViewDescriptor());
                                        //@ts-ignore
                                        renderTargetParams.depthTexture = depthTexture;
                                    }
                                }
                            }
                            if (viewport) {
                                this.mapCameraToXREye(viewport, views[i]);
                                renderTargetParams.viewport = viewport;
                            }
                            if (glLayer) {
                                renderTargetParams.framebuffer = glLayer.framebuffer;
                                if (!viewport) {
                                    renderTargetParams.viewport = { x: 0, y: 0, width: glLayer.framebufferWidth, height: glLayer.framebufferHeight };
                                }
                            }
                            this._sceneManager._cameraSystem.tryUpdateXRRenderTarget(renderTargetParams, i);
                        }
                        this._isStereoRendering = this._sceneManager._cameraSystem.isStereo();
                        if (!this._isStereoRendering) {
                            this._UIManager.toggleToFlatModeUI();
                            if (WebVisuXRToolkitConfigManager.instance.settings.get("ForceMixedRealityInMonoRendering") && this._isMixedRealityActive === false) {
                                this.setMixedRealityMode(true);
                            }
                            const inputs = this._inputManager.getInputs();
                            if (inputs.left) {
                                inputs.left.setMixedRealityMode(this._isMixedRealityActive);
                            }
                            if (inputs.right) {
                                inputs.right.setMixedRealityMode(this._isMixedRealityActive);
                            }
                            for (const input of inputs.others) {
                                if (input instanceof WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput) {
                                    input.setMixedRealityMode(this._isMixedRealityActive);
                                }
                            }
                        }
                        /* const enabledFeatures = this._session!.enabledFeatures;
                         if (enabledFeatures)
                         {
                             if (enabledFeatures.includes('depth-sensing') && this._xr_binding)
                             {
                                 const depthData = this._xr_binding.getDepthInformation(views[0]);
         
                                 if (depthData && depthData.texture)
                                 {
                                     //depthSensing.init(renderer, depthData, session.renderState);
                                 }
                             }
                         }*/
                    }
                    this._inputManager.update(this._session.inputSources, frame, this._referenceSpace, this.sceneManager.XRNode.getMatrix(), this._skillsManager);
                    this._sceneManager.updateLightEstimation(frame);
                    this._sceneManager.updateXRPlanes(frame, this._referenceSpace);
                    this._sceneManager.updateXRMeshes(frame, this._referenceSpace);
                }
                else {
                    this._sceneManager.NonXRCallback();
                    for (const input of this._inputManager.getInputs().others) {
                        this._skillsManager._updateAction(input);
                    }
                }
                this._UIManager._update(time, this._dt, this.sceneManager.XRObjects);
                WebVisuXRToolkitUIEventController_1.WebVisuXRToolkitUIEventController.instance.emit(WebVisuXRToolkitUIEventController_1.XREvents.FrameChanged);
                this._skillsManager.frameUpdate(time, this._dt);
                if (!this._isFirstFrameDrawn && !this._sceneManager.HeadMatrix.isIdentity()) // This one can be called before the first render
                 {
                    if (WebVisuXRToolkitConfigManager.instance.settings.get("ForceMixedRealityInMonoRendering")) {
                        this.setMixedRealityMode(true);
                    }
                }
                this._sceneManager.viewer.render();
                this._sceneManager.viewer.animate();
                if (!this._isFirstFrameDrawn && !this._sceneManager.HeadMatrix.isIdentity()) // this one has to be called after render because the variable HeadMatrix needs to be set first
                 {
                    this._isFirstFrameDrawn = true;
                    if (!this.session) {
                        this._UIManager.toggleToFlatModeUI();
                    }
                    this.collabManager.WebVisuXRToolkitStarted();
                    this._sceneManager.buildXRNodeMatrix(this._sceneManager.startViewpointPos, this._sceneManager.startViewpointOrientation, false, true);
                }
            };
            this._sceneManager = sceneManager;
            this._skillsManager = skillsManager;
            this._collabManager = collabManager;
            this._xr_binding = xr_binding;
            this._isMixedRealityAvailable = mode === "immersive-ar";
            this._isMixedRealityActive = false;
            this._isDisplayingIndicators = WebVisuXRToolkitConfigManager.instance.settings.get("DisplayControllerIndicatorsOnStart");
            this.displayIndicators(this._isDisplayingIndicators);
            this._UIManager = new WebVisuXRToolkitUIManager_1.WebVisuXRToolkitUIManager(sceneManager.XRObjects, this._skillsManager, domOverlay, this._isMixedRealityAvailable, this._inputManager, session !== null);
            this._UIManager.closingCrossImage.addEventListener("click", () => {
                this.endSession();
            });
            if (WebVisuXRToolkitConfigManager.instance.devMode.active && WebVisuXRToolkitConfigManager.instance.devMode.options.get("fpsCounter")) {
                this._sceneManager.XRObjects.addChild(new FPSCounter_1.FPSCounterNode(this._UIManager.domUI));
            }
            if (WebVisuXRToolkitConfigManager.instance.devMode.active && WebVisuXRToolkitConfigManager.instance.devMode.options.get("debugTooltip")) {
                this._sceneManager.XRObjects.addChild(new DebugTooltip_1.DebugTooltipNode(this._UIManager.domUI));
            }
            this._session = session;
            this._referenceSpace = referenceSpace;
            this._xrContext = xrContext;
            this._lockCamera = WebVisuXRToolkitConfigManager.instance.devMode.active && WebVisuXRToolkitConfigManager.instance.devMode.options.get("lockCamera");
            window.addEventListener("beforeunload", (event) => {
                //this._collabManager.disconnect();
                WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("XRSessionEnded"));
                event.returnValue = ""; // Required for Chrome
            });
            this._session?.addEventListener('end', () => {
                console.log("WebXR end callback");
                this.OnSessionEnd();
            });
            const framebufferScaleFactor = 1.0;
            //const RGBAFormat = 1023;
            //const UnsignedByteType = 1009;
            if (this._session) {
                //if (this._session.renderState.layers === undefined || !this._xr_binding)
                if (!this._sceneManager.viewer.renderer.renderer.webGPUDevice || !this._xr_binding) // Forcing render to frambuffer if not webgpu
                 {
                    const attributes = xrContext.getContextAttributes();
                    console.log("Should render inside baselayer");
                    const layerInit = {
                        antialias: attributes.antialias,
                        alpha: true,
                        depth: attributes.depth,
                        stencil: attributes.stencil,
                        framebufferScaleFactor: framebufferScaleFactor
                    };
                    this.glBaseLayer = new XRWebGLLayer(this._session, this._xrContext, layerInit);
                    this._session.updateRenderState({
                        baseLayer: this.glBaseLayer
                    });
                    /*this._XRrenderTarget = new THREE.WebGLRenderTarget(
                        this.glBaseLayer.framebufferWidth,
                        this.glBaseLayer.framebufferHeight,
                        {
                            format: RGBAFormat,
                            type: UnsignedByteType,
                            //colorSpace: renderer.outputColorSpace,
                            stencilBuffer: attributes.stencil
                        }
                    );*/
                }
                else {
                    console.log("Should render inside target projection layer Texture");
                    let projectionlayerInit;
                    if (this._xr_binding instanceof XRWebGLBinding) {
                        projectionlayerInit = {
                            colorFormat: this._xrContext.RGBA,
                            depthFormat: 'depth24plus',
                            scaleFactor: framebufferScaleFactor
                        };
                    }
                    else {
                        projectionlayerInit = {
                            colorFormat: this._xr_binding.getPreferredColorFormat(),
                            depthFormat: 'depth24plus', //glDepthFormat,
                            scaleFactor: framebufferScaleFactor
                        };
                    }
                    this.glProjLayer = this._xr_binding.createProjectionLayer(projectionlayerInit);
                    this._session.updateRenderState({ layers: [this.glProjLayer] });
                    // //renderer.setSize(glProjLayer.textureWidth, glProjLayer.textureHeight, false);
                    // this._XRrenderTarget = new THREE.WebGLRenderTarget(
                    //     this.glProjLayer.textureWidth,
                    //     this.glProjLayer.textureHeight,
                    //     {
                    //         depthBuffer: true,
                    //         format: RGBAFormat,
                    //         type: UnsignedByteType,
                    //         //depthTexture: new DepthTexture(glProjLayer.textureWidth, glProjLayer.textureHeight, depthType, undefined, undefined, undefined, undefined, undefined, undefined, depthFormat),
                    //         stencilBuffer: attributes.stencil,
                    //         //colorSpace: renderer.outputColorSpace,
                    //         //samples: attributes.antialias ? 4 : 0,
                    //         //resolveDepthBuffer: (this.glProjLayer.ignoreDepthValues === false)
                    //     });
                    // (this._XRrenderTarget as any).__webglTexture = [];
                    // //(this.newRenderTarget as any).__webglTexture = glSubImage.colorTexture;
                    // //this.newRenderTarget.depthTexture.__webglTexture = glProjLayer.ignoreDepthValues ? undefined : glSubImage.depthStencilTexture;
                }
                //window.devicePixelRatio = 1.0; // workaround suggested by GON1 for testing on AVP
                //@ts-ignore
                THREE._setForceDevicePixelRatio(1.0);
                this._session.requestAnimationFrame(this.onAnimationFrame);
            }
            else {
                window.requestAnimationFrame(this.onAnimationFrame);
            }
            this._isRunning = true;
        }
        OnSessionEnd() {
            //@ts-ignore
            THREE._setForceDevicePixelRatio(-1);
            this._isRunning = false;
            console.log("XR Session ending");
            //this._collabManager.disconnect();
            this._collabManager.clean();
            this._inputManager.destroy(this._sceneManager.XRNode, this._skillsManager, this._isMixedRealityActive);
            this._inputManager = null;
            this._UIManager.cleanUI();
            this._UIManager = null;
            WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("XRSessionEnded"));
            this._sceneManager._restoreSceneGraph();
            this._sceneManager = null;
            WebVisuXRToolkitManager._instance = null;
        }
        static async createWebVisuXRToolkitManager(viewer, viewpoint, skillsManager, collabManager) {
            if (viewpoint) {
                console.warn("DEPRECATED, PLEASE DO NOT PROVIDE ANY VIEWPOINT HERE, we will now use viewer.currentViewpoint");
            }
            if (this._instance) {
                return this._instance;
            }
            let session = null;
            let mode = "inline";
            const domOverlay = document.createElement('div');
            domOverlay.style.position = 'relative';
            domOverlay.id = "XRDomOverlay";
            document.body.appendChild(domOverlay);
            const allowPassthough = WebVisuXRToolkitConfigManager.instance.settings.get("AllowMixedReality");
            if (navigator.xr) {
                if (allowPassthough && await navigator.xr.isSessionSupported("immersive-ar")) {
                    mode = "immersive-ar";
                    try {
                        const optionalFeatures = ["hand-tracking", "unbounded", "bounded-floor", "hit-test", "dom-overlay", "plane-detection", "mesh-detection", 'light-estimation'];
                        if (viewer.renderer.renderer.webGPUDevice) {
                            optionalFeatures.push("webgpu");
                        }
                        session = await navigator.xr.requestSession(mode, {
                            requiredFeatures: ['local-floor'],
                            optionalFeatures: optionalFeatures,
                            domOverlay: {
                                root: domOverlay
                            }
                        });
                        if (WebVisuXRToolkitConfigManager.instance.devMode.active) {
                            const button = document.createElement('button');
                            button.textContent = 'View On Object';
                            button.style.position = 'absolute';
                            button.style.top = '10px';
                            button.style.left = '10px';
                            button.style.zIndex = '1000';
                            button.onclick = () => { WebVisuXRToolkitManager.instance.sceneManager.reframe(viewer.currentViewpoint.getEyePosition(), viewer.currentViewpoint.camera.fov); };
                            domOverlay.appendChild(button);
                        }
                    }
                    catch (err) {
                        WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("WebVisuXRToolkitStartFail"));
                        throw err;
                    }
                }
                else if (await navigator.xr.isSessionSupported('immersive-vr')) {
                    mode = "immersive-vr";
                    try {
                        const optionalFeatures = ["hand-tracking", "bounded-floor"];
                        if (viewer.renderer.renderer.webGPUDevice) {
                            optionalFeatures.push("webgpu");
                        }
                        session = await navigator.xr.requestSession(mode, {
                            requiredFeatures: ['local-floor'],
                            optionalFeatures: optionalFeatures,
                        });
                    }
                    catch (err) {
                        WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("WebVisuXRToolkitStartFail"));
                        throw err;
                    }
                }
                else if (WebVisuXRToolkitConfigManager.instance.clientInstance === undefined) {
                    console.error('neither AR nor VR are supported');
                    WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("WebVisuXRToolkitStartFail"));
                    throw new Error('neither AR nor VR not supported');
                }
            }
            else if (WebVisuXRToolkitConfigManager.instance.clientInstance === undefined) {
                console.error('WebXR not available');
                WebVisuXRToolkitConfigManager.instance.dispatchEvent(new Event("WebVisuXRToolkitStartFail"));
                throw new Error('WebXR not available');
            }
            if (session && viewer.renderer.gl?.makeXRCompatible) {
                await viewer.renderer.gl.makeXRCompatible();
            }
            let lightProbe = undefined;
            if (session?.enabledFeatures) {
                const featuresSet = new Set(session.enabledFeatures);
                if (featuresSet.has("light-estimation")) {
                    lightProbe = await session.requestLightProbe();
                }
            }
            let isPolyfill = false;
            if (session) {
                const symbols = Object.getOwnPropertySymbols(navigator.xr);
                if (symbols) {
                    for (const symbol of symbols) {
                        if (symbol.description && symbol.description.match(/polyfill/i)) {
                            console.log("Polyfill found, Not creating XRWebGLBinding");
                            isPolyfill = true;
                            break;
                        }
                    }
                }
            }
            const sceneBBox = viewer.getSceneBoundingBox();
            const viewpointPos = viewer.currentViewpoint.getEyePosition();
            const startPos = WebVisuXRToolkitConfigManager.instance.settings.get("StartPosition") === 'automatic'
                ? sceneBBox.containsPoint(viewpointPos) ? "onViewpoint" : "onObject"
                : WebVisuXRToolkitConfigManager.instance.settings.get("StartPosition");
            let xr_binding = undefined;
            let gpuDevice = viewer.renderer.renderer.webGPUDevice;
            if (gpuDevice) {
                console.log("running webgpu");
                //@ts-ignore
                xr_binding = new XRGPUBinding(session, gpuDevice);
            }
            else {
                xr_binding = session === null || isPolyfill || typeof XRWebGLBinding === 'undefined' ? undefined : new XRWebGLBinding(session, viewer.renderer.gl);
            }
            const waitForEnvChange = () => new Promise((resolve, reject) => {
                let timeoutId;
                const token = viewer.onVisuEnvChange(() => {
                    clearTimeout(timeoutId);
                    viewer.unsubscribe(token);
                    resolve();
                });
                timeoutId = setTimeout(() => {
                    viewer.unsubscribe(token);
                    console.warn("Timeout : onVisuEnvChange not triggered after 1 second.");
                    resolve();
                }, 1000);
            });
            if (WebVisuXRToolkitConfigManager.instance.settings.get("EnableVROptimization")) {
                let prom = waitForEnvChange();
                viewer.switchVRMode(false);
                await prom;
                prom = waitForEnvChange();
                viewer.switchVRMode(true);
                await prom;
                // Jekfer told us to first switch off then switch on.
            }
            const sceneManager = new WebVisuXRToolkitSceneManager_1.WebVisuXRToolkitSceneManager(session !== null, viewer, xr_binding, startPos, lightProbe);
            //sceneManager.displayXRMesh(WebVisuXRToolkitConfigManager.instance.settings.get("DisplayXRMesh") && mode === "immersive-ar" && WebVisuXRToolkitConfigManager.instance.settings.get("StartInMixedReality"));
            let viewer_ref_space_promise;
            if (session) {
                if (startPos === 'onViewpoint') {
                    const refSpace = WebVisuXRToolkitConfigManager.instance.settings.get("UnboundedReferenceSpace") ? "unbounded" : "bounded-floor";
                    viewer_ref_space_promise = await session.requestReferenceSpace(refSpace).catch(error => { return session.requestReferenceSpace("local-floor"); });
                }
                else {
                    viewer_ref_space_promise = await session.requestReferenceSpace("local-floor");
                }
            }
            //console.log("enabledFeatures", session.enabledFeatures)
            this._instance = new WebVisuXRToolkitManager(session, viewer_ref_space_promise, viewer.renderer.gl, mode, sceneManager, skillsManager, collabManager, domOverlay, xr_binding);
            skillsManager.initializeAllSkillEvents();
            if (session) {
                session.addEventListener("inputsourceschange", async (event) => {
                    const oldInputs_pair = this._instance._inputManager.getInputs();
                    let oldInputs = [];
                    if (oldInputs_pair.left != null)
                        oldInputs.push(oldInputs_pair.left);
                    if (oldInputs_pair.right != null)
                        oldInputs.push(oldInputs_pair.right);
                    this._instance._inputManager.removeSources(event.removed, sceneManager.XRNode, skillsManager);
                    const inputs = this._instance._inputManager.addSources(event.added, sceneManager, session, this._instance._isMixedRealityActive, this._instance._isDisplayingIndicators, collabManager.isConnectedToNetwork());
                    const newInputs_pair = this._instance._inputManager.getInputs();
                    let newInputs = [];
                    if (newInputs_pair.left != null)
                        newInputs.push(newInputs_pair.left);
                    if (newInputs_pair.right != null)
                        newInputs.push(newInputs_pair.right);
                    const new_config = skillsManager.updateInputConfiguration(oldInputs, newInputs);
                    if (new_config) {
                        skillsManager.pruneSelectedSkills(inputs);
                        for (const input of inputs) {
                            skillsManager._declareAvailableActions(input);
                        }
                    }
                });
            }
            else {
                const inputs = this._instance._inputManager.addSources(undefined, sceneManager, undefined, this._instance._isMixedRealityActive, this._instance._isDisplayingIndicators, collabManager.isConnectedToNetwork());
                const new_config = skillsManager.updateInputConfiguration([], inputs);
                if (new_config) {
                    /*const removedSkills =*/ skillsManager.pruneSelectedSkills(inputs);
                    //console.log("removedSkills", removedSkills)
                    for (const input of inputs) {
                        skillsManager._declareAvailableActions(input);
                    }
                }
                this._instance.UIManager.flatQuickMenu.updateQmButtons(inputs);
            }
            while (!this._instance._isFirstFrameDrawn) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            WebVisuXRToolkitConfigManager.instance.dispatchEvent(new CustomEvent("WebVisuXRToolkitSessionStarted", { detail: session }));
            if (this._instance._isMixedRealityAvailable && WebVisuXRToolkitConfigManager.instance.settings.get("StartInMixedReality")) {
                this._instance.setMixedRealityMode(true);
            }
            if (WebVisuXRToolkitConfigManager.instance.settings.get("DisplayTutorial")) {
                const tuto = new WebVisuXRToolkitUITutorialNode_1.WebVisuXRToolkitUITutorialNode(this._instance._UIManager.domUI);
                this._instance._UIManager.Intersectables.push(tuto);
                for (const skill of skillsManager.listSkills().skillList) {
                    const steps = skill.getTutorialSteps();
                    if (steps.length > 0) {
                        tuto.addSkillSteps(skill.name, steps);
                    }
                }
                this._instance._sceneManager.XRObjects.addChild(tuto);
                tuto.startTutorial().then(() => {
                    this._instance._sceneManager.XRObjects.removeChild(tuto);
                });
            }
            if (WebVisuXRToolkitConfigManager.instance.settings.get("CheckLicense")) {
                const instance = this.instance;
                // console.log("CHecking license A")
                // const watermark = new WebVisuXRToolkitUIWatermarkNode(instance._UIManager.domUI);
                // instance._UIManager.Intersectables.push(watermark);
                // instance._sceneManager.XRObjects.addChild(watermark)
                i3DXCompassPlatformServices.getGrantedRoles((userGrantedRoles) => {
                    // console.log("CHecking license B")
                    let hasRole = false;
                    for (var i = 0; i < userGrantedRoles.length; i++) {
                        if (userGrantedRoles[i].id === "VIZ") {
                            if (!userGrantedRoles[i].platforms || (userGrantedRoles[i].platforms && userGrantedRoles[i].platforms.indexOf((typeof widget !== 'undefined' && widget.getValue('x3dPlatformId')) ? widget.getValue('x3dPlatformId') : null) > -1)) {
                                //Role granted !
                                console.log("Found role");
                                hasRole = true;
                                break;
                            }
                        }
                    }
                    if (!hasRole) {
                        if (hasRole === false) {
                            console.log("Display watermark");
                            const watermark = new WebVisuXRToolkitUIWatermarkNode_1.WebVisuXRToolkitUIWatermarkNode(instance._UIManager.domUI);
                            instance._UIManager.Intersectables.push(watermark);
                            instance._sceneManager.XRObjects.addChild(watermark);
                        }
                    }
                });
            }
            return this._instance;
        }
        isXRActive() {
            return this._session !== null;
        }
        isMixedRealityActive() {
            return this._isMixedRealityActive;
        }
        isDisplayingIndicators() {
            return this._isDisplayingIndicators;
        }
        displayIndicators(iOnOff) {
            this._isDisplayingIndicators = iOnOff;
            const inputs = this._inputManager.getInputs();
            if (inputs.left && inputs.left instanceof WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput) {
                inputs.left.displayIndicators(this._isDisplayingIndicators);
            }
            if (inputs.right instanceof WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput) {
                inputs.right.displayIndicators(this._isDisplayingIndicators);
            }
            for (const input of inputs.others) {
                if (input instanceof WebVisuXRToolkitInput_1.WebVisuXRToolkit3DInput) {
                    input.displayIndicators(this._isDisplayingIndicators);
                }
            }
        }
        setMixedRealityMode(iOnOff) {
            if (this._isMixedRealityActive !== iOnOff) {
                this.sceneManager._setTransparentBackground(iOnOff);
                this._isMixedRealityActive = iOnOff;
                const inputs = this._inputManager.getInputs();
                if (inputs.left) {
                    inputs.left.setMixedRealityMode(this._isMixedRealityActive);
                }
                if (inputs.right) {
                    inputs.right.setMixedRealityMode(this._isMixedRealityActive);
                }
                for (const input of inputs.others) {
                    if (input instanceof WebVisuXRToolkitInput_1.WebVisuXRToolkitInput) {
                        input.setMixedRealityMode(this._isMixedRealityActive);
                    }
                }
                this._skillsManager.updateCurrentState(iOnOff ? WebVisuXRToolkit_1.InputAction.MixedReality : WebVisuXRToolkit_1.InputAction.FullImmersive);
            }
        }
        endSession() {
            if (this._session) {
                this._session.end();
            }
            else {
                this.OnSessionEnd();
            }
        }
        get session() {
            return this._session;
        }
        get isMixedRealityAvailable() {
            return this._isMixedRealityAvailable;
        }
        mapCameraToXREye(viewport, view) {
            if (viewport.width === 0 || !view.eye || view.eye === 'none') // When there are two views but mono rendering is expected
             {
                if (this._lockCamera) {
                    this._computeMatrix.setFromArray([-1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
                }
                else {
                    (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransformViewpoint)(view.transform, this._computeMatrix);
                }
                this._sceneManager._computeXRCamera(this._computeMatrix, view.projectionMatrix, this._sceneManager.viewer.currentViewpoint.camera, Math.min(100, this._sceneManager.viewer.currentViewpoint.camera.near), Math.max(100000, this._sceneManager.viewer.currentViewpoint.camera.far), { screenwidth: viewport.width || this._sceneManager.viewer.canvas.width, screenHeight: viewport.height });
            }
            else if (view.eye === 'left') {
                if (!this._lockCamera) {
                    (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransformViewpoint)(view.transform, this._sceneManager._leftTransformMatrix);
                    if (WebVisuXRToolkitConfigManager.instance.settings.get("Panorama360Mode")) {
                        this._sceneManager._leftTransformMatrix.setPosition(null_vec3);
                    }
                }
                this._sceneManager._leftProjectionMatrix.setFromArray(Array.from(view.projectionMatrix));
                //this._sceneManager.computeXRCamera is automatically called in stereo mode with the camera system
            }
            else if (view.eye === 'right') {
                if (!this._lockCamera) {
                    (0, WebVisuXRToolkitHelpers_1.convertXRRigidTransformViewpoint)(view.transform, this._sceneManager._rightTransformMatrix);
                    if (WebVisuXRToolkitConfigManager.instance.settings.get("Panorama360Mode")) {
                        this._sceneManager._rightTransformMatrix.setPosition(null_vec3);
                    }
                }
                this._sceneManager._rightProjectionMatrix.setFromArray(Array.from(view.projectionMatrix));
                //this._sceneManager.computeXRCamera is automatically called in stereo mode with the camera system
            }
        }
        get dt() {
            return this._dt;
        }
        isStereoRendering() {
            return this._isStereoRendering;
        }
        makeScreenshot(eye) {
            const gl = this._xrContext;
            const viewer = this._sceneManager.viewer;
            const layer = this.glBaseLayer;
            let fullWidth = 0;
            let fullHeight = 0;
            if (layer && layer.framebuffer) {
                fullWidth = layer.framebufferWidth;
                fullHeight = layer.framebufferHeight;
            }
            else {
                fullWidth = gl.drawingBufferWidth;
                fullHeight = gl.drawingBufferHeight;
            }
            let readX = 0;
            let readY = 0;
            let readWidth = fullWidth;
            let readHeight = fullHeight;
            if (eye === "left") {
                readWidth = Math.floor(fullWidth / 2);
                readX = 0;
            }
            else if (eye === "right") {
                readWidth = Math.ceil(fullWidth / 2);
                readX = Math.floor(fullWidth / 2);
            }
            const pixelData = new Uint8Array(readWidth * readHeight * 4);
            const buffer = {
                data: pixelData,
                width: readWidth,
                height: readHeight,
                x: readX,
                y: readY
            };
            const viewpoint = viewer.currentViewpoint;
            /*const effectsOverride = {};
            Object.entries((viewer as any)._viewerEffectSettings.settings).forEach((item: [string, any]) =>
            {
                const name = item[0];
                const value = item[1];
                if (value.hasOwnProperty("contentChecker"))
                {
                    effectsOverride[name] = value.contentChecker;
                }
            });*/
            viewer.renderToTarget(buffer, viewpoint, false, undefined, //effectsOverride,
            true);
            return {
                data: pixelData,
                width: readWidth,
                height: readHeight
            };
        }
    }
    exports.WebVisuXRToolkitManager = WebVisuXRToolkitManager;
});
