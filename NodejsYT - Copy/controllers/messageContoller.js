const router = require('express').Router();

const messageService = require('../services/messageService.js');

// GET listing of all messages 
router.get('/', async (req, res) => {

try {

    const result = await messageService.getMessages();

    res.json(result);

    } catch (err) {

    res.status(500);

    res.send(err.message);

    }

});

// GET a single message by id

router.get('/:id', async (req, res) => {

    const messageId = req.params.id;

    try {

        let result = await messageService.getMessageById(messageId);

        res.json(result);

        } catch (err) {

        res.status(500);

        res.send(err.message);

        }

});

router.post('/', async (req, res) => { 

    const newMessage = req.body;    

    console.log("messageController: ", newMessage);        
    
    try {    
    result = await messageService.createMessage(newMessage);   
    res.json(result);   
    } catch (err) {    
    res.status(500)    
    res.send(err.message)    
    }   
    });


router.put('/', async (req,res) => {

    const message = req.body;

    console.log("messageController update: " ,message);
    
    try {
        result = await messageService.updateMessage(message);
        res.json(result);
    } catch(err) {
        res.status(500)
        res.send(err.message)
    }
});

router.delete('/:id', async (req, res) => {

    // read value of id parameter from the request url
    const messageId = req.params.id;
    // If validation passed execute query and return results
    // returns a single product with matching id
    try {
        // Send response with JSON result    
        result = await messageService.deleteMessage(messageId);
        res.json(result);

        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
});


module.exports = 
    router
    