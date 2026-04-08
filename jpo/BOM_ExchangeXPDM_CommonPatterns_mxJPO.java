
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class BOM_ExchangeXPDM_CommonPatterns_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel/DELFmiFunctionInstance");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELAsmAssemblyModelDi = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines/Fasten");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELAsmAssemblyModelDi = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelDisciplines/DetailedFasten");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_MfgProcessAlternate");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_GetHowToTargets");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModel_addPortsAndCnxExceptImplCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__all_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("all");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__DELFmiFunctionalModel = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisitePort/DELFmiProcessPrerequisitePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedencePort/DELFmiProcessPrecedencePort");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx/DELFmiProcessPrerequisiteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrerequisiteCnx1/DELFmiProcessPrerequisiteCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx/DELFmiProcessPrecedenceCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrecedenceCnx1/DELFmiProcessPrecedenceCnxCust");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__DELFmiFunctionalMode = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiFunctionalModelPrereqMatCnx/DELFmiProcessPrereqMaterializationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__DELAsmAssemblyModelC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELAsmAssemblyModelCnx/DELAsmProcessCanUseCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__PLMRequirementSpecif = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMRequirementSpecifyHowToCnxAbstract/PLMReqSpecifyHowToCnxAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__DELFmiMfgSubstitute_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmiMfgSubstitute/DELFmiMfgSubstituteCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__DELMfgResponsibility = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELMfgResponsibility/DELMfgResponsibilityCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__PLMHistorizationCnx_div_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx/PLMHistoLinkCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_21__PLMHistorizationCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_22__PLMHistorizationCnx_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PLMHistorizationCnx_addHistoEntitiesFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_23__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.commonprocedures.procedures.ProcedureCalls_MBOMAndProcessHowToLinkTargetFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_24__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement Specification");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_25__Rmt_ReqSpec_ExportCo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_ReqSpec_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_26__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_27__Rmt_Requirement_Expo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_Requirement_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_28__Class_div_Chapter_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Chapter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_29__Rmt_Chapter_ExportCo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_Chapter_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_30__DELFmi_PrecedenceCst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmi_PrecedenceCst_Target,DELFmi_PrecedenceCst_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_31__DELFmi_PrerequisiteC = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELFmi_PrerequisiteCst_Target,DELFmi_PrerequisiteCst_Source");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_32__DELPPRContextModel_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELPPRContextModel");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_33__ENOPcs_Process_addCa = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcs_Process_addCapableResourcesWithoutQueryFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_34__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_35__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_36__PRODUCTCFG_div_VPMRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG/VPMReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_37__ENOPpr_PPRData_Expan = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_ExpandStructure");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_38__ENOPcx_PPRContext_ad = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPcx_PPRContext_addProductsLinkedToProcessPorts");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_39__PRODUCTCFG_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("PRODUCTCFG");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_40__ProductCfg_Add3DPart = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ProductCfg_Add3DPartRepresentation");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_41__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.mbom.procedures.ProcedureCalls_MfgSubstituteFromCnx");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_42__ENOPpr_PPRData_addRe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("ENOPpr_PPRData_addResponsibilityFromCnx");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetCapableRsc = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductSTL = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetResourceStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetResponsibility = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet PLMRouteSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcessInst = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProcess = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedencePorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidPrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopePrecedenceCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetMaterializationCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetScopePrequisiteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetValidPrequisiteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductSTL = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableRsc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResourceRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResourceStructure = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetDRPorts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetPortsAndCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCapableCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAlternateProcess = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqs = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqSpec = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqSpecCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReq = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqChapter = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetReqChapterCompletude = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSubstituteCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResponsibilityCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSubstitute = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetResponsibility = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRefCnx = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetHistoRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductAggrRep = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDAllDoc = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDDocsAndScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMHowToTargetSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetFastens = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetProcessRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELFmiFunctionalModel ) );
		PLMIDSetProcessInst.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELFmiFunctionalModel ) );
		PLMIDSetProcess.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessRef, PLMIDSetProcessInst ) );
		PLMIDSetFastens.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_2__DELAsmAssemblyModelDi ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_3__DELAsmAssemblyModelDi ) ) );
		PLMIDSetAlternateProcess.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_4__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMHowToTargetSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_5__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetFastens } ) );
		PLMRouteSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_6__DELFmiFunctionalModel, _STRING_7__DELFmiFunctionalModel, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessRef } ) );
		PLMIDSetPortsAndCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetPortsAndCnx, _STRING_8__all_ ) );
		PLMIDSetDRPorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_9__DELFmiFunctionalModel ) );
		PLMIDSetPrecedencePorts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_10__DELFmiFunctionalMode ) );
		PLMIDSetDRCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_11__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_12__DELFmiFunctionalMode ) ) );
		PLMIDSetPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_13__DELFmiFunctionalMode ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_14__DELFmiFunctionalMode ) ) );
		PLMIDSetMaterializationCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_15__DELFmiFunctionalMode ) );
		PLMIDSetCapableCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_16__DELAsmAssemblyModelC ) );
		PLMIDSetReqCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_17__PLMRequirementSpecif ) );
		PLMIDSetSubstituteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_18__DELFmiMfgSubstitute_div_ ) );
		PLMIDSetResponsibilityCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_19__DELMfgResponsibility ) );
		PLMIDSetHistoRefCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetPortsAndCnx, _STRING_20__PLMHistorizationCnx_div_ ) );
		PLMRouteSetHistoRef.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_21__PLMHistorizationCnx_, _STRING_22__PLMHistorizationCnx_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetHistoRefCnx } ) );
		PLMIDSetHistoRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetHistoRef, _STRING_8__all_ ) );
		PLMIDSetReqs.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_23__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqCnx } ) );
		PLMIDSetReqSpec.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_24__Class_div_Requiremen ) );
		PLMIDSetReqSpecCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_25__Rmt_ReqSpec_ExportCo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqSpec } ) );
		PLMIDSetReq.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_26__Class_div_Requiremen ) );
		PLMIDSetReqCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_27__Rmt_Requirement_Expo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReq } ) );
		PLMIDSetReqChapter.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetReqs, _STRING_28__Class_div_Chapter_ ) );
		PLMIDSetReqChapterCompletude.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_29__Rmt_Chapter_ExportCo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetReqChapter } ) );
		PLMIDSetScopePrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessInst, PLMIDSetPrecedencePorts ) );
		PLMIDSetValidPrecedenceCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetPrecedenceCnx, _STRING_30__DELFmi_PrecedenceCst, PLMIDSetScopePrecedenceCnx ) );
		PLMIDSetScopePrequisiteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetProcessInst, PLMIDSetDRPorts ) );
		PLMIDSetValidPrequisiteCnx.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.ValidateSRs( iContext , PLMIDSetDRCnx, _STRING_31__DELFmi_PrerequisiteC, PLMIDSetScopePrequisiteCnx ) );
		PLMRouteSetCapableRsc.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__DELPPRContextModel_, _STRING_33__ENOPcs_Process_addCa, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetCapableCnx } ) );
		PLMIDSetCapableRsc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetCapableRsc, _STRING_8__all_ ) );
		PLMIDAllDoc.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableRsc, _STRING_34__Class_div_DOCUMENTS_ ) );
		PLMIDDocsAndScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_35__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDAllDoc } ) );
		PLMIDSetResourceRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetCapableRsc, _STRING_36__PRODUCTCFG_div_VPMRe ) );
		PLMRouteSetResourceStructure.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__DELPPRContextModel_, _STRING_37__ENOPpr_PPRData_Expan, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetResourceRef } ) );
		PLMIDSetResourceStructure.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetResourceStructure, _STRING_8__all_ ) );
		PLMRouteSetProductSTL.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__DELPPRContextModel_, _STRING_38__ENOPcx_PPRContext_ad, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetMaterializationCnx } ) );
		PLMIDSetProductSTL.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductSTL, _STRING_8__all_ ) );
		PLMIDSetProductRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetResourceStructure, _STRING_36__PRODUCTCFG_div_VPMRe ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , PLMIDSetProductSTL, _STRING_36__PRODUCTCFG_div_VPMRe ) ) );
		PLMRouteSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_39__PRODUCTCFG_, _STRING_40__ProductCfg_Add3DPart, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProductRef } ) );
		PLMIDSetProductAggrRep.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetProductAggrRep, _STRING_8__all_ ) );
		PLMIDSetSubstitute.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_41__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetProcessInst } ) );
		PLMRouteSetResponsibility.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_32__DELPPRContextModel_, _STRING_42__ENOPpr_PPRData_addRe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetResponsibilityCnx } ) );
		PLMIDSetResponsibility.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( PLMRouteSetResponsibility, _STRING_8__all_ ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetDRPorts ), PLMIDSetPrecedencePorts ), PLMIDSetMaterializationCnx ), PLMIDSetCapableCnx ), PLMIDSetValidPrecedenceCnx ), PLMIDSetValidPrequisiteCnx ), PLMIDSetCapableRsc ), PLMIDSetResourceStructure ), PLMIDSetProductSTL ), PLMIDSetAlternateProcess ), PLMIDSetReqCnx ), PLMIDSetReqs ), PLMIDSetReqSpecCompletude ), PLMIDSetReqCompletude ), PLMIDSetReqChapterCompletude ), PLMIDSetResponsibilityCnx ), PLMIDSetSubstitute ), PLMIDSetResponsibility ), PLMIDSetHistoRefCnx ), PLMIDSetHistoRef ), PLMIDSetProductAggrRep ), PLMIDDocsAndScope ), PLMHowToTargetSet ) );
	}
}
