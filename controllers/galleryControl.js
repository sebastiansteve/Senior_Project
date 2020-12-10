const Stuff = require('../models/stuff');
const User = require('../models/user');

const ITEMS_PER_PAGE = 10;

exports.getIndex = (req, res, next) => {
    const user = req.user;
    const page = +req.query.page || 1; 
    let totalStuff;
    let usernames = [];

    Stuff.find()
    .countDocuments()
    .then(stuffNum => {
        totalStuff = stuffNum;
        return Stuff.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({dateAdded: -1})
        .populate('userId');
    })
    .then(stuff => {
        for(i = 0; i < stuff.length; i++){
            if(stuff[i].userId != null){
                if(stuff[i].userId.username){
                    usernames.push(stuff[i].userId.username);
                } 
                else {
                    usernames.push("Anonymous");
                } 
            } 
            else {
                usernames.push("Deleted User"); 
            }
        }

        res.render('../views/pages/index.ejs',{ 
        title: 'Welcome',
        path: '/index',
        user: user,
        itemList: stuff, 
        usernames: usernames,
        owner: false,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalStuff,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalStuff / ITEMS_PER_PAGE)
        });
    })
    .catch(err => console.log(err));
};

exports.getStuffDetails = (req, res, next) => {
    res.render('../views/pages/stuff-details', {
        title: 'Stuff Details',
        path: '/stuff-details', 
        stuff: null
    });
};