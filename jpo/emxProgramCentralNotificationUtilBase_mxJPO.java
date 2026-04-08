/*
 * Copyright (c) 1992-2020 Dassault Systemes.
 * All Rights Reserved.
 * This program contains proprietary and trade secret information of MatrixOne,
 * Inc.  Copyright notice is precautionary only
 * and does not evidence any actual or intended publication of such program
 */
import java.io.BufferedWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import matrix.db.Context;
import matrix.db.MatrixWriter;
import matrix.util.StringList;

import com.dassault_systemes.enovia.dpm.notification.NotificationBase;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.CacheUtil;
import com.matrixone.apps.domain.util.DebugUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.FrameworkUtil;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;
import com.matrixone.apps.program.NotificationUtil;
import com.matrixone.apps.program.ProgramCentralConstants;
import com.matrixone.apps.program.ProjectSpace;
import java.util.HashMap;


/**
 *  emxProgramCentralNotificationUtilBase
 *  Copyright (c) 1992-2020 Dassault Systemes.
 *  All Rights Reserved.
 **/

public class emxProgramCentralNotificationUtilBase_mxJPO extends emxDomainObject_mxJPO
{
    /**
	 * Constructs a new emxProgramCentralNotificationUtil JPO object
	 * 
	 * @param context the eMatrix <code>Context</code> object
	 * @param args an array of String arguments for this method
	 * @throws Exception 
	 * @throws Exception if the operation fails
	 */
	public emxProgramCentralNotificationUtilBase_mxJPO (Context context, String[] args) throws Exception 
	{
		super(context, args);
	}
	
    public int processNotification(Context context, String[] args) throws Exception 
    {  
    	try {
		        
//	        if (args != null && args.length >0)  {
//	        	for (String arg : args) {
//	        		System.out.println("JPO Input Arg: " + arg);
//	        	}
//	        }

            String taskId = args[6];
            
            
    		String invokeFromODTFile = (String) CacheUtil.getCacheObject(context, "invokeFrom");
	       	String ODT_TEST_CASE = "TestCase";
	       	
	        BufferedWriter writer = new BufferedWriter(new MatrixWriter(context));
	    	writer.write("\nExecuting DPM Gen2 Notification\n\n");
	    	writer.write("   Starting Proces\n");
	       	writer.flush();
	       	
	       	//Notification not required when invoke from ODT
	        if(!ODT_TEST_CASE.equalsIgnoreCase(invokeFromODTFile)) {
	        	
	        	NotificationBase.processNotification(context, args);
	        }
            
            boolean promoteTaskCheck = com.dassault_systemes.enovia.dpm.ProjectSpace.getExpressionValue(context, "DPM_PromoteAssignedTasksToAssignState", false);
            

            if (promoteTaskCheck && FrameworkUtil.isObjectId(context, taskId)) {
        		

                StringList objectSelects = new StringList();
                objectSelects.add(SELECT_CURRENT);
                objectSelects.add(SELECT_POLICY);
        		
                           
            	DomainObject task = DomainObject.newInstance(context, taskId);
            	Map map = task.getInfo(context, objectSelects);
            	String taskState = (String) map.get(SELECT_CURRENT);
            	String taskPolicy = (String) map.get(SELECT_POLICY);

                
            	if (ProgramCentralConstants.STATE_PROJECT_TASK_CREATE.equalsIgnoreCase(taskState) && ProgramCentralConstants.POLICY_PROJECT_TASK.equalsIgnoreCase(taskPolicy)) {
                    DebugUtil.debug("Promoting task to To Do as Promote assigned tasks to To Do state (DPM_PromoteAssignedTasksToAssignState) setting is on and Task is in Draft state ");
            		task.promote(context);
            	}
            }
	     	

    	} catch (Exception ex) {
    		//System.out.println(ex.getLocalizedMessage());
    		ex.printStackTrace();
     	}
	    	return 0;
    }

