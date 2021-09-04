const monitor = require('./crawler/crawler');
const User = require('./models/User');
require('dotenv').config();
const mongoose = require('mongoose');
const { find } = require('./models/User');
mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_USER_NAME}:${process.env.MONGOOSE_USER_PASSWORD}@${process.env.MONGOOSE_CLUSTER}`)


let query = User.find({id : 12});
query.select('url')
query.limit(1)
query.exec(function(err,user){
    if (err) return handleError(err);
    user.forEach(element => {
        monitor(element.url,process.env.DEBUG);
    });
})

