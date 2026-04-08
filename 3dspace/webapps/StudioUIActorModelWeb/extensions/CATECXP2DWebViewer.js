/**
* @name DS/StudioUIActorModelWeb/extensions/CATECXP2DWebViewer
* @implements {DS/StudioUIActorModelWeb/interfaces/CATICXPWebViewer}
* @constructor
*
* @description
* CATICXPWebViewer implementation
*/
define('DS/StudioUIActorModelWeb/extensions/CATECXP2DWebViewer',
[
	'UWA/Core',
    'UWA/Class',
],
function (UWA, Class) {
	'use strict';

	var CATECXP2DWebViewer = Class.extend(
	/** @lends DS/StudioUIActorModelWeb/extensions/CATECXP2DWebViewer.prototype **/
        {
        /**
         * @param {string} iScript - The JS script to execute
         */
        ExecuteScript: function (iScript) {
            const modelCATI3DXUIRep = this.QueryInterface('CATI3DXUIRep');
            if (modelCATI3DXUIRep) {
                modelCATI3DXUIRep.ExecuteScript(iScript);
            }
        },

        /**
         * Send message to webviewer (iframe)
         * @param {string} iMessage - The message to send
         */
        SendMessage: function (iMessage) {
            const modelCATI3DXUIRep = this.QueryInterface('CATI3DXUIRep');
            if (modelCATI3DXUIRep) {
                modelCATI3DXUIRep.SendMessage(iMessage);
            }
        }
	});
	return CATECXP2DWebViewer;
});
