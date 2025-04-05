 const bcryptjs = require('bcryptjs');
 const User = require('../models/user.model.js');
const errorHandler = require('../utlils/error.js');

 
 const test = (req, res) => {
    res.json({ message: 'User controller works' });

}
const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) return next(errorHandler(403, "You can only update your account!"))
        try {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10)
            }

            const updateUser = await User.findByIdAndUpdate(req.params.id, {
$set :{
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
}
            }, {new: true})

            const {password, ...rest} = updateUser._doc
            res.status(200).json(rest)

        } catch (error) {
            next(error)
            
        }
}


const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) return next(errorHandler(403, "You can only delete your account!"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
};     


module.exports = {test, updateUser, deleteUser}; ;