/**
* @name DS/StudioUIActorModelWeb/extensions/CATE3DXUIRep2DCameraViewer
* @implements {DS/StudioUIActorModelWeb/interfaces/CATI3DXUIRep}
* @constructor
*
* @description
* CATI3DXUIRep implementation for CXP2DCameraViewer_Spec
*/
define('DS/StudioUIActorModelWeb/extensions/CATE3DXUIRep2DCameraViewer',
[
	'UWA/Core',
    'UWA/Class/Listener',
    'DS/StudioUIActorModelWeb/extensions/CATE3DXUIRep2DUIActor',
    'DS/StudioUIActorModelWeb/controls/CXPCameraViewerControl'
],
function (UWA, Listener, CATE3DXUIRep2DUIActor, CXPCameraViewerControl) {
	'use strict';

	var CATE3DXUIRep2DCameraViewer = CATE3DXUIRep2DUIActor.extend(Listener,
	/** @lends DS/StudioUIActorModelWeb/extensions/CATE3DXUIRep2DCameraViewer.prototype **/
	{
        _Fill: function(iContainer) {
            this._parent(iContainer);

            this._cameraViewer = new CXPCameraViewerControl().inject(iContainer);
            this._visuUpdatesEnabled = false;
            this._visuUpdatesTargetCamera = undefined;

            let cameraViewerEO = this.QueryInterface('CATI3DExperienceObject');
            if (cameraViewerEO) {
                this._SetCamera(cameraViewerEO.GetValueByName('camera'));
                this._ListenVariableChanges(cameraViewerEO, 'camera');

                this._SetLiveUpdate(cameraViewerEO.GetValueByName('liveUpdate'));
                this._ListenVariableChanges(cameraViewerEO, 'liveUpdate');

                this._SetEnabled(cameraViewerEO.GetValueByName('enabled'));
                this._ListenVariableChanges(cameraViewerEO, 'enabled');
            }
        },

        _UpdateProperty: function(iProps) {
            let iVariableName = iProps[0];
            let cameraViewerEO = this.QueryInterface('CATI3DExperienceObject');
            if (iVariableName === 'camera') {
                this._SetCamera(cameraViewerEO.GetValueByName('camera'));
            }  else if (iVariableName === 'liveUpdate') {
                this._SetLiveUpdate(cameraViewerEO.GetValueByName('liveUpdate'));
            } else if (iVariableName === 'enabled') {
                this._SetEnabled(cameraViewerEO.GetValueByName('enabled'));
            } else {
                this._parent(iProps);
            }
        },

        InstantiateView: function() {
            this._parent();
            this._EnableVisuUpdates();
        },

        DisposeView: function() {
            this._parent();
            this._DisableVisuUpdates();
        },

        RegisterPlayEvents: function(iSDKObject) {
			this._parent(iSDKObject);

            this._cameraViewer.onClick = function() {iSDKObject.doUIDispatchEvent('UIClickEvent');};
            this._cameraViewer.onDoubleClick = function() {iSDKObject.doUIDispatchEvent('UIDoubleClickEvent');};
            this._cameraViewer.onRightClick = function() {iSDKObject.doUIDispatchEvent('UIRightClickEvent');};
            this._cameraViewer.onEnter = function() {iSDKObject.doUIDispatchEvent('UIEnterEvent');};
            this._cameraViewer.onExit = function() {iSDKObject.doUIDispatchEvent('UIExitEvent');};
            this._cameraViewer.onHover = function() {iSDKObject.doUIDispatchEvent('UIHoverEvent');};
            this._cameraViewer.onPress = function() {iSDKObject.doUIDispatchEvent('UIPressEvent');};
            this._cameraViewer.onRelease = function() {iSDKObject.doUIDispatchEvent('UIReleaseEvent');};
		},

		ReleasePlayEvents: function() {
			this._parent();

            this._cameraViewer.onClick = null;
            this._cameraViewer.onDoubleClick = null;
            this._cameraViewer.onRightClick = null;
            this._cameraViewer.onEnter = null;
            this._cameraViewer.onExit = null;
            this._cameraViewer.onHover = null;
            this._cameraViewer.onPress = null;
            this._cameraViewer.onRelease = null;
		},

        _EnableVisuUpdates: function(iCamera, iViewer) {
            let CXPWebCameraManager = this.GetObject()._experienceBase.getManager('CXPWebCameraManager')
            if (CXPWebCameraManager) {
                let cameraViewer = (iViewer ? iViewer : this._cameraViewer._cameraViewer);
                let cameraViewerEO = this.QueryInterface('CATI3DExperienceObject')
                let cameraEO = (iCamera ? iCamera : cameraViewerEO.GetValueByName('camera'))
                if (cameraEO && cameraViewer) {
                    if (CXPWebCameraManager.RegisterBinding(cameraEO, cameraViewer)) {
                        this._visuUpdatesEnabled = true;
                        this._visuUpdatesTargetCamera = cameraEO;
                    }
                }
            }
        },

        _DisableVisuUpdates: function(iCamera, iViewer) {
            let CXPWebCameraManager = this.GetObject()._experienceBase.getManager('CXPWebCameraManager')
            if (CXPWebCameraManager) {
                let cameraViewer = (iViewer ? iViewer : this._cameraViewer._cameraViewer);
                let cameraViewerEO = this.QueryInterface('CATI3DExperienceObject')
                let cameraEO = (iCamera ? iCamera : cameraViewerEO.GetValueByName('camera'))
                if (cameraEO && cameraViewer) {
                    if (CXPWebCameraManager.UnregisterBinding(cameraEO, cameraViewer)) {
                        this._visuUpdatesEnabled = false;
                        this._visuUpdatesTargetCamera = undefined;
                    }
                }
            }
        },

        _RefreshVisuUpdates: function() {
            let CXPWebCameraManager = this.GetObject()._experienceBase.getManager('CXPWebCameraManager')
            if (CXPWebCameraManager) {
                let cameraViewer = this._cameraViewer._cameraViewer;
                let cameraViewerEO = this.QueryInterface('CATI3DExperienceObject')
                let cameraEO = cameraViewerEO.GetValueByName('camera')
                if (cameraEO && cameraViewer) {
                    if (this._cameraViewer.liveUpdate && !this._cameraViewer.disabled) {
                        CXPWebCameraManager.ActivateBinding(cameraEO, cameraViewer)
                    } else {
                        CXPWebCameraManager.DeactivateBinding(cameraEO, cameraViewer)
                    }
                }
            }
        },

        _SetCamera: function(iCamera) {
            if (this._visuUpdatesTargetCamera) {
                this._DisableVisuUpdates(this._visuUpdatesTargetCamera, this._cameraViewer._cameraViewer)
            }

            this._cameraViewer.camera = iCamera;
            this._EnableVisuUpdates()
            this._RefreshVisuUpdates()
        },

        _SetLiveUpdate: function(iLiveUpdate) {
            this._cameraViewer.liveUpdate = iLiveUpdate;
            this._RefreshVisuUpdates()
        },

        _SetEnabled: function(iEnabled) {
            this._cameraViewer.disabled = !iEnabled;
            this._RefreshVisuUpdates()
        },

	});
	return CATE3DXUIRep2DCameraViewer;
});
