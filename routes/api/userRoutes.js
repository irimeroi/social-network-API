const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    //updateUser,
    //deleteUser,
    // createFriend,
    // deleteFriend
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:id')
.get(getSingleUser)
// .put(updateUser)
// .delete(deleteUser);


//TO DO:
// /api/users/:userId/friends/:friendId
// router.route('/:userId/friends/friendId')
// .post(createFriend)
// .delete(deleteFriend);

module.exports = router;
