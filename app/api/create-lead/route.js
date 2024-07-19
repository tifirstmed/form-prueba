import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  try {
    const body = await req.json(); // Obtener los datos del cuerpo de la solicitud
    const { name, lastName, phone, email, description } = body;

    const webhookUrl =
      'https://firstmedpharma.bitrix24.es/rest/752775/y1krya81wzz6tdz1'; // Reemplaza con tu URL de webhook

    const leadData = {
      fields: {
        TITLE: 'Formulario Landing Dormilon-M',
        STATUS_ID: 'UC_LROQI4',
        WEB: 'Landing Form',
        NAME: name,
        LAST_NAME: lastName,
        PHONE: [{ VALUE: phone, VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: email, VALUE_TYPE: 'HOME' }],
        UF_CRM_LEAD_1686584348364: description,
        UF_CRM_1633353212: '677',
      },
      params: {
        REGISTER_SONET_EVENT: 'Y',
      },
    };

    const response = await axios.post(
      `${webhookUrl}/crm.lead.add.json`,
      leadData
    );

    return NextResponse.json(response.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // Manejar errores de Axios
      const axiosError = err;
      console.error(
        'Error al crear el lead en Bitrix24:',
        axiosError.response?.data || axiosError.message
      );
      return NextResponse.json(
        {
          error: 'Failed to create lead in Bitrix24',
          details: axiosError.response?.data || axiosError.message,
        },
        { status: 500 }
      );
    } else {
      // Manejar otros tipos de errores
      console.error('Unexpected error:', err);
      return NextResponse.json(
        { error: 'An unexpected error occurred', details: err },
        { status: 500 }
      );
    }
  }
}
