const validator = require('validator');

const messageRepository = require('../repositories/messageRepository.js');

const messageValidators = require('../validator/messageValidators.js');

let getMessages = async () => {
    const messages = await messageRepository.getMessages();
    return messages;
};



let getMessageById = async (messageId) => {
  
    if (!validator.isNumeric(messageId + '', { no_symbols: true, allow_negatives: false })) {
        console.log("getMessages service error: invalid id parameter");    
        return "invalid parameter";

}

const message = await messageRepository.getMessageById(messageId);
    return message;

};

let createMessage = async (message) => {

    let newlyInsertedMessage;    
       
    let validatedMessage = messageValidators.validateNewMessage(message);    
   
    if (validatedMessage != null) {    
        newlyInsertedMessage = await messageRepository.createMessage(validatedMessage);    
    } else {    
 
    newlyInsertedMessage = {"error": "invalid message"};    

    console.log("messageService.createMessage(): form data validate failed");    
    }       
    return newlyInsertedMessage;    
    };

// let updateMessage = async (message) => {

//     let updatedMessage;

//     let validatedMessage = messageValidator.validateNewMessage(message);

//     if (validatedMessage != null) {    
//         updatedMessage = await messageRepository.updateMessage(validatedMessage);    
//         } else {    
         
//         updatedMessage = {"error": "Message update failed"};    
        
//         console.log("messageService.updateMessage(): form data validate failed");    
//         }       
//         return updatedMessage;    
//         };
    
let deleteMessage = async (messageId) => {
    let deleteResult = false;

    if(!messageValidators.validateId(messageId)) {
        console.log("deleteMessages service error: invalid id parameter");
        return false;
    }

    deleteResult = await messageRepository.deleteMessage(messageId);

    return deleteResult
}


module.exports = {
    getMessages,
    getMessageById,
    createMessage,
    deleteMessage
}