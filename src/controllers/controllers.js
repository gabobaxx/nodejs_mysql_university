const controller = {};
const table = 'students';

controller.index = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${table}`, (err, rows) => {
            if (err) {
                res.json(err);
            }
            res.render('index', {
                data: rows
            });
        });
    });
};

controller.save = (req, res) => {
    let data = {};
    const cedula = req.body.cedula;
    const average = req.body.nota;
    let genero = 1;
    if (req.body.genero == "femenino") {
        genero = 2;
    }
    data = {
        "cedula": cedula,
        "genero": genero,
        "average": average
    }

    req.getConnection((err, connection) => {
        const query = connection.query(`INSERT INTO ${table} set ?`, [data], (err, rows) => {
            if (rows) {
                res.redirect('/');
            } else if (err) {
                console.error(err);
                res.redirect('/');
            }
        })
    })
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query(`SELECT * FROM ${table} WHERE id = ?`, [id], (err, rows) => {
            res.render('edit', {
                data: rows[0]
            })
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;

    let genero = 1;

    if (req.body.genero == "femenino") {
        genero = 2;
    }

    const data = {
        "cedula": req.body.cedula,
        "genero": genero,
        "average": req.body.average
    }
    req.getConnection((err, conn) => {

        conn.query(`UPDATE ${table} set ? WHERE id = ?`, [data, id], (err, rows) => {
            if (rows) {

                res.redirect('/');
            } else {
                console.log(err);
                res.redirect('/');
            }
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
        connection.query(`DELETE FROM ${table} WHERE id = ?`, [id], (err, rows) => {
            if (rows) {

                res.redirect('/');
            } else {
                console.log(err);
                res.redirect('/');
            }
        });
    });
}


module.exports = controller;