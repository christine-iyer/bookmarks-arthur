const router = require('express').Router()
const bookmarkCtrl = require('../../controllers/api/bookmarks')
const checkToken = require('../../config/checkToken')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

/* /api/Bookmarks/:id
DELETE
destroy bookmark
*/
router.delete('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.destroyBookmark, bookmarkCtrl.respondWithBookmark)
/*
/api/Bookmarks/:id
PUT
update bookmark
*/
router.put('/:id', checkToken, ensureLoggedIn, bookmarkCtrl.updateBookmark, bookmarkCtrl.respondWithBookmark)
/*
/api/Bookmarks
POST
create bookmark
*/
router.post('/', checkToken, ensureLoggedIn, bookmarkCtrl.createBookmark, bookmarkCtrl.respondWithBookmark)

module.exports = router