import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

function Cypher(password) {
    return bcrypt.hashSync(password, salt);
}

function Decypher(password, DBpassword) {
    return bcrypt.compareSync(password, DBpassword);
}

export { Cypher, Decypher };
