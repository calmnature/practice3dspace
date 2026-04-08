<%--
   emxLibraryCentralAttributeGroupPostProcess.jsp

   Copyright (c) 1992-2016 Dassault Systemes.
   All Rights Reserved.
   This program contains proprietary and trade secret information of MatrixOne,Inc.
   Copyright notice is precautionary only
   and does not evidence any actual or intended publication of such program
--%>

<%@page import="com.matrixone.apps.domain.util.FrameworkUtil"%>
<%@page import="com.matrixone.apps.classification.AttributeGroup"%>
<%@page import="com.matrixone.apps.framework.ui.UIUtil"%>
<%@include file="../emxUICommonAppInclude.inc"%>
<%@include file = "../common/enoviaCSRFTokenValidation.inc"%>
<%  
    String attributeGroupTitle   = emxGetParameter(request, "Title");

    String attributeGroupTitle_encodedForJS = XSSUtil.encodeForJavaScript(context, attributeGroupTitle);
    String attributeGroupTitle_encodedForURL = XSSUtil.encodeForURL(context, attributeGroupTitle);
    String strCharSet =  (String )emxGetParameter(request,"charSet");
    if(strCharSet == null || strCharSet.trim().equals(""))
    {
        strCharSet = "UTF8";
    }
    
    String attributeGroupName   = AttributeGroup.generateAttributeGroupName(attributeGroupTitle);
    if(UIUtil.isNullOrEmpty(attributeGroupName)){
        attributeGroupName = AttributeGroup.clonedName;;
    }
    String attributeGroupName_encodedForJS = XSSUtil.encodeForJavaScript(context, attributeGroupName);
    String attributeGroupName_encodedForURL = XSSUtil.encodeForURL(context, attributeGroupName);
    
    // Changes added by PSA11 end
    
    StringBuffer sbUrl          = new StringBuffer("../common/emxTree.jsp?treeMenu=type_MCMAttributeGroupTreeMenu&mode=insert&AppendParameters=true");
    sbUrl.append("&treeLabel=");
    sbUrl.append(attributeGroupTitle_encodedForURL);
    sbUrl.append("&objectName=");
    sbUrl.append(attributeGroupName_encodedForURL);
    sbUrl.append("&AGName=");
    sbUrl.append(attributeGroupName_encodedForURL);
    sbUrl.append("&suiteKey=LibraryCentral");
    sbUrl.append("&DefaultCategory=MCMAttributeGroupProperties");
    
    StringBuffer updatedURL = new StringBuffer("../common/emxForm.jsp?form=type_AttributeGroup&toolbar=LBCAttributeGroupPropertiesToolBar&HelpMarker=emxhelpattributegroup&formHeader=emxMultipleClassification.Common.Properties&Export=False&findMxLink=false&emxSuiteDirectory=documentcentral&mode=insert&suiteKey=LibraryCentral&StringResourceFileId=emxLibraryCentralStringResource&SuiteDirectory=documentcentral&objectBased=false&submitAction=refreshCaller&otherTollbarParams=treeLabel,objectName,mode,AGName");
    updatedURL.append("&treeLabel=");
    updatedURL.append(attributeGroupTitle_encodedForURL);
    updatedURL.append("&objectName=");
    updatedURL.append(attributeGroupName_encodedForURL);
    updatedURL.append("&AGName=");
    updatedURL.append(attributeGroupName_encodedForURL);
    String updatedURLStr = FrameworkUtil.encodeURL(updatedURL.toString(), strCharSet);
%>

<script language ="javascript">
    try{
             var currbc = getTopWindow().bclist.getCurrentBC();
             currbc.id = "<%=attributeGroupName_encodedForJS%>";
             getTopWindow().changeObjectLabelInTree("<%=attributeGroupName_encodedForJS%>", "<%=attributeGroupName_encodedForJS%>", true, true);
             if(currbc && currbc.categoryObj)
             {
                currbc.categoryObj.items[0].url = "<%=updatedURLStr%>";
             }
            var firstbc = getTopWindow().bclist.getFirstBC();
            currbc.id = firstbc.id;
            currbc.label = firstbc.label;
            currbc.pageURL = firstbc.pageURL;
            currbc.categoryObj = firstbc.categoryObj;
            currbc.category = firstbc.category;
            currbc.treeURL = firstbc.treeURL;
            var wndContent            = getTopWindow().findFrame(getTopWindow(),"content");
            wndContent.location.href  = "<%=sbUrl.toString()%>";        
    }catch(e) {   
      getTopWindow().refreshTablePage(); 
 
    }
</script>