    public int processNotificationTransaction(Context context, String[] args) throws Exception 
    {  
        try {
                
//          if (args != null && args.length >0)  {
//              for (String arg : args) {
//                  System.out.println("JPO Input Arg: " + arg);
//              }
//          }

            BufferedWriter writer = new BufferedWriter(new MatrixWriter(context));
            writer.write("\nExecuting DPM Gen2 Notification From Transaction\n\n");
            writer.write("   Starting Proces\n");
            writer.flush();
            NotificationBase.processNotificationTransaction(context, args);

        } catch (Exception ex) {
            //System.out.println(ex.getLocalizedMessage());
            ex.printStackTrace();
        }
            return 0;
    }

	
    /**
     * This function notifies the task assignees
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        0 - String containing the object id
     *        1 - String containing sideDoorFeature. True if URL needs to sent in notification
     * @throws Exception if operation fails
     * @since R210
     */
    public MapList notifyTaskAssignees(Context context, String[] args) throws Exception
    {
        try
        {
        	String strNotificationType = args[0];
        	NotificationUtil notificationUtil = new NotificationUtil();
        	return notificationUtil.notifyTaskAssignees(context, false, strNotificationType);
        }
        catch (Exception e)
        {
            throw new FrameworkException(e);
        }
    }
    
    /** This method creates a mail notification based on an object id.
     * Only use this method if calling from triggers or tcl.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        objectId - a String holding the id of an object to be used for
     *          evaluating selects embedded in the subject and message strings
     *        notificationName - a String holding the name of the Notification object
     * @return an int 0 status code
     * @throws Exception if the operation fails
     * @since AEF 11.0.0.0
     */

    public static int objectNotification(Context context, String[] args)
            throws Exception {
        if (args == null || args.length < 2) {
            throw (new IllegalArgumentException());
        }
        int index = 0;
        String objectId = args[index++];
        String notificationName = args[index++];
        if(notificationName.equalsIgnoreCase("PMCWorkspaceVaultContentAddedEvent"))
        {
     	  
        	MqlUtil.mqlCommand(context, "set env CONTENT_ADDED_TRIGGER TRUE");
        }
        try
        {
        emxNotificationUtil_mxJPO notify = new  emxNotificationUtil_mxJPO(context, args);	
        notify.objectNotification(context, objectId, notificationName, null);
        }
        catch(Exception e)
        {
       	 e.printStackTrace();
        }
        return 0;
    }
    /**
     * This method creates one or more mail notification based on an object id.
     * The object id passed in will be expanded to get parent id's.
     * The parent ids will be used to create mail notifications.
     * Only use this method if calling from triggers or tcl.
     *
     * @param context the eMatrix <code>Context</code> object
     * @param args holds the following input arguments:
     *        objectId - id of an object that we want to expand.  From this we will
     *          check the ids from the expand to be used for
     *          evaluating selects embedded in the subject and message strings
     *        notificationName - a String holding the name of the Notification object
     *        relationshipPattern - relationship to expand on
     *        typePattern - type to expand to
     *        toDirection - expand to direction
     *        fromDirection - expand from direction
     * @return an int 0 status code
     * @throws Exception if the operation fails
     * @since AEF R211
     */

    public static int objectParentsNotification(Context context, String[] args)
            throws Exception {
		String strDisableTrigger = context.getCustomData("disableTriggerForDocumentImportOrCreateScenario");
		if(UIUtil.isNotNullAndNotEmpty(strDisableTrigger)){
			return 0;
		}
        if (args == null || args.length < 2) {
            throw (new IllegalArgumentException());
        }
        int index = 0;
        String objectId = args[index++];
        String notificationName = args[index++];
        String relationshipPattern = PropertyUtil.getSchemaProperty(context, args[index++]);
        String typePattern = PropertyUtil.getSchemaProperty(context, args[index++]);
        boolean toDirection = "true".equals((String)args[index++])? true:false;
        boolean fromDirection = "true".equals((String)args[index++])? true:false;
        short level = 1;
      
        StringList objectSelects = new StringList(1);
        objectSelects.add("id");

        DomainObject domainObject = DomainObject.newInstance(context, objectId);
       
        // expand from parent
        MapList mapList = domainObject.getRelatedObjects(
                context,             // context.
                relationshipPattern, // relationship pattern.
                typePattern,         // type pattern.
                objectSelects,       // business object selectables.
                null,                // relationship selectables.
                toDirection,         // expand to direction.
                fromDirection,       // expand from direction.
                level,               // level
                null,                // object where clause
                null,
                0,
                null,
                null,
                null);

        Iterator itr = mapList.iterator();
        if(notificationName.equalsIgnoreCase("PMCWorkspaceVaultContentModifiedEvent"))
        {
     	 
        	String result = (String)MqlUtil.mqlCommand(context, "get env CONTENT_ADDED_TRIGGER");
        
        	if(result.equalsIgnoreCase("TRUE"))
        	{
        		return 0;
        	}
        }
        while (itr.hasNext())
        {
            Map map = (Map) itr.next();
            String id = (String) map.get("id");
            emxNotificationUtil_mxJPO notify = new  emxNotificationUtil_mxJPO(context, args);       
            notify.objectNotification(context, id, notificationName, null);
        }
        return 0;
    
    }

