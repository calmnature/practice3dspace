/**
* @quickReview A97 25:02:19 : Creation
* @quickReview A97 25:03:07 : Commented traces
* @quickReview A97 25:03:26 : Added Manager public methods
* @quickReview A97 26:01:19 : FUN162248 : Manager specific to handle NativeApp Play needs. 
* @quickReview A97 26:01:22 : FUN162248 : MuC should not work if ProductCDS json retrieval fails.
* @quickReview A97 26:02:19 : IR-1497557: Reset positions inactive or uncomplete
*/

/**
 * @name DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerNA
 * @constructor
 * @hideconstructor
 *
 * @description
 * MoveUnderConstraintsManager c++ binding
 */
define('DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerNA',
  [
    'DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager',
    'DS/StuCore/StuManager',
    'DS/CATSolverCDSWeb/CATSolverCDSSolver',
    "DS/StuCore/StuContext",
    "DS/StuRenderEngine/StuActor3D",
    'DS/StuRenderEngine/StuSubProductActor',
    "DS/MathematicsES/MathsDef",
  ],
  function (StuMoveUnderConstraintsManagerJS,
    StuManager,
    CATSolverCDSSolver,
    StuContext,
    StuActor3D,
    StuSubProductActor,
    MathsDef) {
    'use strict';

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::onInitialize
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.onInitialize = function () {
      //console.log(`StuMoveUnderConstraintsManagerNA : onInitialize `);

      this.soundPlayCount = 0;

      try {
        this.cdsSolver = new CATSolverCDSSolver();
      }
      catch (error) {
        console.log(`StuMoveUnderConstraintsManagerNA :  new CATSolverCDSSolver failed ${error}`);
      }

      this.mapActorIDAndPosition = new Map();
      this._loadCDSJson();

      StuManager.prototype.onInitialize.call(this);
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::onDispose
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.onDispose = function () {
      //console.log(`StuMoveUnderConstraintsManagerNA : onDispose `);
      StuManager.prototype.onDispose.call(this);
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_loadCDSJson
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._loadCDSJson = function () {

      if (this.cdsSolver) {
        let sJsonString = null;
        let rootActor = this._getRootPrdActorFromExperience();
        if (rootActor) {
          // Use C++ binding to retrieve ProductCDS.json content
          let jsonFact = new StuMuCJsonFactory();
          if (jsonFact) {
            try {
              sJsonString = jsonFact.retrieveCDSJson(rootActor.CATI3DExperienceObject);
            }
            catch (error) {
              console.log(`StuMoveUnderConstraintsManagerNA : retrieveCDSJson failed ${error}`);
            }
          }
        }

        // sJsonString will be null if Product Constraints are not exposed in the data. Move Under Constraints should not work in that case.
        if (sJsonString) {
          this.initSolver(sJsonString);
        }
        else {
          this.cleanSolver();
        }
      }
      else
        console.log(`StuMoveUnderConstraintsManagerNA : this.cdsSolver is NULL`);
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::fixActorTemporarily
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.fixActorTemporarily = function (iActorToFix, ibFix) {
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
      //console.log("StuMoveUnderConstraintsManagerNA : fixActorTemporarily ");
      let obFixToggled = false;

      if (iActorToFix) {
        let arrPathOfActor = [];
        arrPathOfActor = this._getPathOfActor(iActorToFix);
        obFixToggled = this.fixActorRigidSet(arrPathOfActor, ibFix);
      }

      return obFixToggled;
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::storeActorInitialPositions
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.storeActorInitialPositions = function () {
      //implementation in StuMoveUnderConstraintsManagerWeb and StuMoveUnderConstraintsManagerNA
      //console.log("StuMoveUnderConstraintsManagerNA : storeActorInitialPositions ");

      let rootActor = null;
      let ListOfActors = StuContext.Experience.getCurrent().currentScene.getAllActors();
      for (let actor of ListOfActors) {
        if (actor instanceof StuActor3D) {
          // A97 Review: Storing leaf alone might not be enough
          if (this.isALeafActor(actor)) {
            let sName = actor.CATI3DExperienceObject.GetValueByName("_varName");
            let actorIDPath = this._getPathOfActor(actor);

            if (!rootActor)
              rootActor = this.getRootActor(actor);

            // IR-1497557: Store position of all leaf objects
            if (rootActor)
              this.storeActorInitialPosition(rootActor, actor, actorIDPath);
          }
        }
      }
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::resetPosition
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.resetPosition = function () {
      //console.log("StuMoveUnderConstraintsManagerNA: resetPosition");

      for (const [actorIDPath, actorAbsPos] of this.mapActorIDAndPosition) {
        let actorToPosition = this._getActorFromID(actorIDPath);
        if (actorToPosition) {
          this.resetActorPosition(actorToPosition, actorAbsPos);
        }
      }

      this.resetSolver();
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::setGrabbedActor
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.setGrabbedActor = function (iGrabbedActor, iPickingPoint, isManagerType) {
      //console.log(`StuMoveUnderConstraintsManagerNA : setGrabbedActor`);

      if (iGrabbedActor) {
        let listPathOfActor = [];
        listPathOfActor = this._getPathOfActor(iGrabbedActor);

        this.setMovingActorInSolver(iGrabbedActor, listPathOfActor, iPickingPoint, isManagerType);
      }
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::computePositionOfActors
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.computePositionOfActors = function (iAbsMatrixTransfoToApply) {
      //console.log("StuMoveUnderConstraintsManagerNA: computePositionOfActorsNA");

      if (this._grabbedActor && this._grabbedActor instanceof StuActor3D) {
        // Apply transfo through solver
        if (iAbsMatrixTransfoToApply && typeof iAbsMatrixTransfoToApply.matrix !== 'undefined') {
          let solverResults = this.getSolverResult(this._grabbedActor, iAbsMatrixTransfoToApply);
          if (solverResults)
            this._processSolverResults(solverResults);
        }
      }
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_processSolverResults
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._processSolverResults = function (iResults) {
      //console.log(`${++this._count} : _processSolverResults | Result length ${iResults.length}`);
      if (0 < iResults.length) {

        //console.log(` _processSolverResults | Result length GREATER than 0`);
        this.soundPlayCount = 0;
        for (let currResult of iResults) {
          // IR-1419406: Solver returns value in MathematicsWeb\MathematicsES.mweb\src\MathsDef.js formats. So no conversion is needed.
          let currMatTransfo = currResult.transfo;

          if (this.isTransfoValid(currMatTransfo)) {
            let sPathOfIDOfCurrActor = currResult.path.split("\\u0005");
            let actorToPosition = this._getActorFromID(sPathOfIDOfCurrActor);
            if (actorToPosition) {
              //this._applyTransfoToActorPositionOld(sPathOfIDOfCurrActor, currMatTransfo);
              this.applyTransfoToActorPosition(actorToPosition, currMatTransfo);
            }
            else
              console.log(`MoveUnderConstraintsManagerNA::_processSolverResults : actorToPosition not found!`);
          }
          else {
            //this._ResetActorPostion("Invalid transfo");
            //console.log( `${++this ._count} : isTransfoValid FALSE | _ResetActorPostion  to be callled` );
          }
        }
      }
      else {
        //console.log(` _processSolverResults | Result length LESS than 0`);
        ++this.soundPlayCount;

        if (this.soundPlayCount > 4) {
          let rootActor = this.getRootActor(this._grabbedActor);
          if (rootActor) {
            this.playSound(rootActor);
          }
          this.soundPlayCount = 0;
        }

        //this._ResetActorPostion("No solver result");
        //console.log( `${++this ._count} : iResults.length = ZERO | _ResetActorPostion  to be callled` );
      }
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_getIDOfActor
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._getIDOfActor = function (iActor) {
      let oActorID = "";
      if (iActor) {
        //let sActorID = iActor.GetObject().GetID();
        //let modelObj = iActor.CATI3DExperienceObject.getModelObject();
        //let sActorIDPath = iActor.CATI3DExperienceObject._modelObject.GetID();
        let sActorIDPath = iActor.CATI3DExperienceObject.getIDPath();
        if (sActorIDPath) {
          let arrPath = sActorIDPath.split(",");
          oActorID = arrPath[arrPath.length - 1];
        }
      }
      return oActorID;
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_getPathOfActor
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._getPathOfActor = function (iActor) {
      let oActorIDPath = [];
      if (iActor) {
        let parentActor = iActor.getParentActor();
        if (parentActor instanceof StuSubProductActor) {
          let listParentPath = [];
          listParentPath = this._getPathOfActor(parentActor);
          oActorIDPath = listParentPath;
        }

        let sActorID = this._getIDOfActor(iActor);
        oActorIDPath.push(sActorID);
      }
      return oActorIDPath;
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_getActorFromID
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._getActorFromID = function (isActorIDPath) {
      let oActor = null;

      //let ListOfPermanentsActors = StuContext.Experience.getCurrent().getAllActors();
      let ListOfActors = StuContext.Experience.getCurrent().currentScene.getAllActors();
      for (let idx2 = 0; idx2 < ListOfActors.length; idx2++) {
        let sName = ListOfActors[idx2].CATI3DExperienceObject.GetValueByName("_varName");
        const sCurrIDPath = this._getPathOfActor(ListOfActors[idx2]);
        if (this.isPathSame(sCurrIDPath, isActorIDPath)) {
          oActor = ListOfActors[idx2];
        }
      }

      return oActor;
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::_getRootPrdActorFromExperience
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype._getRootPrdActorFromExperience = function () {
      let oRootActor = null;
      const stuExperience = StuContext.Experience;
      if (stuExperience) {
        const currExperience = stuExperience.getCurrent();
        if (currExperience) {
          let currScene = currExperience.currentScene;
          if (currScene) {
            let ListOfActors = currScene.getAllActors();
            for (let actor of ListOfActors) {
              if (actor instanceof StuActor3D) {
                oRootActor = this.getRootActor(actor);
                if (oRootActor)
                  break;
              }
            }
          }
        }
      }

      return oRootActor;
    };

    //==============================================================================
    // StuMoveUnderConstraintsManagerJS::getManagerType
    //==============================================================================
    StuMoveUnderConstraintsManagerJS.prototype.getManagerType = function () {
      let osType = "Manager_NA";
      return osType;
    };

    return StuMoveUnderConstraintsManagerJS;
  });

define('DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerNA', ['DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerNA'], function (StuMoveUnderConstraintsManagerJS) {
  'use strict';

  return StuMoveUnderConstraintsManagerJS;
});
