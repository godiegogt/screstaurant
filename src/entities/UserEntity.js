class UserEntity {
    constructor(){
        this.suscriber = null;
        this.confirmationId = "";
        this.lastuserid="";
        this.jSigned = false;
    }


    validateEmail(){
        let validate=false;
        let userData = auth().currentUser;
     
      
        if(userData!=null && userData.email!="" && userData.email!=null){
            if(!userData.emailVerified) validate=true;
        }
        return validate;
    }

}

const userSingleton = new UserEntity();
export default userSingleton;