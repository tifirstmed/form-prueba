// pages/api/create-lead.js
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    const {  name, lastName, phone, email } = req.body;
    
    const webhookUrl = 'https://firstmedpharma.bitrix24.es/rest/752775/y1krya81wzz6tdz1'; //
    
    const leadData = {
        fields: {
            TITLE: "Formulario Prueba",
            NAME: "Cesar Test",
            LAST_NAME: "Data Test",
            WEB: "Landing Form",
            STATUS_ID: "NEW",
            PHONE: [
                { "VALUE": "+51 (987) 654-123", "VALUE_TYPE": "WORK" }
            ],
            EMAIL: [
                { "VALUE": "ccesar@gmail.com", "VALUE_TYPE": "HOME" }
            ],
            UF_CRM_LEAD_1686584348364: "Test demo"
        },
        consents: {
            "AGREEMENT_25": "Y"
        }
    };

    try {
        const response = await axios.post(`${webhookUrl}/crm.lead.add.json`, leadData);
        res.status(200).json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
