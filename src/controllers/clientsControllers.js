import connection from "../../dataBase/dataBase.js"

export async function postClients(req, res) {
const {name, address, phone} = req.body;

try {
    
    await connection.query(`
    INSERT INTO clients (name, address, phone) 
    VALUES ($1,$2, $3)`,
    [name, address, phone]);
    
    res.sendStatus(201)

} catch (error) {
 console.log(error.message)
}
};

export async function getClients(req, res) {
const {id} = req.params;

const {rows: existeId} = await connection.query(`
SELECT id FROM orders 
WHERE id = $1;
`, [id]);

if(!existeId[0]){
    return res.status(404).send("there isn't id")
  }

try {

    const {rows: result} = await connection.query(`
    SELECT orders.id AS "orderId", orders.quantity, 
    orders."createdAt", orders."totalPrice", cakes.name AS "cakeName"
    FROM orders
    JOIN cakes ON cakes.id = orders."cakeId"
    WHERE orders."clientId" = $1
    ORDER BY orders."createdAt" DESC
`,
    [id]
);
    
res.status(200).send(result)
} catch (error) {
    
}
}