<%--  displays result of search
   Copyright (c) 1992-2020 Dassault Systemes.
   All Rights Reserved.
--%>

<%@page import="com.matrixone.apps.domain.DomainRelationship"%>
<%@include file = "../emxUICommonAppInclude.inc" %>
<%@include file = "emxRouteInclude.inc" %>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<script language="JavaScript" src="../common/scripts/emxUIConstants.js" type="text/javascript"></script>
<script language="JavaScript" src="../common/scripts/emxUICore.js" type="text/javascript"></script>
<%
  String routeId        = emxGetParameter(request, "objectId");
  String sAllRotableIds = emxGetParameter(request, "routableIds");
  StringTokenizer stok = new StringTokenizer(sAllRotableIds, "|");

  String sPolicyAndValue="";
  String sRelId ="";
  String sOldState = "";

  Route routeBean = (Route)DomainObject.newInstance(context,DomainConstants.TYPE_ROUTE);

  while(stok.hasMoreTokens()) {

    String sRouteBasePolicyName ="";
    String sRouteBaseStateName="";

    sRelId = stok.nextToken().trim();
    sPolicyAndValue = emxGetParameter(request, sRelId);
    sOldState = emxGetParameter(request, sRelId+"State");

    if(!("".equals(sPolicyAndValue)) ) {
      sRouteBasePolicyName = sPolicyAndValue.substring(0,sPolicyAndValue.indexOf('#'));
      sRouteBaseStateName = sPolicyAndValue.substring(sPolicyAndValue.indexOf('#')+1,sPolicyAndValue.length());
      DomainRelationship domRel = new DomainRelationship(sRelId);
      StringList relSelect = new StringList();
      relSelect.add("from.physicalid");
      relSelect.add("from.state");
      relSelect.add("from.policy");
      Hashtable returnTable = domRel.getRelationshipData(context,relSelect);
      String physicalId = ((StringList)returnTable.get("from.physicalid")).get(0);
      StringList states = (StringList)returnTable.get("from.state");
      String policy = ((StringList)returnTable.get("from.policy")).get(0);
      String targetState = "";
      String lookupName = FrameworkUtil.lookupStateName(context, policy, sRouteBaseStateName);
      if(UIUtil.isNotNullAndNotEmpty(lookupName)) {
		 int indexOfCurrentState = states.indexOf(lookupName);
		 if(states.size()-1 >= indexOfCurrentState+1) {
			 targetState = states.get(indexOfCurrentState+1);
		 }				
	  }
      boolean accessRuleEvaluation = true;
      if(UIUtil.isNotNullAndNotEmpty(targetState) && UIUtil.isNotNullAndNotEmpty(lookupName) && "true".equalsIgnoreCase(FrameworkUtil.getChangeMaturityControlValue(context))) {
		  accessRuleEvaluation = AccessControlUtility.evaluatePromoteAccessRules(context, physicalId, lookupName, targetState);
	  }
      routeBean.setId(routeId);
      if(!sRouteBaseStateName.equals(sOldState) && accessRuleEvaluation){
        //update the attributes "Route Base Policy" and "Route Base State" in the Rel "Object Route"
        routeBean.updateObjectRouteRelAttributes(context, sRelId, sRouteBasePolicyName, sRouteBaseStateName, "");
      }
    }
  }
%>
<script language="javascript">
  //parent.window.getWindowOpener().document.location.reload();
  getTopWindow().getWindowOpener().document.location.href=getTopWindow().getWindowOpener().document.location.href;
  getTopWindow().closeWindow();
</script>
