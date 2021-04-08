
const router = require('express').Router();

router.get('/', (req, res) => {

res.setHeader('Content-Type', 'application/json');

res.json({content: 'This is the default route.'});
});


module.exports = router;