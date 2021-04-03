const db = require("../models/index");

module.exports = {
    async index(req, res) {
        const user = await db.User.findAll();

        if (user == "" || user == null) {
            return res.status(200).send({ message: "user not found" });
        }

        return res.status(200).send({ user });
    },
    async store(req, res) {

        const { firstName, lastName, email } = req.body;

        const user = await db.User.create({ firstName, lastName, email });

        return res.status(200).send({
            status: 1,
            message: 'success',
            user
        });

    },
    async update(req, res) {
        const { firstName, lastName, email } = req.body;

        const { user_id } = req.params;

        await db.User.update({
            firstName, lastName, email
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