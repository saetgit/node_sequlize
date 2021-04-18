const db = require("../models/index");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {

    async login(req, res) {
        try {
            console.log(req.user);
            // First generate token then send to user
            const token = JWT.sign(
                { type: "user", data: req.user.User },
                process.env.SECRET,
                { expiresIn: '8h' }
            )

            return res.status(200).send({
                status: 1,
                success: true,
                message: "login success",
                token
            })
        } catch (error) {
            return res.status(500).send({
                success: false,
                error,
                message: "login failed",
            })
        }
    },
    async index(req, res) {
        const user = await db.User.findAll();

        if (user == "" || user == null) {
            return res.status(200).send({ message: "user not found" });
        }

        return res.status(200).send({ user });
    },
    async store(req, res) {

        try {
            const { name, email, password, islogged } = req.body;
            const user = await db.User.create({ name, email, password, islogged });

            return res.status(200).send({
                status: 1,
                message: 'success',
                user
            });
        } catch (error) {
            console.log('------------------------>', error);
            return res.status(500).send({
                success: false,
                error,
                message: "",
            })
        }

    },
    async update(req, res) {
        const { name, email, password } = req.body;

        const { user_id } = req.params;

        await db.User.update({
            name, email, password
        }, {
            where: {
                id: user_id
            }
        });
        return res.status(200).send({
            status: 1,
            message: 'update success'
        });
    },
    async delete(req, res) {

        const { user_id } = req.params;

        await db.User.destroy({
            where: {
                id: user_id
            }
        });
        return res.status(200).send({
            status: 1,
            message: 'delete success'
        });

    },
};