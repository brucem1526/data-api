const parties = require('./routes/parties');
const sql = require('mssql');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/parties', parties);

try {
    sql.connect('mssql://OpenBankingAdmin:Password@123@CNC8F7504AC3A5/OpenBanking').then((dbConn) => {
        console.log('SQL connected...');
        console.log('Database connected: ', dbConn._connected);
    }).catch(err => {
        console.log(err);
    })
    sql.on('error', err => {
        console.log(err);
    });
} catch (error) {
    console.log(error);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}`));