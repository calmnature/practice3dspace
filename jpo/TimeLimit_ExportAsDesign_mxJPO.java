
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class TimeLimit_ExportAsDesign_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELTimeLimit_div_DELT = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELTimeLimit/DELTimeLimitReferenceAbstract");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.process.procedures.ProcedureCalls_GetTimeLimitParam");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetTimeLimitRef = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetTimeLimitParam = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetTimeLimitRef.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELTimeLimit_div_DELT ) );
		PLMIDSetTimeLimitParam.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_1__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetTimeLimitRef } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( PLMIDSetTimeLimitRef, PLMIDSetTimeLimitParam ) );
	}
}
