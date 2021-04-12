const db = require("../models/index");
const bcrypt = require('bcryptjs');

const jwt= require('jsonwebtoken');

const authConfig=require('../config/auth.json');
function generateToken(params={}){
    return jwt.sign(params.authConfig.secret<{
        expirsIn:78300,
    });
}

module.exports = {

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const islogged = true
            const user = await db.User.findOne({ where: { email } });

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: `Email don't exist in our database!`
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(400).send({
                    status: 0,
                    message: "user not found"
                });
            }

            const user_id = user.id;
            await db.User.update({
                islogged
            }, {
                where: {
                    id: user_id
                }
            });
            user.password = undefined

            const token=generateToken({id:user.id});

            return res.status(200).send({
                status: 1,
                success: true,
                message: "login success",
                user,token
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
            // const token=generateToken({id:user.id});

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