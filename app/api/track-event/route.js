import axios from "axios";
import crypto from "crypto";
import { NextResponse } from "next/server";

const PIXEL_ID = process.env.PIXEL_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Generar un event_id único
function generateUniqueEventId() {
  return crypto.randomBytes(16).toString("hex");
}

export async function POST(req, res) {
  try {
    const body = await req.json(); // Leer el cuerpo de la solicitud
    const { name, email, phone } = body;

    // Obtener el event_source_url
    const eventSourceUrl = req.headers.referer || "";

    // Obtener la dirección IP del cliente
    const clientIpAddress =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real-ip"] ||
      req.headers["cf-connecting-ip"] ||
      req.socket?.remoteAddress;

    const commonEventData = {
      event_time: Math.round(Date.now() / 1000), // Convertir a segundos y redondear al entero más cercano
      user_data: {
        client_ip_address: clientIpAddress,
        client_user_agent: req.headers["user-agent"],
        em: crypto.createHash("sha256").update(email).digest("hex"),
        ph: crypto.createHash("sha256").update(phone).digest("hex"),
        fn: crypto.createHash("sha256").update(name).digest("hex"),
      },
      event_source_url: eventSourceUrl,
      opt_out: false,
      event_id: generateUniqueEventId(),
      action_source: "website",
      data_processing_options: [],
      data_processing_options_country: 0,
      data_processing_options_state: 0,
    };

    const events = [
      {
        ...commonEventData,
        event_name: "CompleteRegistration", // Completar Registro
      },
      {
        ...commonEventData,
        event_name: "Lead", // Cliente Potencial
      },
    ];

    const data = {
      data: events,
      test_event_code: "TEST95384",
    };

    const response = await axios.post(
      `https://graph.facebook.com/v16.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error: "Failed to track events",
        details: error.response?.data || error.message,
      },
      { status: 500 }
    );
  }
}
