var express = require('express');
var router = express.Router();

const db = require('../db');

router.post('/', async (req, res) => {
  const payloadResult = req.body.result;
  const { action, parameters } = payloadResult;

  switch (action) {
    case 'item.add':
      await db.query('INSERT INTO items (item) VALUES (?)', [parameters.item]);
      break;

    case 'item.remove':
      await db.query('DELETE FROM items WHERE item = ? LIMIT 1', [parameters.item]);
      break;

    case 'item.list':
      break;

    default:
      throw new Error();
  }

  const list = await db.query('SELECT item FROM items ORDER BY item');

  return res.json({
    action,
    list: list.map(({ item }) => item),
  });
});

module.exports = router;
