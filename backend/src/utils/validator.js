const validator =require("validator");

//Validation should happen at the beginning of the controller, before any business logic or database operations.

const validate = (data)=>{
   
    const mandatoryField = ['firstName',"emailId",'password'];

    const IsAllowed = mandatoryField.every((k)=> Object.keys(data).includes(k));

    // Check if required fields are not empty
    if (!data.firstName || !data.emailId || !data.password)
        throw new Error("Required fields cannot be empty");

    if(!IsAllowed)
        throw new Error("Some Field Missing");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");

    //validator for pw 
    //At least 8 characters
    // At least 1 uppercase letter
    // At least 1 lowercase letter
    // At least 1 number
    // At least 1 special character
    if(!validator.isStrongPassword(data.password))
        throw new Error("Weak Password");
}

module.exports = validate;