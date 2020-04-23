// */=============================================\* 
//  ||                      .__                  || 
//  ||   ____   ____   ____ |  |   ____   ____   || 
//  || _/ __ \_/ __ \ / ___\|  |  /  _ \ /  _ \  || 
//  || \  ___/\  ___// /_/  >  |_(  <_> |  <_> ) || 
//  ||  \___  >\___  >___  /|____/\____/ \____/  || 
//  ||      \/     \/_____/                  2020|| 
// .\=============================================/.

// npm install express curl cors fs

const port = 42000
const ip = "88.121.253.98"

const express = require('express')
const app = express()

const cors = require('cors')

const curl = require('curl')
const fs = require('fs') 

// Middleware
app.use(express.static('./public'))

app.use(express.json({limit: '500kb'}));       // SECU
app.use(express.urlencoded({limit: '500kb', extended: true})); // SECU

app.use(cors()) // 4 SAFE SOFT WIN -_- 

// LOG REDIRECTION
app.get('/log', (req,res) => {
  res.redirect(req.baseUrl + '/back/log.html')
})

// LOG REDIRECTION
app.get('/', (req,res) => {
  res.redirect(req.baseUrl + '/index.html')
})

//  READ & WRITE LOG 
app.get('/', (req,res) => {
  const date = new Date()
  
  // IP PROVENANCE
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // lecture data
  fs.readFile('./log.json', 'utf-8', (err, json) => { 
    if (err) throw err // CONTROLE

      // fusion dans un buffer
      let bufferJson = JSON.parse(json).localData // deconstruction json
      bufferJson.push({ date : date , ip : ip.replace("::ffff:","") , num : bufferJson.length + 1 }) // add data
      const newJsonData = { localData : bufferJson } // reconstruction json

      // ecriture data
      fs.writeFile('./log.json', JSON.stringify(newJsonData) , 
        (err, jsonDataUp) => {
          if (err) res.send("NOK") // CONTROLE

          res.send(JSON.stringify(newJsonData)) // RENVOIE LE JSON
        })
    })
})

app.listen(port, () =>  { 
      console.log("Serveur Rdy") // INFORMATION 
      console.log(`Access via : http://${ip}:${port}/`) // INFORMATION
})
