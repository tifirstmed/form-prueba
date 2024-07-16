// pages/api/create-lead.js
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const {  name, lastName, phone, email } = req.body;
    
    const webhookUrl = 'https://firstmedpharma.bitrix24.es/rest/752775/6m6diw0wk65vzdxz'; // Reemplaza con tu URL de webhook

    /* 
    values: {"LEAD_NAME":["Prueba Test"],"LEAD_LAST_NAME":["Test Prueba Demo"],"LEAD_PHONE":[" 51 (994) 936-990"],"LEAD_EMAIL":["cesar@gmail.com"],"LEAD_UF_CRM_LEAD_1686584348364":["Test prueba"]}

    
    */

    const leadData = {
        fields: {
            TITLE: "Formulario Prueba",
            LEAD_NAME: "Cesar Test",
            LEAD_LAST_NAME: "Data Test",
            LEAD_WEB:"Landing Form",
            LEAD_STATUS_ID: "NEW",
            LEAD_PHONE: [
                { "VALUE": " 51 (987) 654-123", "VALUE_TYPE": "MOBILE" }
            ],
            LEAD_EMAIL: [
                { "VALUE": "ccesar@gmail.com", "VALUE_TYPE": "HOME" }
            ],
            LEAD_UF_CRM_LEAD_1686584348364:"Test demo"
        }
    };
    console.log(leadData);

    try {
        const response = await axios.post(`${webhookUrl}/crm.lead.add.json`, leadData);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
