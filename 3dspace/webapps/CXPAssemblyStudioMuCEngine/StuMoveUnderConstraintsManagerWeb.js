/**
* @quickReview A97 25:02:19 : Creation
* @quickReview A97 25:03:07 : Commented traces
* @quickReview A97 25:03:26 : Reset position implemented
* @quickReview A97 25:05:13 : IR-1396087 : Constraints are not respected in 3DPlay MUC
* @quickreview A97 25:06:26 : IR-1419406 : Get rid of web only prereqs from MuC code
* @quickReview A97 25:08:08 : IR-1435517 : Moved ComputeCoG and GetRootActor to StuMoveUnderConstraintsManager
* @quickReview A97 25:08:14 : IR-1419170 : Double pinch on a fix part fix all parts together
* @quickReview A97 25:09:18 : IR-1440169: Components is moving to infinite position when dragging.
* @quickReview A97 26:01:19 : FUN162248 : Manager specific to handle WebApp and AVP needs.
* @quickReview A97 26:01:22 : FUN162248 : MuC should not work if ProductCDS json retrieval fails.
* @quickReview A97 26:02:19 : IR-1497557: Reset positions inactive or uncomplete
*/

/**
 * @name DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerWeb
 * @constructor
 * @hideconstructor
 *
 * @description
 * MoveUnderConstraintsManager Web Class Singleton (replace c++ binding)
 */
