sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
     "sap/ui/model/json/JSONModel",
     "com/tolaram/project1/formatter/formatter"
], (Controller, MessageToast, JSONModel, formatter) => {
    "use strict";

    return Controller.extend("com.tolaram.project1.controller.View1", {

        formatter: formatter,

        // onAfterRendering: function () {
        //     this._applyAgeColor(); // Apply color when the view is rendered
        // },
        
        onDateChange: function () {
            this._applyAgeColor(); // Re-apply color when DOB changes
        },
        
        _applyAgeColor: function () {
            var oText = this.byId("ageText");
            if (!oText) return;
        
            var dob = this.getView().getModel("model").getProperty("/formdata/dob");
            var sClass = this.formatter.getAgeClass(dob);
        
            // // Remove existing classes
            // oText.removeStyleClass("above25");
            // oText.removeStyleClass("below25");
        
            // Add the correct class
            if (sClass) {
                oText.addStyleClass(sClass);
            }
        },
        
        

        onInit() {
            var modell = {    //creating a data object
                formdata : {
                    name : "",
                    email : "",
                    phone : "",
                    country : "", 
                    dob : ""
                },
                tabledata : []
            }
            var oinput = new JSONModel(modell);   //wrap in json model and 
            this.getView().setModel(oinput,"model"); //assign it to view with name "model"
        },

        onPressSubmit: function(){
            var empname = this.getView().byId("twoo").getValue();
            var empnumber = this.getView().byId("onee").getValue();
            var empmail = this.getView().byId("threee").getValue();
            var iflag = true;
            this.getView().byId("twoo").setValueState("None");  //clear any error or warning and set the state of inputs to normal
            this.getView().byId("onee").setValueState("None");
            this.getView().byId("threee").setValueState("None");
            if(empname===''){
                this.getView().byId("twoo").setValueState("Error");
                iflag = false;
            }
            if(empmail===''){
                this.getView().byId("threee").setValueState("Error");
                iflag = false;
            }
            if(empnumber===''){
                this.getView().byId("onee").setValueState("Error");
                iflag = false;
            }
            if(!iflag){
                MessageToast.show("Please fill the mandatory details");
                return;
            }
            var oModel = this.getView().getModel("model"); //used to get the model we created in onInit() method
            var oData = oModel.getData();
        
            var newEntry = Object.assign({}, oData.formdata); //creating copy so that original data is not touched
            // if (this._isEdit) {
            //     // Update existing row
            //     var iIndex = parseInt(this._editPath.split("/")[2]); // Get row index from path
            //     oData.tabledata[iIndex] = newEntry;
        
            //     MessageToast.show("Updated Successfully");
        
            //     this._isEdit = false;
            //     this._editPath = null;
            //     // this.getView().byId("_IDGenButton").setText("Submit");
            // } else {
                // Add new row
                oData.tabledata.push(newEntry);
                MessageToast.show("Submitted Successfully");
            // }
        
            // Clear form
            oData.formdata = {
                name: "",
                email: "",
                phone: "",
                country: "",
                dob: ""
            };
             
            this.getView().byId("ageText").removeStyleClass("above25");
            this.getView().byId("ageText").removeStyleClass("below25");
        
            oModel.setData(oData);
        },

        Onsubmit : function(){
            var validate = this.getView().byId("onee").getValue();
            var regs = /^[0-9]+$/;
            if(!regs.test(validate)){
                this.getView().byId("onee").setValueState("Error");

            } 
            else{
                this.getView().byId("onee").setValueState("None");
            }
        },

        async onEditButton(oEvent){
            if(!this.pDialog){   //to check if dialog is already loaded
                this.pDialog = await this.loadFragment({   //to load the fragment and save it in "this.pdialog"
                    name: "com.tolaram.project1.view.Fragments.dialogs"
                });
            }
            this.pDialog.open();
            var oModel = this.getView().getModel("model");
            console.log(oModel);
            var oItem = oEvent.getSource();//got the parent
            var spath = oItem.getBindingContext("model").getPath();
    
            var selectedRow = oModel.getProperty(spath);
    
            oModel.setProperty("/formdata", Object.assign({},selectedRow));
    
            this._isEdit = true;
            this._editPath = spath;
            
        },

        onsave : function(){

            var oModel = this.getView().getModel("model");
            var oData = oModel.getData();
            console.log(oData);
            var newdata = Object.assign({},oData.formdata);
            console.log(newdata);
            var index2 = parseInt(this._editPath.split("/")[2]);
            oData.tabledata[index2] = newdata;
            oModel.setData(oData);
    
            this.getView().byId("tab").getBinding("items").refresh();
    
            this._editPath = null;
            this._isEdit = false;
    
            this.pDialog.close();
            MessageToast.show("Updated successfully");

            oData.formdata = {
                name: "",
                email: "",
                phone: "",
                country: "",
                dob: ""
            };

            oModel.setData(oData);
    
      
        },
    
        //  onEditButton1 : function(oEvent){
        // // var oModel = this.getView().getModel("model");
        // // var oItem = oEvent.getSource().getParent(); // Get the row
        // // var sPath = oItem.getBindingContext("model").getPath(); // Get the path to the row
    
        // // var selectedRow = oModel.getProperty(sPath); // Get row data
        // // oModel.setProperty("/formdata", Object.assign({}, selectedRow)); // Copy row to form
    
        // // // Save edit mode info
        // // this._editPath = sPath;
        // // this._isEdit = true;
    
        // // // Optional: Change button text
        // // this.getView().byId("_IDGenButton").setText("Update");
        //     // if(!this.pDialog){   //to check if dialog is already loaded
        //     //     this.pDialog = this.loadFragment({   //to load the fragment and save it in "this.pdialog"
        //     //         name: "com.tolaram.project1.view.Fragments.dialogs"
        //     //     });
        //         this.pDialog.then(function(oDialog){  //promise chain, tells after things to be performed
        //             this.getView().addDependent(oDialog); // ODialog is the event/dialog object
        //             oDialog.open();
        //             return oDialog;  
        //         }).bind(this);
            
        //     var oModel = this.getView().getModel("model");
        //     var oItem = oEvent.getSource().getParent();//to get the parent block
        //     var spath = oItem.getBindingContext("model").getPath();//path
        //     var selectedRow = oModel.getProperty(spath);//get the data
    
        //     oModel.setProperty("/formdata",Object.assign({},selectedRow));//copy it ot formdata model
        //     },
    
            oncancel : function () {
                this.getView().byId("dig").close();
            },

            onitempress : function(oevent) {
                var onew = this.getView().getModel("model");
                var p1 = oevent.getSource();
                var p2 = p1.getBindingContext("model").getPath();
                var data = onew.getProperty(p2);
                this.getOwnerComponent().getRouter().navTo("RouteView2",{
                    name    : encodeURIComponent(data.name),
                    email   : encodeURIComponent(data.email),
                    phone   : encodeURIComponent(data.phone),
                    country : encodeURIComponent(data.country)
                });
            }
    });
});