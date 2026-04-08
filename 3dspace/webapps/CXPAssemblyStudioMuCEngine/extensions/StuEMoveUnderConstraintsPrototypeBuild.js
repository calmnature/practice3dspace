/**
* @quickReview A97 25:02:19 : Creation
*/

/**
* @name DS/CXPAssemblyStudioMuCEngine/extensions/StuEMoveUnderConstraintsPrototypeBuild
* @implements {DS/XCTWebExperienceAppPlay/interfaces/StuIPrototypeBuild}
*
* @description
* StuIPrototypeBuild implementation for CXPMoveUnderConstraintsBe_Spec
*/
define('DS/CXPAssemblyStudioMuCEngine/extensions/StuEMoveUnderConstraintsPrototypeBuild',
    [
        'UWA/Core',
        'DS/XCTWebExperienceAppPlay/extensions/StuEExperienceBasePrototypeBuild',
        'DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerWeb'
    ],

    function (
        UWA,
        StuEExperienceBasePrototypeBuild
    ) {
        'use strict';

        var StuEMoveUnderConstraintsPrototypeBuild = StuEExperienceBasePrototypeBuild.extend(
            /** @lends DS/CXPAssemblyStudioMuCEngine/extensions/StuEMoveUnderConstraintsPrototypeBuild.prototype **/
            {

            });

        return StuEMoveUnderConstraintsPrototypeBuild;
    });
