const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}

function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * 
 * @param None
 */
function getSubs(){
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
}

/**
 * 
 * @param {number} id 
 */
async function getSub(id){
  const subs = await getSubs();
  return subs.find(record => record.id == id);
}

/**
 * 
 * @param {Object} newSub 
 */
async function updateSub(newSub){
  const subs = await getSubs();
  let sub = subs.find(item => item.id == newSub.id);
  
  sub.substatus = newSub.substatus;
 
  await save(subs);
}

/**
 *
 * @param {Object} record 
 */
async function deleteSub(record){
  const subs = await getSubs();
  subs = subs.filter(item => item.id != record.id);
  await save(subs);
}

module.exports = {
  getSubs,
  getSub,  
  updateSub, 
  deleteSub,
}
