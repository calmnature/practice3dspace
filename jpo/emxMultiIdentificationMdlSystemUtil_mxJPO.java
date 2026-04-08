import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.matrixone.apps.domain.DomainObject;
import com.matrixone.apps.domain.DomainRelationship;
import com.matrixone.apps.domain.util.FrameworkException;
import com.matrixone.apps.domain.util.MapList;
import com.matrixone.apps.domain.util.MqlUtil;

import matrix.db.Context;
import matrix.util.StringList;

public class emxMultiIdentificationMdlSystemUtil_mxJPO extends emxDomainObject_mxJPO {
    
    /**
     * 
     */
    private static final long serialVersionUID = 1L;
    
    public emxMultiIdentificationMdlSystemUtil_mxJPO(Context context, String[] args) throws Exception {
        super(context, args);
    }
    
    /**
     * Fix replicated rel when owning object is revised or cloned.
	 * Relationship External Identifier has from revise replicate and from clone replicate, so rel is only replicated on the from side
	 * This method needs to modify the TO side of the replicated rel to point to the new revision/clone
     * 
     * @param context the eMatrix Context object
     * @param args String [] of trigger input args.
     * @exception Exception if operation fails.
     */
    public void FixReplicatedRel(Context context, String[] args) throws Exception {
        String origRelId = args[0];
        String fromObjectId = args[1];
        String toObjectId = args[2];
		String newRelId = args[3];

		if (newRelId != null) {
			//get the from and to object ids of the new (replicated) rel and set TO same as FROM
			MapList relMap = DomainRelationship.getInfo(context, new String[]{newRelId}, StringList.asList("from.id","to.id"));
			// new rel is only replicated on the FROM side, need to fix the TO side to point to new revision/clone object, same as fromObject
			// need to turn history off as the modify connection causes a connect/disconnect record on the content object
			String sCommandStatement = "modify connection $1 to $2";
			MqlUtil.mqlCommand(context, true, sCommandStatement, true, newRelId, (String)((Map)relMap.get(0)).get("from.id")); 
		}
	}
    
}