	public int riskDeletionNotifyCheck(Context context, String[] args) throws Exception {

		try {
			String riskOpportunityId = args[0];

			StringList select = new StringList();
			select.add(SELECT_TYPE);
			select.add(SELECT_NAME);
			select.add(SELECT_OWNER);
			select.add("from[Informed User].to.name");
			select.add("to[Risk].from.id");
			select.add("from[Contributes To].to.relationship[Assigned Tasks].from");
			select.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
			select.add(SELECT_POLICY);

			StringList multiValueSelectables = new StringList(6);
			multiValueSelectables.add("from[Informed User].to.name");
			multiValueSelectables.add("from[Contributes To].to.relationship[Assigned Tasks].from");

			DomainObject riskObj = new DomainObject(riskOpportunityId);
			Map riskData = riskObj.getInfo(context, select, multiValueSelectables);

			String type = (String) riskData.get(SELECT_TYPE);
			String name = (String) riskData.get(SELECT_NAME);
			String owner = (String) riskData.get(SELECT_OWNER);
			String title = (String) riskData.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
			String projectId = (String) riskData.get("to[Risk].from.id");
			String policy = (String) riskData.get(SELECT_POLICY);
			
			if("Profile Risk".equalsIgnoreCase(policy)){ //Notification not applicable on Risk Template objects IR-1494027
				Map metadataMap = new HashMap();
				CacheUtil.setCacheObject(context, "RiskOpportunityMetaData", metadataMap);
				metadataMap.put("policy", policy);
				return 0;  
			}

			StringList informedUsersList = (StringList) riskData.get("from[Informed User].to.name");
			StringList mitigationAssigneeList = (StringList) riskData
					.get("from[Contributes To].to.relationship[Assigned Tasks].from");

			StringList userGroupIdList = new StringList();

			if (informedUsersList != null) {
				for (String memberName : informedUsersList) {

					// Process ONLY users starting with auto_
					if (!memberName.startsWith("auto_")) {
						continue;
					}

					StringList roleSelectList = new StringList();
					roleSelectList.add(memberName);
					roleSelectList.add("isaprojectgroup");
					roleSelectList.add("|");

					String result = MqlUtil.mqlCommand(context, "list role $1 select $2 dump $3", true, roleSelectList);

					StringList resultList = FrameworkUtil.split(result, "|");
					String isaprojectgroup = resultList.get(0);

					if ("TRUE".equalsIgnoreCase(isaprojectgroup)) {

						StringList userGroupSelectList = new StringList();
						userGroupSelectList.add(ProgramCentralConstants.TYPE_GROUP_PROXY);
						userGroupSelectList.add(memberName);
						userGroupSelectList.add("*");
						userGroupSelectList.add("physicalid");
						userGroupSelectList.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
						userGroupSelectList.add("|");

						String mqlQuery = "temp query bus $1 $2 $3 select $4 $5 dump $6";
						String userGroupMQLResult = MqlUtil.mqlCommand(context, mqlQuery, true, userGroupSelectList);

						StringList userGroupInfoList = FrameworkUtil.split(userGroupMQLResult, "|");

						if (userGroupInfoList.size() >= 5) {
							String userGroupId = userGroupInfoList.get(3);
							userGroupIdList.add(userGroupId);
						}
					}
				}
			}

			StringList selectables = new StringList();
			selectables.add(ProgramCentralConstants.SELECT_OWNER);
			selectables.add(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
			selectables.add(SELECT_TYPE);
			selectables.add(ProgramCentralConstants.SELECT_PHYSICALID);
			selectables.add(SELECT_NAME);

			ProjectSpace project = new ProjectSpace(projectId);
			Map projectInfo = project.getInfo(context, selectables);

			String contextOwner = (String) projectInfo.get(ProgramCentralConstants.SELECT_OWNER);
			String contextTitle = (String) projectInfo.get(ProgramCentralConstants.SELECT_ATTRIBUTE_TITLE);
			String contextType = (String) projectInfo.get(SELECT_TYPE);
			String contextName = (String) projectInfo.get(SELECT_NAME);

			String contextPhysicalId = (String) projectInfo.get(ProgramCentralConstants.SELECT_PHYSICALID);

			Map metadataMap = new HashMap();
			metadataMap.put("type", type);
			metadataMap.put("name", name);
			metadataMap.put("owner", owner);
			metadataMap.put("informedUsers", informedUsersList);
			metadataMap.put("mitigationAssignees", mitigationAssigneeList);
			metadataMap.put("title", title);
			metadataMap.put("riskOpportunityId", riskOpportunityId);
			metadataMap.put("projectOwner", contextOwner);
			metadataMap.put("contextTitle", contextTitle);
			metadataMap.put("contextType", contextType);
			metadataMap.put("contextPhysicalId", contextPhysicalId);
			metadataMap.put("userGroupIdList", userGroupIdList);
			metadataMap.put("contextName", contextName);

			CacheUtil.setCacheObject(context, "RiskOpportunityMetaData", metadataMap);

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return 0;
	}

	public int notifyOnRiskDeletion(Context context, String[] args) throws Exception {

		try {

			Map<String, String> data = (Map<String, String>) CacheUtil.getCacheObject(context,
					"RiskOpportunityMetaData");

			if (data == null) {
				DebugUtil.debug("No metadata found in cache");
				return 1;
			}
			
			String policy = data.get(SELECT_POLICY);
			if("Profile Risk".equalsIgnoreCase(policy)){ //Notification not applicable on Risk Template objects IR-1494027
				CacheUtil.removeCacheObject(context, "RiskOpportunityMetaData");
				return 0;
			}

			String riskOpportunityId = data.get("riskOpportunityId");
			String type = data.get("type");
			String name = data.get("name");
			String title = data.get("title");
			String owner = data.get("owner");
			String contextTitle = data.get("contextTitle");
			String contextType = data.get("contextType");
			String contextPhysicalId = data.get("contextPhysicalId");
			String contextName = data.get("contextName");

			Object informedUsersObj = data.get("informedUsers");
			StringList informedUserList = new StringList();

			if (informedUsersObj instanceof StringList) {
				informedUserList = (StringList) informedUsersObj;
			} else if (informedUsersObj instanceof String) {
				informedUserList.add((String) informedUsersObj);
			}

			Object mitigationObj = data.get("mitigationAssignees");
			StringList mitigationAssigneeList = new StringList();

			if (mitigationObj instanceof StringList) {
				mitigationAssigneeList = (StringList) mitigationObj;
			} else if (mitigationObj instanceof String) {
				mitigationAssigneeList.add((String) mitigationObj);
			}

			Object userGroupIdList = data.get("userGroupIdList");
			StringList userGroupIdListSl = new StringList();

			if (userGroupIdList instanceof StringList) {
				userGroupIdListSl = (StringList) userGroupIdList;
			} else if (userGroupIdList instanceof String) {
				userGroupIdListSl.add((String) userGroupIdList);
			}

			String contextOwner = data.get("projectOwner");

			CacheUtil.removeCacheObject(context, "RiskOpportunityMetaData");

			com.dassault_systemes.enovia.dpm.notification.NotificationUtil.sendNotificationForRemovedRiskandOpp(context,
					contextOwner, contextTitle, contextName, contextType, contextPhysicalId, title, informedUserList,
					mitigationAssigneeList, type, userGroupIdListSl);

		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return 0;
	}	

}
