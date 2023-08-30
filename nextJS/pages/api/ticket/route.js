import sql from "mssql";

const config = {
  user: "sa",
  password: "p@ssw0rd",
  server: "BPBI-ISSARAPORN",
  database: "test_report",
  trustServerCertificate: true,
};

// export default async (req, res) => {
export default async function handler(req, res) {
  //---GET------------------------
  if (req.method === "GET") {
    const { id } = req.query;
    if (req.query.id === undefined) {
      try {
        await sql.connect(config);
        const result = await sql.query("select * from test");
        return res.status(200).json(result.recordset);
      } catch (error) {
        return res.status(500).json({ error: "Database connection error" });
      }
      //---ID-----
    } else {
      try {
        await sql.connect(config);
        const result = await sql.query(
          `select * from test where test_id = ${id}`
        );
        return res.status(200).json(result.recordset);
      } catch (error) {
        return res.status(500).json({ error: "Database connection error" });
      }
    }
    //---POST------------------------
  } else if (req.method === "POST") {
    try {
      const { name, l_name, nick_name, address, phone } = req.body;
      await sql.connect(config);
      const result = await sql.query(
        `INSERT INTO test (name, l_name, nick_name, address, phone) VALUES ('${name}', '${l_name}', '${nick_name}', '${address}', '${phone}')`
      );
      return res.status(201).json({ message: "Data inserted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Database connection error" });
    }
    //---PUT------------------------
  } else if (req.method === "PUT") {
    try {
      const { id } = req.query;
      const { name, l_name, nick_name, address, phone } = req.body;
      await sql.connect(config);
      const result = await sql.query(
        `UPDATE test SET name = '${name}', l_name = '${l_name}', nick_name = '${nick_name}', address = '${address}', phone = '${phone}' WHERE test_id = ${id}`
      );
      return res.status(200).json({ message: "Data updated successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Database connection error" });
    }
    //---DELETE------------------------
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await sql.connect(config);
      const result = await sql.query(`DELETE FROM test WHERE test_id = ${id}`);
      return res.status(200).json({ message: "Data deleted successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Database connection error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
