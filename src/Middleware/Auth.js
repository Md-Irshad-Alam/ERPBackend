function checkSuperAdmin(req, res, next) {
    if (req.user && req.user.role === 'master') {
        next();
    } else {
        res.status(403).json({ error: 'Permission denied' });
    }
}


module.exports = checkSuperAdmin