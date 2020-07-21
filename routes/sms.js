const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
let smss = [];
app.use(cors());

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.post('/sms', (req, res) => {
    const sms = req.body;
    console.log(sms);
    smss.push(sms);


    try {
        //Obtain json data 
        const smsBody = JSON.parse(sms)
        res.send('SMS has been sent and result returned');
        const https = require('https')
        const data = JSON.stringify({
            userName: 'craftsilicon',
            channel: 'sms',
            packageId: 4629,
            oa: smsBody.smsid,
            msisdn: smsBody.msisdn,
            message: smsBody.message,
            uniqueId: 'uniqueId',
            actionResponseURL: 'actionResponseURL'
        })
        const dataset = JSON.stringify({
            timeStamp: Date.now(),
            dataSet: '['.data.
            ']'
        })
        const options = {
            hostname: 'https://dsvc.safaricom.com',
            port: 9480,
            path: '/api/public/CMS/bulksms',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Authorization: Bearer ': 'application/json'
            }
        }
        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', (d) => {
                process.stdout.write(d)
            })
        })

        req.on('error', (error) => {
            console.error(error)
        })

        req.write(data)
        req.end()
    } catch (err) {
        console.error(err)
    }

});

app.listen(port, () => console.log(`The sms API has been started ${port}!`));