
const validator = require('validator');
const Message = require('../models/message.js');


let validateNewMessage = (formMessage) => {
    
    let validatedMessage;

    // let _id = 0;

if (formMessage === null) {
console.log("validateNewMessage(): Parameter is null");
}

// if (formMessage.hasOwnProperty('_id')) {
//     _id = formMessage._id
// }

if (

// validator.isNumeric(_id + ' ', { no_symbols: true, allow_negatives: false })&&
!validator.isEmpty(formMessage.firstName) &&
!validator.isEmpty(formMessage.lastName) &&
!validator.isEmpty(formMessage.email) &&
!validator.isEmpty(formMessage.message_text))

{


validatedMessage = new Message(
    null,

    formMessage.firstName,

    validator.escape(formMessage.lastName),

    formMessage.email,

    formMessage.message_text

)

} else {
console.log("validateNewMessage(): Validation failed");
}
return validatedMessage;

}

let validateId = (messageId) => {

    if (validator.isNumeric(messageId + ' ', { no_symbols: true, allow_negatives: false})) {
        return true;
    }
    else {
        console.log("Message validator: invalid id paramarter");

    }
    return false
}

module.exports = {
validateNewMessage,
validateId
}
