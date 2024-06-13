include("scripts/EAction.js");

function LineDivider(guiAction) {
    EAction.call(this, guiAction);
}

LineDivider.prototype = new EAction();
LineDivider.includeBasePath = includeBasePath;

LineDivider.prototype.beginEvent = function() {
    EAction.prototype.beginEvent.call(this);
    
    var dialog = WidgetFactory.createDialog(LineDivider.includeBasePath, "LineDivider.ui");
    
    if (!dialog.exec()) {
        destr(dialog);
        EAction.activateMainWindow();
        this.terminate();
        return;
    }
    
    
    var segments = dialog.findChild("segment");
    

    var di = this.getDocumentInterface();
    var document = this.getDocument();
    var op = new RAddObjectsOperation();
    var _tempentity,_tempx,_tempy;
    var div=segments.text;
    var ids = document.querySelectedEntities();
    
    
    for (var i=0; i<ids.length; i++) {
        var id = ids[i];
        var entity = document.queryEntity(id);
        if (isLineEntity(entity)) {
           EAction.handleUserMessage(qsTr("Line!!"));

            //var n = entity.getEndPoints();
            //for (var k=0; k<n; k++) {
                var s = entity.getStartPoint();
                EAction.handleUserMessage("%1,%2".arg(s.x).arg(s.y));
                var e = entity.getEndPoint();
                EAction.handleUserMessage("%1,%2".arg(e.x).arg(e.y));
                
                for (var i=1;i<div;i++) {
                _tempx=(-s.x+e.x)/div*i+s.x;
                _tempy=(-s.y+e.y)/div*i+s.y;
                EAction.handleUserMessage("%1,%2".arg(_tempx).arg(_tempy));	
                _tempentity = new RPointEntity(document, new RPointData(new RVector(_tempx,_tempy)));
                op.addObject(_tempentity);
                }
              
            //}
        }
        
    }
    
    di.applyOperation(op);

    this.terminate();
};

LineDivider.init = function(basePath) {
    var action = new RGuiAction(qsTr("&Huy Invention Line Divider"), RMainWindowQt.getMainWindow());
    action.setRequiresDocument(true);
    action.setScriptFile(basePath + "/LineDivider.js");
    action.setDefaultShortcut(new QKeySequence("d,s"));
    action.setGroupSortOrder(100000);
    action.setSortOrder(0);
    action.setWidgetNames(["ExamplesMenu"]);
};


