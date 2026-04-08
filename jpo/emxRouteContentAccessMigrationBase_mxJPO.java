
import java.util.Iterator;
import java.util.Map;
import matrix.db.Context;
import matrix.util.StringList;

import com.dassault_systemes.enovia.route.modeler.RouteModeler;
import com.matrixone.apps.common.Route;
import com.matrixone.apps.domain.DomainAccess;
import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.util.ContextUtil;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.PropertyUtil;
import com.matrixone.apps.framework.ui.UIUtil;

public class emxRouteContentAccessMigrationBase_mxJPO extends emxCommonMigration_mxJPO
{

    
	private static final long serialVersionUID = -5029177381386073045L;    
    public static String relationship_ObjectRoute = "";     
    public static String relationship_ObjectRoute_id = "";       

    public emxRouteContentAccessMigrationBase_mxJPO(Context context, String[] args) throws Exception {
      super(context, args);
    }

    public static void init(Context context) throws FrameworkException
    {
         relationship_ObjectRoute = PropertyUtil.getSchemaProperty(context, "relationship_ObjectRoute");         
         relationship_ObjectRoute_id = "to["+ relationship_ObjectRoute +"].from.id";
    }

    public void migrateObjects(Context context, StringList objectList) throws Exception
    {     
        init(context);
        StringList objectSelects = new StringList(15);
        objectSelects.addElement("id");
        objectSelects.addElement("name");
        objectSelects.addElement("type");
        objectSelects.addElement("revision");// check for latest revision
        objectSelects.addElement("current");
        
        objectSelects.addElement(relationship_ObjectRoute_id);
          
     
        String[] oidsArray = new String[objectList.size()];
        oidsArray = (String[])objectList.toArray(oidsArray);
        
        StringList mulValSelects= new StringList();
        mulValSelects.add(relationship_ObjectRoute_id);
       

        try{
	        	ContextUtil.pushContext(context);		
	        	MapList mapList = DomainObject.getInfo(context, oidsArray, objectSelects, mulValSelects);
	        	
	        	MapList memberList ;
	        	String strObjId, strType, strName = "", strRevision, strCurrent;
	        	StringList strObjectRouteIdsList;    
	        	Map valueMap;
	        	
	        	Iterator itr = mapList.iterator();
	        	while( itr.hasNext())
	        	{
	        		try{
	        			valueMap = (Map) itr.next();
	                
	        			strObjId = (String)valueMap.get("id");	                
	        			strType = (String)valueMap.get("type");
	        			strName = (String)valueMap.get("name");
	        			strRevision = (String)valueMap.get("revision");
	        			strCurrent = (String)valueMap.get("current");        			
	        			
	        				        			
	        			strObjectRouteIdsList = (StringList)valueMap.get(relationship_ObjectRoute_id);	        			
	        			memberList = Route.getOwnershipAccessOnRoute(context, strObjId);	        			
	        			
	        			
	        			if("Route".equals(strType) && !("Complete".equalsIgnoreCase(strCurrent) || "Archive".equalsIgnoreCase(strCurrent))) {  				
	        				
	        				mqlLogRequiredInformationWriter("Updating SOV of Content that is connected to : " + strName);    				
	        				if(strObjectRouteIdsList != null && strObjectRouteIdsList.size() > 0){
	        					Iterator routeMemberListItr = memberList.iterator();
	        					while(routeMemberListItr.hasNext()){
	        						Map routeMemberMap = (Map)routeMemberListItr.next();
	        						String name    = (String)routeMemberMap.get("name");
	        						String project    = (String)routeMemberMap.get("project");
	        						String projectAccess    = (String)routeMemberMap.get("accessMask");
	        						mqlLogRequiredInformationWriter(" routeMemberMap : " + routeMemberMap);
	        						mqlLogRequiredInformationWriter(" project : " + project);
	        						mqlLogRequiredInformationWriter(" projectAccess : " + projectAccess);
	        						//String mappedAccess = RouteModeler.getContentAccess(context, projectAccess);
	        						String mappedAccess = getContentAccess(context, projectAccess);
	        						mqlLogRequiredInformationWriter(" mappedAccess : " + mappedAccess);
	        						String defaultRouteAccessMasks = DomainAccess.getPhysicalAccessMasks(context, strObjId, mappedAccess);
	        						String readAccessBits = DomainAccess.getPhysicalAccessMasks(context,
	        								strObjId, "Read");
	        						for (int i = 0; i < strObjectRouteIdsList.size(); i++) {
	        							mqlLogRequiredInformationWriter(" defaultRouteAccessMasks : " + defaultRouteAccessMasks);
	        							if(UIUtil.isNotNullAndNotEmpty(name) &&  name.equalsIgnoreCase(project)){
	        								DomainAccess.createObjectOwnership(context, (String) strObjectRouteIdsList.get(i), null, name, readAccessBits, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED +" " +strName, true);
	        							}else {
	        								DomainAccess.createObjectOwnership(context, (String) strObjectRouteIdsList.get(i), null, name, defaultRouteAccessMasks, DomainAccess.COMMENT_MULTIPLE_OWNERSHIP_GRANTED +" " +strName, true);	        								
	        							}
	        						}
	        						checkAndloadMigratedOids(strObjId);     
	        					}
	        				} else {
	        					checkAndWriteUnconvertedOID( strType+","+strName+","+strRevision+", Content SOV update is not required \n" , strObjId);  
	        				}
	        			}			       			
	                 
	        			//Updating non migratedId's information
	        			                          
	                
	        		} catch (Exception ex) {
	        			mqlLogRequiredInformationWriter("Failed to upgrade ownership on " + strName);
	        		}
	        	}
	        
        } catch(Exception ex){        
        }finally{
        		ContextUtil.popContext(context);
        }     
    }
    
    
    public void mqlLogRequiredInformationWriter(String command) throws Exception
    {
        super.mqlLogRequiredInformationWriter(command +"\n");
    }
    
    
    public void checkAndloadMigratedOids(String command) throws Exception
    {
     if(migratedOids.indexOf(command)<= -1){
        super.loadMigratedOids(command +"\n");
     }
        
    }
    public void checkAndWriteUnconvertedOID(String command, String ObjectId) throws Exception
    {
     if(migratedOids.indexOf(ObjectId)<= -1){
        super.writeUnconvertedOID(command, ObjectId);
     }
        
    }
    
    public static String getContentAccess(Context context, String routeAccess) {
		try {
			if (UIUtil.isNotNullAndNotEmpty(routeAccess)
					&& ("Read".equalsIgnoreCase(routeAccess) || "Read Write".equalsIgnoreCase(routeAccess))) {
				return routeAccess;
			}else {
				return "Read Write";
			}
		} catch (Exception e) {
			System.out.println("Error in getContentAcess in RoutModeler"+e.getMessage());
			return "Read";
		}
	}
    
}
