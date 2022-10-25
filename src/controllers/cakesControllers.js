import connection from "../../dataBase/dataBase.js"

export async function postCakes(req, res) {
const  {name, price, image, description} = req.body
try {
  
  const { rows: existName } = await connection.query(`
  SELECT * FROM cakes WHERE name = $1;`,
  [name]
);
if(existName.length > 0){
return res.status(409).send("There is a cake's name!");
};


await connection.query(`
INSERT INTO cakes (name, price, image, description) 
VALUES ($1,$2, $3, $4)`,
[name, price, image, description]);

res.sendStatus(201)
} catch (error) {
  
}

}