const express = require('express');

const records = require('./records');

const cors = require('cors');

const app = express();

const fs = require('fs');

const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');

app.use(cors());

app.get('/getsubs', async (req, res) => {
  const subs = await records.getSubs();
  res.json(subs);
});

app.get('/getsub/:id', async (req, res) => {
  const user = await records.getSub(req.params.id);
  res.json(user);
});

app.delete('/subdelete/:id', (req, res) => { 
  const subId = parseInt(req.params.id); 
  let data = JSON.parse(fs.readFileSync(dataFilePath)); 
  data = data.filter(sub => sub.id !== subId); 
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); 
  res.json({ message: 'Subscription deleted successfully' }); 
}); 

app.put('/sub/:id', (req, res) => { 
  const subId = parseInt(req.params.id); 
  const updatedSub = "paid"; 
  const data = JSON.parse(fs.readFileSync(dataFilePath)); 
  const subIndex = data.findIndex(sub => sub.id === subId); 
  if (subIndex !== -1) { 
      data[subIndex].substatus = updatedSub; 
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2)); 
      res.json({ message: 'Sub updated successfully' }); 
  } else { 
      res.status(404).json({ message: 'Sub not found' }); 
  } 
}); 

app.listen(3000, () => console.log('Quote API listening on port 3000!'));
