
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class ResourceParameterPlan_ExportAsDesign_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELResourceParameterP = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELResourceParameterPlan/DELResourceParameterPlanAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetParametersFromRscParamPlans");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetParamPlan = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetParamPlanRow = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetParamPlan.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELResourceParameterP ) );
		PLMIDSetParamPlanRow.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_1__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetParamPlan } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetParamPlanRow ) );
	}
}