define("DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManagerWeb", [
  "DS/CXPAssemblyStudioMuCEngine/StuMoveUnderConstraintsManager",
  "DS/StuCore/StuManager",
  "DS/CATSolverCDSWeb/CATSolverCDSSolver",
  "DS/CAT3DExpModel/CAT3DXModel",
  "DS/MathematicsES/MathsDef",
  "DS/StuCore/StuContext",
  "DS/StuRenderEngine/StuActor3D",
  'DS/StuRenderEngine/StuSubProductActor',
  'DS/StuSound/StuSoundPlayerStartedEvent',
], function (StuMoveUnderConstraintsManager,
  StuManager,
  CATSolverCDSSolver,
  CAT3DXModel,
  MathsDef,
  StuContext,
  StuActor3D,
  StuSubProductActor) {
  "use strict";

  //==============================================================================
  // StuMoveUnderConstraintsManager::onInitialize
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.onInitialize = function () {
    //console.log(`StuMoveUnderConstraintsManagerWeb : onInitialize `);

    this.soundPlayCount = 0;
    this.cdsSolver = new CATSolverCDSSolver();
    this.mapActorIDAndPosition = new Map();
    this._loadCDSJson();

    StuManager.prototype.onInitialize.call(this);
  };

  //==============================================================================
  // StuMoveUnderConstraintsManagerJS::onDispose
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.onDispose = function () {
    //console.log(`StuMoveUnderConstraintsManagerWeb : onDispose `);
    StuManager.prototype.onDispose.call(this);
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::_loadCDSJson
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype._loadCDSJson = async function () {
    if (this.cdsSolver) {

      try {
        const expCoreLinkManager = CAT3DXModel._getExpCoreLinkManager();
        let cdsJsonStream = await expCoreLinkManager.resolveLink("ExpCore://localMedia/Streams/ProductCDS.json");
        if (cdsJsonStream) {
          const sJsonString = cdsJsonStream.getText();
          if (sJsonString) {
            this.initSolver(sJsonString);
          }
        }
      }
      catch (error) {
        // sJsonString will be null if Product Constraints are not exposed in the data. Move Under Constraints should not work in that case.
        this.cleanSolver();
        console.warn(`Move Under Constraints behavior won't work since Mechanical Constraints could not be retrieved. Please check if Product Constraints are exposed in the data.`);
      }
    }
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::fixActorTemporarily
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.fixActorTemporarily = function (iActorToFix, ibFix) {
    let obFixToggled = false;

    if (iActorToFix) {
      let arrPathOfActor = [];
      arrPathOfActor = this._getPathOfActor(iActorToFix);
      obFixToggled = this.fixActorRigidSet(arrPathOfActor, ibFix);
    }

    return obFixToggled;
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::storeActorInitialPositions
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.storeActorInitialPositions = function () {

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
  // StuMoveUnderConstraintsManager::resetPosition
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.resetPosition = function () {
    for (const [actorIDPath, actorAbsPos] of this.mapActorIDAndPosition) {
      let actorToPosition = this._getActorFromID(actorIDPath);
      if (actorToPosition) {
        this.resetActorPosition(actorToPosition, actorAbsPos);
      }
    }

    this.resetSolver();
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::setGrabbedActor
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.setGrabbedActor = function (iGrabbedActor, iPickingPoint, isManagerType) {
    //console.log(`StuMoveUnderConstraintsManagerWeb : setGrabbedActor `);

    if (iGrabbedActor) {
      let listPathOfActor = [];
      listPathOfActor = this._getPathOfActor(iGrabbedActor);

      this.setMovingActorInSolver(iGrabbedActor, listPathOfActor, iPickingPoint, isManagerType);
    }
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::computePositionOfActors
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.computePositionOfActors = function (iAbsMatrixTransfoToApply) {
    //console.log(`StuMoveUnderConstraintsManagerWeb : computePositionOfActors `);

    if (this._grabbedActor && this._grabbedActor instanceof StuActor3D) {

      // Apply transfo through solver
      if (iAbsMatrixTransfoToApply && typeof iAbsMatrixTransfoToApply.matrix !== 'undefined') {
        let solverResults = this.getSolverResult(this._grabbedActor, iAbsMatrixTransfoToApply);
        if (solverResults)
          this._processSolverResults(solverResults);
      }

      // For debugging
      // To Apply transfo directly without solver to grabbed actor
      // let arrMatrix = iAbsMatrixTransfoToApply.matrix;
      // if (arrMatrix) {
      //   // Convert 4x4 Matrix to Transformation
      //   let absTransfoToApply = new DSMath.Transformation();
      //   absTransfoToApply.setFromArray([
      //     arrMatrix[0], arrMatrix[1], arrMatrix[2], arrMatrix[9],
      //     arrMatrix[3], arrMatrix[4], arrMatrix[5], arrMatrix[10],
      //     arrMatrix[6], arrMatrix[7], arrMatrix[8], arrMatrix[11],
      //     0, 0, 0, 0], 1);

      //   // // 1. Apply transfo directly -> 1
      //   //let absPosMoving = new MathsDef.Transformation();
      //   //absPosMoving = this._grabbedActor.getTransform(rootActor);
      //   //absPosMoving = this._grabbedActor.getTransform("World");
      //   //absPosMoving.multiply(absTransfoToApply, true)
      //   //this._grabbedActor.setTransform(absPosMoving, "World");

      //   // // 1. Apply transfo directly -> 2
      //   // let rootActor = this.getRootActor(this._grabbedActor);
      //   // if (rootActor) {
      //   //   let absPosMoving = new MathsDef.Transformation();
      //   //   absPosMoving = this._grabbedActor.getTransform("World");
      //   //   this.setActorPosition(rootActor, this._grabbedActor, absPosMoving, absTransfoToApply);
      //   // }
      // }
    }
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::_processSolverResults
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype._processSolverResults = function (iResults) {
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
            console.log(`MoveUnderConstraintsManagerWeb::_processSolverResults : actorToPosition not found!`);
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
  // StuMoveUnderConstraintsManager::_getIDOfActor
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype._getIDOfActor = function (iActor) {
    let oActorID = "";
    if (iActor) {
      let modelObj = iActor.CATI3DExperienceObject.getModelObject();
      if (modelObj) {
        let sActorIDPath = modelObj.GetID();
        if (sActorIDPath) {
          let arrPath = sActorIDPath.split(",");
          oActorID = arrPath[arrPath.length - 1];
        }
      }
    }
    return oActorID;
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::_getPathOfActor
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype._getPathOfActor = function (iActor) {
    let oActorIDPath = [];
    if (iActor) {
      let parentActor = iActor.getParentActor();
      if (parentActor instanceof StuSubProductActor) {
        let listParentPath = [];
        listParentPath = this._getPathOfActor(parentActor);
        //oActorIDPath.concat(listParentPath);
        oActorIDPath = listParentPath;
      }

      let sActorID = this._getIDOfActor(iActor);
      oActorIDPath.push(sActorID);
    }
    return oActorIDPath;
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::_getActorFromID
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype._getActorFromID = function (isActorIDPath) {
    //let actorID = isActorIDPath[isActorIDPath.length - 1];
    let oActor = null;

    //let ListOfPermanentsActors = StuContext.Experience.getCurrent().getAllActors();
    let ListOfActors = StuContext.Experience.getCurrent().currentScene.getAllActors();
    for (let idx = 0; idx < ListOfActors.length; idx++) {
      let sName = ListOfActors[idx].CATI3DExperienceObject.GetValueByName("_varName");
      const sCurrIDPath = this._getPathOfActor(ListOfActors[idx]);
      if (this.isPathSame(sCurrIDPath, isActorIDPath)) {
        oActor = ListOfActors[idx];
      }
    }

    return oActor;
  };

  //==============================================================================
  // StuMoveUnderConstraintsManager::getManagerType
  //==============================================================================
  StuMoveUnderConstraintsManager.prototype.getManagerType = function () {
    let osType = "Manager_WEB";
    return osType;
  };

  // //==============================================================================
  // // StuMoveUnderConstraintsManager::_applyTransfoToActorPositionOld
  // //==============================================================================
  // StuMoveUnderConstraintsManager.prototype._applyTransfoToActorPositionOld = function (isActorID, iTransfo) {
  //   let movingActor = this._getActorFromID(isActorID);
  //   if (movingActor) {
  //     //const sName = movingActor.CATI3DExperienceObject.GetValueByName('_varName');

  //     let curPosTransfo = this._GetTransfoFromActorPosition(movingActor);
  //     // Apply solver transfo to the current position of actor to get its new position after the solve.
  //     iTransfo.multiply(curPosTransfo, false);

  //     let currPosTransfo = new MathsDef.Transformation();
  //     movingActor.CATIMovable.GetLocalPosition(currPosTransfo);
  //     if (!this._isEqual(currPosTransfo, iTransfo)) {
  //       //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} | Before CATIMovable::SetLocalPosition ${sName}`);
  //       //movingActor.CATIMovable.SetLocalPosition(null, iTransfo);
  //       movingActor.CATI3DExperienceObject.SetValueByName("_varposition", iTransfo.getArray());
  //       //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} | After CATIMovable::SetLocalPosition ${sName}`);
  //     }

  //     //const sName = movingActor.QueryInterface('CATI3DExperienceObject').GetValueByName('_varName');
  //     //console.log(`${++this._count} : _applyTransfoToActorPosition ${sName} : ${iTransfo[9]} ${iTransfo[10]} ${iTransfo[11]}`);
  //   }
  // };

  // //==============================================================================
  // // StuMoveUnderConstraintsManager::_GetTransfoFromActorPosition
  // //==============================================================================
  // StuMoveUnderConstraintsManager.prototype._GetTransfoFromActorPosition = function (iActor) {
  //   let oPosTransfo = new MathsDef.Transformation();
  //   if (iActor) {
  //     let matPos = iActor.CATI3DExperienceObject.GetValueByName("_varposition");
  //     oPosTransfo = this._GetTransfoFromPosition(matPos);
  //   }
  //   return oPosTransfo;
  // };

  // //==============================================================================
  // // StuMoveUnderConstraintsManager::_GetTransfoFromPosition
  // //==============================================================================
  // StuMoveUnderConstraintsManager.prototype._GetTransfoFromPosition = function (iMatPosition) {
  //   let oPosTransfo = new MathsDef.Transformation();
  //   if (iMatPosition) {
  //     oPosTransfo.setFromArray(
  //       [
  //         iMatPosition[0],
  //         iMatPosition[1],
  //         iMatPosition[2],
  //         iMatPosition[3],
  //         iMatPosition[4],
  //         iMatPosition[5],
  //         iMatPosition[6],
  //         iMatPosition[7],
  //         iMatPosition[8],
  //         iMatPosition[9],
  //         iMatPosition[10],
  //         iMatPosition[11],
  //       ]);
  //   }
  //   return oPosTransfo;
  // };

  // //--------------------------------------------------------------------
  // // StuMoveUnderConstraintsManager::_GetSolverTransfoFromTransfo
  // //--------------------------------------------------------------------
  // StuMoveUnderConstraintsManager.prototype._GetSolverTransfoFromTransfo = function (
  //   iTransfo
  // ) {
  //   let arrTransfo = iTransfo.getArray();

  //   let oRelativeTransfo = {
  //     matrix: [
  //       arrTransfo[0],
  //       arrTransfo[1],
  //       arrTransfo[2],
  //       arrTransfo[3],
  //       arrTransfo[4],
  //       arrTransfo[5],
  //       arrTransfo[6],
  //       arrTransfo[7],
  //       arrTransfo[8],
  //       arrTransfo[9],
  //       arrTransfo[10],
  //       arrTransfo[11],
  //     ],
  //   };

  //   return oRelativeTransfo;
  // };

  // //==============================================================================
  // // StuMoveUnderConstraintsManager::_GetTransfoFromSolverOutput
  // //==============================================================================
  // StuMoveUnderConstraintsManager.prototype._GetTransfoFromSolverOutput = function (iSolverTransfo) {
  //   let oMatTransfo = new MathsDef.Transformation();
  //   if (iSolverTransfo) {
  //     oMatTransfo.setFromArray(
  //       [
  //         iSolverTransfo.elements[0],
  //         iSolverTransfo.elements[1],
  //         iSolverTransfo.elements[2],
  //         iSolverTransfo.elements[4],
  //         iSolverTransfo.elements[5],
  //         iSolverTransfo.elements[6],
  //         iSolverTransfo.elements[8],
  //         iSolverTransfo.elements[9],
  //         iSolverTransfo.elements[10],
  //         iSolverTransfo.elements[12],
  //         iSolverTransfo.elements[13],
  //         iSolverTransfo.elements[14],
  //       ]);
  //   }
  //   return oMatTransfo;
  // };

  // //==============================================================================
  // // StuMoveUnderConstraintsManager::_isEqual
  // //==============================================================================
  // StuMoveUnderConstraintsManager.prototype._isEqual = function (iTransfo1, iTransfo2) {
  //   let obEqual = false;
  //   let inverseTransfo1 = iTransfo1.getInverse();
  //   let resultTransfo = inverseTransfo1.multiply(iTransfo2);

  //   if (resultTransfo.isIdentity() &&
  //     resultTransfo.vector.x == 0 && resultTransfo.vector.y == 0 && resultTransfo.vector.z == 0) {
  //     obEqual = true;
  //   }
  //   return obEqual;
  // };

  return StuMoveUnderConstraintsManager;
});
