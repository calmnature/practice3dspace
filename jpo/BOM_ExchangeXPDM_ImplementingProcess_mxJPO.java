
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class BOM_ExchangeXPDM_ImplementingProcess_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELFmiFunctionReferen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionReference_SystemScopes");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__DELLmiProductionSyste = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystem/DELLmiProductionSystemReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__RFLPLMImplementConnec = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__RFLPLMImplementConnec = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection_AddAllImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__RFLPLMImplementConnec = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("RFLPLMImplementConnection/RFLPLMImplementConnection");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__PLM_ImplementLink_Tar = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLM_ImplementLink_Target");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetImplementingFromImplementCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELLmiProductionSyst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionSystem/DELLmiProductionSystemInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELLmiProductionOper = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELLmiProductionOperation/DELLmiOperationInstance");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetSystemScope = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetRFLPCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetImplementingOp = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcess = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSystemScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetRFLPCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidRFLPCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplementingOp = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplementingObject = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMIDSetProcess.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessRef, PLMIDSetProcessInst ) );
		PLMRouteSetSystemScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__DELFmiFunctionalModel, _STRING_3__DELFmiFunctionReferen, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetSystemScope.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetSystemScope, _STRING_4__all_ ), _STRING_5__DELLmiProductionSyste ) );
		PLMRouteSetRFLPCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_6__RFLPLMImplementConnec, _STRING_7__RFLPLMImplementConnec, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetSystemScope } ) );
		PLMIDSetRFLPCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetRFLPCnx, _STRING_4__all_ ), _STRING_8__RFLPLMImplementConnec ) );
		PLMIDSetValidRFLPCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetRFLPCnx, _STRING_9__PLM_ImplementLink_Tar, PLMIDSetProcess ) );
		PLMIDSetImplementingObject.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_10__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetValidRFLPCnx } ) );
		PLMIDSetImplementingOp.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetImplementingObject, _STRING_11__DELLmiProductionSyst ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetImplementingObject, _STRING_12__DELLmiProductionOper ) ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetSystemScope ), PLMIDSetValidRFLPCnx ), PLMIDSetImplementingOp ) );
	}
}
