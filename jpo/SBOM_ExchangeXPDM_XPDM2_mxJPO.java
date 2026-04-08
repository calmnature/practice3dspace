
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class SBOM_ExchangeXPDM_XPDM2_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__DELSBOMModel_div_DELS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELSBOMModel/DELSBOMHardwareUsageReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__DELSBOMModel_div_DELS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELSBOMModel/DELSBOMAggregatedUsageReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__DELSBOMModel_div_DELS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELSBOMModel/DELSBOMZoneUsageReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__DELSBOMModel_div_DELS = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("DELSBOMModel/DELSBOMSoftwareUsageReference");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.sbom.procedures.ProcedureCalls_correspondingComponentsFromSR");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_5__com_dot_dassault_syst = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("com.dassault_systemes.platform.model.sbom.procedures.ProcedureCalls_inZonePointedObjectsFromSR");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSBOMRefForCorrespondingComponent = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSBOMRefForAccessPoint = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSBOMRefForInZone = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCorrespondingComponent = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetAccessPoint = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetInZone = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetSBOMRefForCorrespondingComponent.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELSBOMModel_div_DELS ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_1__DELSBOMModel_div_DELS ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_2__DELSBOMModel_div_DELS ) ), com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_3__DELSBOMModel_div_DELS ) ) );
		PLMIDSetSBOMRefForAccessPoint.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELSBOMModel_div_DELS ) );
		PLMIDSetSBOMRefForInZone.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.Restrict( iContext , iPLMIDSet, _STRING_0__DELSBOMModel_div_DELS ) );
		PLMIDSetCorrespondingComponent.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_4__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetSBOMRefForCorrespondingComponent } ) );
		PLMIDSetAccessPoint.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_5__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetSBOMRefForAccessPoint } ) );
		PLMIDSetInZone.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecuteJavaProcedure( iContext , _STRING_4__com_dot_dassault_syst, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { PLMIDSetSBOMRefForInZone } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetCorrespondingComponent ), PLMIDSetAccessPoint ), PLMIDSetInZone ) );
	}
}
