import path from 'path'
import fs from 'fs'
import medList from '../../data/medList'

const parseString = require('xml2js').parseString;


const handler = async (req, res) => {
  const fileName = req.query.input
  if (!medList.includes(fileName)) {
    return
  }
  //const filePath = path.join(process.cwd(), 'public/xml/', `${fileName}.nxml`);

  const filePath = path.join('public/xml/', `${fileName}.nxml`);

  fs.readFile(filePath, (err, data) => {
    if (err)
      throw err;
    parseString(data, async function (err, result) {
      try {
        await res.status(200);
        res.send(JSON.stringify(result));
      }
      catch (e) {
        await res.status(500);
        res.send(e);
      }
    });
  })



}

export default handler