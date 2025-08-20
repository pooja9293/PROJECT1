sap.ui.define([
   "sap/ui/core/mvc/Controller"
//    "sap/ui/model/json/JSONModel"
], function(Controller) {
   "use strict";
    return Controller.extend("com.tolaram.project1.controller.View3", {
       onInit: function () {
    var oImg = this.byId("imgg");
    oImg.addEventDelegate({
        onmouseover: function () {
            sap.m.MessageToast.show("Therapy");
        },
        onmouseout: function () {
            sap.m.MessageToast.show("Hell");
        }
    });
},

onbackpress: function() {
    window.history.go(-1);
}
    });
});
