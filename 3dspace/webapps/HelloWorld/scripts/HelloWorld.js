define('DS/HelloWorld/scripts/HelloWorld',
["DS/WAFData/WAFData", "DS/i3DXCompassServices/i3DXCompassServices"],
function(WAFData, i3DXCompassServices ){
    var myWidget = {
        _3dspaceURL: "",
        dataFull: [],
        displayData: function(arrData, iTmp){
            var tableHTML, oTMP, classRow;
            var iPS=0, iS=0, iPST=0, iST=0;
            
            tableHTML="<div class='no-native-scrollbars  uwa-themed-scroller-content' style='right: -17px; bottom: 0px;'>";            
            tableHTML=tableHTML+"<table><thead><tr><th>Name</th><th>Type</th></tr></thead><tbody>";
            
            for(var i=0; i<arrData.length; i++){
                classRow=(i%2===0?"roweven":"rowodd");
                tableHTML=tableHTML+"<tr class='"+classRow+"'>";
                tableHTML=tableHTML+"<td>";
                tableHTML=tableHTML+arrData[i].Name+"</td>";
                tableHTML=tableHTML+"<td>";
                tableHTML=tableHTML+arrData[i].Type+"</td>";
                tableHTML=tableHTML+"</tr>";
            }
            tableHTML=tableHTML+"</tbody></table></div>";
            
            widget.body.innerHTML=tableHTML;
        },
        callData: function(){
            var methodWAF="GET";
            var urlWAF="";
            urlWAF=myWidget._3dspaceURL+"/resources/HelloWorldBase/ProjectSpace";
            WAFData.authenticatedRequest(urlWAF, {
                method: methodWAF, 
                //proxy:'passport',
                //data: dataWAF,
                type: 'json',
                onComplete: function (dataResp) {
                    if(dataResp.msg==="OK"){
                        myWidget.dataFull=dataResp.data;
                        myWidget.displayData(myWidget.dataFull);
                        //console.log(myWidget.dataFull);
                    }else{
                        widget.body.innerHTML += "<p>Error in WebService Response</p>";
                        widget.body.innerHTML += "<p>"+JSON.stringify(dataResp)+"</p>";
                    }
                },
                onFailure: function(error){
                    widget.body.innerHTML += "<p>Call Faillure</p>";
                    widget.body.innerHTML += "<p>"+JSON.stringify(error)+"</p>";
                }
            });
        },
        get3DSpaceURL: function(callback){
            i3DXCompassServices.getServiceUrl({
                serviceName: '3DSpace', 
                platformId:  widget.getValue('x3dPlatformId'),
                onComplete : function(datafromCompass){
                    if (typeof datafromCompass === "string"){
                        myWidget._3dspaceURL=datafromCompass;
                        callback();
                    }
                },
                onFailure: function(){
                    alert("Impossible to retrieve 3DSpace Service URL");
                }
            });
        },
        onLoadWidget: function(){
            myWidget.get3DSpaceURL(myWidget.callData);
        }
    };
    
    return myWidget;
    
});
