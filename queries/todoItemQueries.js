const pool = require('../config/database').pool;



const postTodoItem = (req, res) => {
  const { list_id, item_name } = req.body;

  let stmt = `INSERT INTO todo_items(list_id, item_name) VALUES('${list_id}', '${item_name}') RETURNING *`;
  pool.query(stmt, (err, result) => {
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(result.rows);
    }
  });
}

const getTodoItem = (req, res) => {
  const { id, list_id } = req.body;

  let stmt = `SELECT id, list_id, item_name FROM todo_items WHERE list_id=${list_id}`;

  pool.query(stmt, (err, result) => {
    if(err){
      res.status(500).json(err);
    }else{
     res.status(200).json(result.rows);
    }
  });
}

const updateTodoItem = (req, res) => {
  const { id, item_name } = req.body;

  let stmt = `UPDATE todo_items SET item_name='${item_name}' WHERE id=${id} RETURNING *`;
  pool.query(stmt, (err, result) => {
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(result.rows);
    }
  });
}

const deleteTodoItem = (req, res) => {
  const { id } = req.body;

  let stmt = `DELETE FROM todo_items WHERE id=${id} RETURNING id`;
  pool.query(stmt, (err, result) => {
    if(err){
      res.status(500).json(err);
    }else{
     res.status(200).json(result.rows);
    }
  });
}

module.exports = {
  postTodoItem,
  getTodoItem,
  updateTodoItem,
  deleteTodoItem
}
