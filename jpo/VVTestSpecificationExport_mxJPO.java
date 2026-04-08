
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class VVTestSpecificationExport_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__Class_div_VV_Test_Spe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/VV_Test_Specification");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__VVTestSubSpecificatio = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestSubSpecificationExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__VVTestSpecificationSt = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestSpecificationStructureExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__Class_div_VV_Test_Cha = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/VV_Test_Chapter");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__VVTestChapterExpand_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestChapterExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__VVTestSpecificationTe = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestSpecificationTestCaseExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_6__Class_div_VV_Test_Cas = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/VV_Test_Case");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_7__VVTestCaseTestScripts = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestCaseTestScriptsExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_8__Class_div_VV_Test_Scr = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/VV_Test_Script");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_9__VVTestScriptStepsExpa = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("VVTestScriptStepsExpand");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_10__Class_div_VV_Test_St = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/VV_Test_Step");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_11__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.sma_vrp.completion.TestSpecificationCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_12__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.sma_vrp.completion.TestCaseCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_13__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.sma_vrp.completion.TestScriptCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_14__com_dot_dassault_sys = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.sma_vrp.completion.TestStepCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_15__Rmt_ReqSpec_ExportCo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_ReqSpec_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_16__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement Specification");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_17__Rmt_Requirement_Expo = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Rmt_Requirement_ExportCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_18__Class_div_Requiremen = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/Requirement");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_19__DocumentCompletion_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DocumentCompletion");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_20__Class_div_DOCUMENTS_ = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("Class/DOCUMENTS");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsTestSpec = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet SubTestSpec = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TestSpecChilds = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TestChapterChilds = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TestCases = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TestScripts = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet TestSteps = new com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsTestCases = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsTestChapters = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsTestScripts = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet IdsTestSteps = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ContentSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TestSpecData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TestCaseData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TestScriptData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet TestStepData = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ReqSpecSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet DocSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet ReqSet = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		IdsTestSpec.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__Class_div_VV_Test_Spe ) );
		SubTestSpec.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_1__VVTestSubSpecificatio, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestSpec } ) );
		IdsTestSpec.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( IdsTestSpec, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( SubTestSpec ), _STRING_0__Class_div_VV_Test_Spe ) ) );
		TestSpecChilds.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_2__VVTestSpecificationSt, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestSpec } ) );
		IdsTestChapters.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestSpecChilds ), _STRING_3__Class_div_VV_Test_Cha ) );
		TestChapterChilds.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_4__VVTestChapterExpand_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestChapters } ) );
		TestCases.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_5__VVTestSpecificationTe, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestSpec } ) );
		IdsTestCases.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestCases ), _STRING_6__Class_div_VV_Test_Cas ) );
		TestScripts.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_7__VVTestCaseTestScripts, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestCases } ) );
		IdsTestScripts.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestScripts ), _STRING_8__Class_div_VV_Test_Scr ) );
		TestSteps.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMFunction( iContext , _STRING_9__VVTestScriptStepsExpa, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestScripts } ) );
		IdsTestSteps.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestSteps ), _STRING_10__Class_div_VV_Test_St ) );
		TestSpecData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_11__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestSpec } ) );
		TestCaseData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_12__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestCases } ) );
		TestScriptData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_13__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestScripts } ) );
		TestStepData.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_14__com_dot_dassault_sys, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { IdsTestSteps } ) );
		ContentSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( TestSpecData, TestCaseData ), TestScriptData ), TestStepData ) );
		ReqSpecSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_15__Rmt_ReqSpec_ExportCo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , ContentSet, _STRING_16__Class_div_Requiremen ) } ) );
		ReqSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_17__Rmt_Requirement_Expo, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , ContentSet, _STRING_18__Class_div_Requiremen ) } ) );
		DocSet.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_19__DocumentCompletion_, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , ContentSet, _STRING_20__Class_div_DOCUMENTS_ ) } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( IdsTestSpec, com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestSpecChilds ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( SubTestSpec ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestChapterChilds ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestCases ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestScripts ) ), com.dassault_systemes.EKLEngine.common.lib.PLMRouteSet.Ids( TestSteps ) ), ContentSet ), ReqSpecSet ), ReqSet ), DocSet ) );
	}
}
