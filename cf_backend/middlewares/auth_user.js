module.exports = function(request, response, next) {
    if(!request.originalUrl.includes("tasks")) return next();
    if(request.session.userId) return next();
    response.redirect('/sessions');
}