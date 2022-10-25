import connection from "../../dataBase/dataBase.js";

export async function postOrders(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.body;

  try {
    const { rows: idClient } = await connection.query(
      `
    SELECT id FROM clients WHERE id = $1;
  `,
      [clientId]
    );
    const { rows: idCake } = await connection.query(
      `
  SELECT id FROM cakes WHERE id = $1;
`,
      [cakeId]
    );

    if (idClient.length === 0) {
      return res.sendStatus(404);
    }
    if (idCake.length === 0) {
      return res.sendStatus(404);
    }
    await connection.query(
      `
    INSERT INTO orders ("clientId", "cakeId", quantity, "totalPrice") 
    VALUES ($1,$2, $3, $4)`,
      [idClient[0].id, idCake[0].id, quantity, totalPrice]
    );

    res.sendStatus(201);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getOrders(req, res) {
  const { date } = req.query;

  const { rows: result } = await connection.query(`
  SELECT clients.id AS client_id, clients.name AS client_name, clients.address, clients.phone,
  cakes.id AS cake_id, cakes.name AS cake_name, cakes.price, cakes.description, cakes.image,
  orders.id AS order_id, orders."createdAt", orders.quantity, orders."totalPrice" FROM orders
  JOIN clients ON clients.id = orders."clientId"
  JOIN cakes ON cakes.id = orders."cakeId"
  ORDER BY orders."createdAt" DESC
  ;`);

  res.status(200).send(
    result.map((element) => {
      return {
        client: {
          id: element.client_id,
          name: element.client_name,
          address: element.address,
          phone: element.phone,
        },
        cake: {
          id: element.cake_id,
          name: element.cake_name,
          price: element.price,
          description: element.description,
          image: element.image,
        },
        orderId: element.order_id,
        createdAt: element.createdAt,
        quantity: element.quantity,
        totalPrice: element.totalPrice,
      };
    })
  );
}

export async function getOrdersId(req, res) {
  const { id } = req.params;

const {rows: existeId} = await connection.query(`
SELECT id FROM orders WHERE id = $1;
`, [id]) 


  if(!existeId[0]){
    return res.status(404).send("there isn't id")
  }
try {
  const {rows: result} = await connection.query(
     `
     SELECT
         clients.id AS client_id, clients.name AS client_name, 
         clients.address, clients.phone,
         cakes.id AS cake_id, cakes.name AS cake_name, cakes.price,
          cakes.description, cakes.image,
         orders.id AS "orderId", orders."createdAt", 
         orders.quantity, orders."totalPrice" FROM orders
     JOIN clients ON clients.id = orders."clientId"
     JOIN cakes ON cakes.id = orders."cakeId"
     WHERE orders.id = $1
     ORDER BY orders."createdAt" DESC
     `,
     [id]
   );
  
res.status(200).send(result.map((elemento) => {
  return {
    client: {
        id: elemento.client_id,
        name: elemento.client_name,
        address: elemento.address,
        phone: elemento.phone
    },
    cake: {
        id: elemento.cake_id,
        name: elemento.cake_name,
        price: elemento.price,
        description: elemento.description,
        image: elemento.image
    },
    orderId: elemento.orderId,
    createdAt: elemento.createdAt,
    quantity: elemento.quantity,
    totalPrice: elemento.totalPrice,
}

}


))

} catch (error) {
  console.log(error.message)
}
}
