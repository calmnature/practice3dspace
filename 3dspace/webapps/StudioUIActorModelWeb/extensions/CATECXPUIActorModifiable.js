/**
* @name DS/StudioUIActorModelWeb/extensions/CATECXPUIActorModifiable
* @implements {DS/VCXWebModifiables/VCXModifiable}
* @augments DS/CAT3DExpModel/extensions/CATEModifiable
* @constructor
*
* @description
* VCXIModifiable implementation for CXP3DActor_Spec
*/
define('DS/StudioUIActorModelWeb/extensions/CATECXPUIActorModifiable',
[
	'UWA/Core',
    'DS/CAT3DExpModel/extensions/CATEModifiable'
],

function (
    UWA,
    CATEModifiable
    ) {
    'use strict';

    class CATECXPUIActorModifiable extends CATEModifiable
    /** @lends DS/StudioUIActorModelWeb/extensions/CATECXPUIActorModifiable.prototype **/
    {     
        _getVCXPropertyValue(iVariableName) {
            if (iVariableName === 'opacity') {
                var vcxValue = super._getVCXPropertyValue(iVariableName);
                vcxValue.SetValue(vcxValue.GetValue() / 255);
                return vcxValue;
            }
            return super._getVCXPropertyValue(iVariableName);
        }

        _getVariableValue(iPropertyName, iPropertyValue) {
            if (iPropertyName === 'opacity') {
                return super._getVariableValue(iPropertyName, iPropertyValue) * 255;
            }
            return super._getVariableValue(iPropertyName, iPropertyValue);
        }
    }

    return CATECXPUIActorModifiable;
});

