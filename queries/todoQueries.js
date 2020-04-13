const pool = require('../config/database').pool;

const postTodo = (req, res) => {
  const { user_id, name } = req.body;
  let stmt = `INSERT INTO todo_list (user_id, list_name) VALUES('${user_id}', '${name}') RETURNING *`;

  pool.query(stmt, (err, result) => {
    if(err){
      res.status(500).json(err);
    }else{
      res.status(200).json(result.rows);
    }
  });
}

const updateTodo = (req, res) => {
  const { id, name } = req.body;

  let stmt = `UPDATE todo_list SET list_name='${name}' WHERE id='${id}' RETURNING *`;
  pool.query(stmt, (err, result) => {
    if(err){
      console.log(err);
      res.status(500).json(err);
    }else{
      res.status(200).json(result.rows);
    }
  });
}

const getTodoItems = async listId => {
  let stmt = `SELECT id, item_name FROM todo_items WHERE list_id='${listId}'`;
  try{
    const result = await pool.query(stmt);
    return result.rows;
  }catch(err){
    console.log(err.stack);
  }
}

const getTodos = async (req, res) => {
  const { user_id } = req.body;
  let stmt = `SELECT id, list_name FROM todo_list WHERE user_id='${user_id}'`;

  pool.query(stmt, async (err,result) => {
    if(err){
      res.status(500).json(err);
    }else{
      let list_items = result.rows;

      const listItemPromise = list_items.map(async list_item => {
        let todo_items = await getTodoItems(list_item.id);
        let this_item = {
          ...list_item,
          items: todo_items 
        }
        return this_item;
      });

      const response = await Promise.all(listItemPromise);
      res.status(200).json(response);
    }
  });
}

const getTodo = (req, res) => {
  const {id} = req.params;
  let stmt = `SELECT id, list_name FROM todo_list WHERE id='${id}'`;
  pool.query(stmt, async (err,result) => {
    if(err){
      res.status(500).json(err);
    }else{
      let todo_list = result.rows[0];
      console.log('todo', todo_list);
      if(todo_list !== undefined){
        let todo_items = await getTodoItems(todo_list.id);

        let response = {
          ...todo_list,
          items: todo_items
        }
        res.status(200).json(response);
      }

      res.status(400).json({"error": `Item with id:${id} not found!`});
      

    }
  });

}

const deleteTodo = (req, res) => {
  const { id } = req.body;
  let stmt = `DELETE FROM todo_list WHERE id=${id} RETURNING *`;

  pool.query(stmt, (err,result) => {
    if(err){
      res.status(500).json(err);
    }else{
     res.status(200).json(result.rows);
    }
  });
}

module.exports = {
  postTodo,
  updateTodo,
  getTodos,
  getTodo,
  deleteTodo
}
