const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
app.use(cors());
app.use((req,res, next) => setTimeout(next, 2000))
let counter = 0;
app.get('/', (req, res) => {
    counter++;
    if(counter >= 10) {
        counter = 0;
        res.send({responseText: 'Success'});
    } else {
        res.send({
            responseText:
                `Failure: ${counter}`
        })
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
