const checkAdmin = function(level) {
    if (level != 0) {
        return false;
    } else {
        return true;
    }
}


const checkAuthority = function(check, userInfo, id) {
    if (userInfo.level == 0) return true;
    if (userInfo.level != check) {
        return false;
    } else {
        if (userInfo._id != id) return false;
        return true;
    }
};

module.exports = {
    checkAdmin,
    checkAuthority
};