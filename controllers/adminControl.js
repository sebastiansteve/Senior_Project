exports.getAddArt = (req, res, next) => {
    res.render('../views/pages/add',{
        title: 'Add',
        path: '/add'
    });
};

exports.postAddArt = (req, res, next) => {
    res.redirect('/');
};

exports.getEditArt = (req, res, next) => {
    res.render('../views/pages/edit', {
        title: 'Edit',
        path: '/edit'
    })
};

exports.postEditArt = (req, res, next) => {
    res.redirect('/');
};