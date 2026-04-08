
import matrix.db.Context;
import com.dassault_systemes.EKLEngine.completion.CompletionJPOEvaluator;


/**
 * ${CLASSNAME}
 */
public final class Process_ExchangeXPDM_XPDM2_mxJPO extends CompletionJPOEvaluator {

	/**
	 * Attributes
	 */
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_0__BOM_ExchangeXPDM_Comm = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("BOM_ExchangeXPDM_CommonPatterns");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_1__BOM_ExchangeXPDM_Impl = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("BOM_ExchangeXPDM_ImplementingProcess");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_2__BOM_ExchangeXPDM_With = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("BOM_ExchangeXPDM_WithEBOMImplementedIL");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_3__BOM_ExchangeXPDM_With = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("BOM_ExchangeXPDM_WithEBOMScoped");
	private final static com.dassault_systemes.EKLEngine.common.lib.implementation.StringType _STRING_4__SBOM_ExchangeXPDM_XPD = new com.dassault_systemes.EKLEngine.common.lib.implementation.StringType("SBOM_ExchangeXPDM_XPDM2");

	/**
	 * evaluate
	 * @param iContext
	 * @param iPLMIDSet
	 * @param oPLMIDSet
	 */
	public final void evaluate(matrix.db.Context iContext, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet iPLMIDSet, com.dassault_systemes.EKLEngine.common.lib.PLMIDSet oPLMIDSet)	
			throws Exception {
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetCommonPatterns = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetImplementingObject = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetSBOMSpecific = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductScope = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		com.dassault_systemes.EKLEngine.common.lib.PLMIDSet PLMIDSetProductIL = new com.dassault_systemes.EKLEngine.common.lib.PLMIDSet();
		PLMIDSetCommonPatterns.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_0__BOM_ExchangeXPDM_Comm, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMIDSetImplementingObject.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_1__BOM_ExchangeXPDM_Impl, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMIDSetProductIL.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_2__BOM_ExchangeXPDM_With, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMIDSetProductScope.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_3__BOM_ExchangeXPDM_With, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		PLMIDSetSBOMSpecific.setValue( com.dassault_systemes.EKLEngine.completion.lib.Completion.ExecutePLMProcedure( iContext , _STRING_4__SBOM_ExchangeXPDM_XPD, new com.dassault_systemes.EKLEngine.common.lib.implementation.ObjectType[] { iPLMIDSet } ) );
		oPLMIDSet.setValue( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( com.dassault_systemes.EKLEngine.common.lib.PLMIDSet.plus( iPLMIDSet, PLMIDSetCommonPatterns ), PLMIDSetImplementingObject ), PLMIDSetSBOMSpecific ), PLMIDSetProductScope ), PLMIDSetProductIL ) );
	}
}
