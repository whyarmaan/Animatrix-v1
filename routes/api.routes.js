// Import Statements
const express = require("express");
const router = express.Router();
const Auth = require("../controllers/Auth");
const isAuth = require("../handlers/is-auth");
const Post = require("../controllers/Post");
const isMod = require("../handlers/isMod");
const ChatRoom = require("../controllers/Chatroom");
const Bots = require("../controllers/Bots");
const ResetPass = require("../controllers/Resetpass");
const ModPrivillage = require("../controllers/Modprivillage");
const notBanned = require("../handlers/notBanned");

// POST /auth/signup
router.post("/auth/signup", Auth.postSignup);

// POST /auth/signin
router.post("/auth/signin", Auth.postSignin);

// POST /posts/new
/*
    @req.query: [accessToken, refreshToken]
    @perms: [Auth]
*/
router.post("/post/new", isAuth, notBanned, Post.postNew);

// GET /posts/
router.get("/posts", Post.getPosts);

// POST /chatRoom/new
/*
    @req.query: [accessToken, refreshToken]
    @perms: [Auth, Mod]
*/
router.post("/chatRoom/new", isAuth, notBanned, isMod, ChatRoom.postNew);

// GET /chatRoom/all
/*
    @req.query: [accessToken, refreshToken]
    @perms: [Auth]
*/
router.get("/chatRooms/", isAuth, notBanned, ChatRoom.getAll);

// POST /bots/:name
/*
    @req.params: [name]
    @req.query: [accessToken, refreshToken]
    @perms: [Auth]
*/
router.post("/bots/:name", isAuth, notBanned, Bots.postBot);

// POST /auth/restpass
/*
    @req.body: [email]
*/
router.post("/auth/resetpass", ResetPass.postReset);

// POST /auth/resetpass/validate
/*
    @req.params: [resetTok]
    @req.body: [newPassword]
*/
router.post("/auth/resetpass/validate", ResetPass.validate);

// POST /mod/ban
/*
    @req.body: [UserID, banTill]
    @perms: [Auth, Mod]
*/
router.post("/mod/ban", isAuth, isMod, ModPrivillage.postBan);

// POST /mod/removeban
/*
    @req.body: [UserID]
    @perms: [Auth, Mod]
*/
router.post("/mod/removeban", isAuth, isMod, ModPrivillage.postRemoveBan);

module.exports = router;
