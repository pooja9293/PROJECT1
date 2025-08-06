sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("com.tolaram.project1.controller.View2", {
        onInit: function() {

            var model = {   
                form : {
                    name : "",
                    email : "",
                    phone : "",
                    country : "", 
                    dob : ""
                } }

            var omod = new JSONModel("model");
            this.getView().setModel(omod,"mod");

            var orouter = this.getOwnerComponent().getRouter();
            orouter.getRoute("RouteView2").attachPatternMatched(this._onObjectMatched, this);

        },

        _onObjectMatched: function(oeven){
            var args = oeven.getParameter("arguments");
            args.name    = decodeURIComponent(args.name);
            args.email   = decodeURIComponent(args.email);
            args.phone   = decodeURIComponent(args.phone);
            args.country = decodeURIComponent(args.country);

            var input = this.getView().getModel("mod");
            input.setProperty("/form", args);
        },

        handlenavigation: function() {
            window.history.go(-1); 
        }
    });
});
