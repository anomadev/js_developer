module.exports = function(request, response, next) {
    if(request.fullUser && request.fullUser.admin) return next();
    next(new Error('You have no permissions to be here'));
}