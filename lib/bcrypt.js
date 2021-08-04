const bcryptjs = require('bcryptjs');

const bcrypt = {};

bcrypt.secure = async (text) => {
    const salt = await bcryptjs.getSalt(10);
    const hash = await bcryptjs.hash(text, salt);
    return hash;
};
bcrypt.checkout = async (text, hash) => {
    const check = await bcryptjs.compare(text, hash);
    return check;
};

module.exports = bcrypt;