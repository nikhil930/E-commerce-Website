import bcrypt from 'bcrypt';

// hashing the password using bcrypt

export const hashPassword = (password) => {
    
    return new Promise((resolve , reject) => {
        bcrypt.genSalt(12 , (err , salt) =>{
            if(err){
                reject(err);
            }
            bcrypt.hash(password , salt , (err , hash) =>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

// comparing the hashed passsword

// password is the plain password that is enterd by user during login
// hashed is the hashed password saved in the database , we can search this by searching email id of the user in the database

export const comparePassword = (password , hashed) => {
    // 
    return bcrypt.compare(password , hashed);  // true or false
}