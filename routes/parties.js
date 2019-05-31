const sql = require('mssql');
const express = require('express');
const router = express.Router();


function openConnection(){
    sql.connect('mssql://OpenBankingAdmin:Password@123@CNC8F7504AC3A5/OpenBanking')
}

function closeConnection(){
    sql.close();
}

// HTTP GET --> RETRIEVE ALL PARTIES
router.get('/', async (request, response) => {
    try {
        const result = await sql.query`SELECT * FROM [OpenBanking].[dbo].[Parties]`
        response.send(result.recordsets[0]);
        closeConnection();
    } catch (err) {
        console.log(err);
    }
    openConnection();
});

// HTTP GET --> RETRIEVE ALL PARTY BY ID
router.get('/:id', async (request, response) => {
    const partyNumber = request.params.id;
    try {
        const result = await sql.query`SELECT * FROM [OpenBanking].[dbo].[Parties] WHERE PartyNumber = ${partyNumber}`;
        if (result.recordsets[0].length === 0) return response.status(404).send(`The party with the given PartyNumber was not found.`);
        response.send(result.recordsets[0]);
        closeConnection();
    } catch (err) {
        console.log(err);
    }
    openConnection();
});

module.exports = router;