const stuff = require('../models/stuff.js');
const Stuff = require('../models/stuff.js');
const fileHelper = require('../util/fileManager');

const ITEMS_PER_PAGE = 10;

exports.getStuff = (req, res, next) => {
    const user = req.user;
    const page = +req.query.page || 1; 
    let totalStuff;

    Stuff.find({ userId: user })
    .countDocuments()
    .then(stuffNum => {
        totalStuff = stuffNum;
        return Stuff.find({ userId: user })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
        .sort({dateAdded: -1});
    })
    .then(stuff => {
        let usernames = [];
        for(i = 0; i < stuff.length; i++){
            usernames.push(stuff[i].username);
        }

        res.render('../views/pages/index.ejs',{
        title: 'My stuff',
        path: '/my-stuff',
        user: user,
        itemList: stuff, 
        usernames: usernames,
        owner: true,
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

exports.getViewStuff = (req, res, next) => {  
    const stuffId = req.query.stuffId;

    Stuff.findById(stuffId)
    .then(stuff => {
        let isOwner;
        if(req.user){
            isOwner = (req.user._id.toHexString() == stuff.userId.toHexString());
        }
        else{
            isOwner = false;
        }
        const tagArray = stuff.tags;
        let tagString = "";

        for(i = 0; i < tagArray.length; i++){ 
            if(i){
                tagString += ", ";
            }
            tagString += tagArray[i];
        }
 
        res.render('../views/pages/view.ejs',{
        title: stuff.title,
        path: '/view',
        stuff: stuff,
        owner: isOwner,
        tags: tagString
        });
    })
    .catch(err => console.log(err));
}; 

exports.getAddStuff = (req, res, next) => {
    res.render('../views/pages/add-stuff',{
        title: 'Add',
        path: '/add-stuff'
    });
};

exports.postAddStuff = (req, res, next) => { 
    const title = req.body.title;
    const description = req.body.description;
    const image = req.file;
    const userId = req.user;
    const tagString = req.body.tags;

    const tags = tagString.split(", ");

    if(!image){
        res.redirect('/add-stuff');
    }
    const imageUrl = image.path; 

    const stuff = new Stuff({
        title: title, 
        tags: tags, 
        image: imageUrl,
        description: description,
        userId: userId,
        dateAdded: new Date()
    });
    stuff.save()
    .then(result => {
        res.redirect('/my-stuff');
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getEditStuff = (req, res, next) => {
    const stuffId = req.query.stuffId;

    Stuff.findById(stuffId).then(stuff => {
        const tagArray = stuff.tags;
        let tagString = "";

        for(i = 0; i < tagArray.length; i++){ 
            if(i){
                tagString += ", ";
            }
            tagString += tagArray[i];
        }
 
        res.render('../views/pages/edit', {
        title: 'Edit',
        path: '/edit',
        stuff: stuff,
        tags: tagString
        }) 
    })
};

exports.postEditStuff = (req, res, next) => { 
    const stuffId = req.body.stuffId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    const tagString = req.body.tags;
    const newImage = req.file;

    Stuff.findById(stuffId)
    .then(stuff => {
        stuff.title = newTitle;
        stuff.description = newDescription;
        stuff.lastEdited = new Date();
        stuff.tags = tagString.split(", ");

        if(newImage){
            fileHelper.deleteFile(stuff.image);
            stuff.image = newImage.path;
        }

        return stuff.save()
    })
    .then(result => {
        res.redirect('/my-stuff');
    })
    .catch(err => console.log(err));
};

exports.getDeleteStuff = (req, res, next) => {
    const stuffId = req.query.stuffId;

    Stuff.findById(stuffId)
    .then(stuff => {
        fileHelper.deleteFile(stuff.image);
        return Stuff.findByIdAndRemove(stuffId);
    })
    .then(() => {
        res.redirect('/my-stuff');
    })
    .catch(err => console.log(err));
};