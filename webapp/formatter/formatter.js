sap.ui.define([], function () {
    "use strict";
    return {    

        getAgeClass: function (dob) {
            if (!dob) {
                return ""; // No class when dob is empty
            }
        
            // Parse "dd-MM-yyyy" to a Date object
            var parts = dob.split("-");
            if (parts.length !== 3) {
                return ""; // invalid format
            }
            var birthDate = new Date(parts[2], parts[1] - 1, parts[0]); // yyyy, mm-1, dd
        
            var today = new Date();
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
        
            return age > 25 ? "above25" : "below25";
        },
        
        
        
        getAgeText: function(dob) {
            if (!dob) {
                return "";  // <-- clear text when dob is empty
            }
            var birthDate = new Date(dob);
            var ageDifMs = Date.now() - birthDate.getTime();
            var ageDate = new Date(ageDifMs); 
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
            return age > 25 ? "Above 25" : "Below 25";
        }
        
    };
});
