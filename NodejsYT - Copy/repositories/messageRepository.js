const { sql, dbConnPoolPromise } = require('../database/db.js');


const Message = require('../models/message.js');

// Get all messages
const SQL_SELECT_ALL = 'SELECT * FROM dbo.contact ORDER BY firstName ASC for json path;';
// Get id specific messages
const SQL_SELECT_BY_ID = 'SELECT * FROM dbo.contact WHERE _id = @id for json path, without_array_wrapper;';

const SQL_INSERT = 'INSERT INTO dbo.contact (firstName, lastName, email, message_text) VALUES (@firstName, @lastName, @email, @messagetext); SELECT * from dbo.Contact WHERE _id = SCOPE_IDENTITY();';

const SQL_DELETE = 'DELETE FROM dbo.contact WHERE _id = @id;';

// const SQL_UPDATE = 'UPDATE dbo.contact SET firstName = @firstName, lastName = @lastName, email = @email, message_text = @messageText WHERE _id = @id; SELECT * FROM dbo.contact WHERE _id = @id;';


let getMessages = async () => {
    
    let messages;   
  
    try {
    
    const pool = await dbConnPoolPromise    
    const result = await pool.request()    
     
    .query(SQL_SELECT_ALL);   
     
    messages = result.recordset[0];    

    } catch (err) {    
    console.log('DB Error - get all messages: ', err.message);    
    }    
  
    return messages;    
    };
    
    
let getMessageById = async (messageId) => {
    
    let message;   
  
    try {    
 
    const pool = await dbConnPoolPromise    
    const result = await pool.request()
    

    .input('id', sql.Int, messageId)    

    .query(SQL_SELECT_BY_ID);   
 
    
    message = result.recordset[0];
    
    } catch (err) {
    
    console.log('DB Error - get message by id: ', err.message);
    
    }   
    
    return message;
};



let createMessage = async (contact) => {
    
    let insertedMessage;   
      
    try {    
       
    const pool = await dbConnPoolPromise    
    const result = await pool.request()   
   
      
    .input('firstName', sql.VarChar, contact.firstName)   
    .input('lastName', sql.VarChar, contact.lastName)    
    .input('email', sql.VarChar, contact.email)    
    .input('messagetext', sql.VarChar, contact.message_text)    
      
    .query(SQL_INSERT);    
    
    insertedMessage = result.recordset[0];    
    } catch (err) {    
    console.log('DB Error - error inserting a new message: ', err.message);   
    }
    
    
    return insertedMessage;
    
    };

let deleteMessage = async (messageId) => {

        let rowsAffected = 0;

        try {

            const pool = await dbConnPoolPromise    
            const result = await pool.request()
            
                .input('id', sql.Int, messageId)

                .query(SQL_DELETE);

        rowsAffected = Number(result.rowsAffected);

        } catch(err) {
            console.log('DB Error - get message by id: ', err.message);
        }

        if (rowsAffected === 0) 
            return false;

        return true;
           
    };

    // let updateMessage = async (contact) => {
    
    //     let updatedMessage;   
          
    //     try {    
           
    //     const pool = await dbConnPoolPromise    
    //     const result = await pool.request()   
       
    //     .input('id', sql.Int,contact._id)  
    //     .input('firstName', sql.VarChar, contact.firstName)   
    //     .input('lastName', sql.VarChar, contact.lastName)    
    //     .input('email', sql.VarChar, contact.email)    
    //     .input('messagetext', sql.VarChar, contact.message_text)    
          
    //     .query(SQL_UPDATE);    
        
    //     insertedMessage = result.recordset[0];    
    //     } catch (err) {    
    //     console.log('DB Error - error updating the message: ', err.message);   
    //     }
        
        
    //     return updatedMessage;
        
    //     };


module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
};

