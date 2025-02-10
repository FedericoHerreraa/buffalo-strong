

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, lastName, email, fiscalKey } = body;

    if (!name || !lastName || !email || !fiscalKey) {
        return NextResponse.json({
            message: "Faltan parámetros requeridos",
            status: 400
        });
    }
    
    try {
        // Email enviado a "buffalo"
        const { data, error } = await resend.emails.send({
            from: 'fede.herrera@asneeed.com',
            to: email,
            subject: 'My First Email',
            html: `
                <h1>¡Hola Buffalo!</h1>
                <p>Este es un email de prueba enviado desde el servidor.</p>
                <p>Nombre: ${name}</p>
                <p>Apellido: ${lastName}</p>
                <p>Email: ${email}</p>
                <p>Clave Fiscal: ${fiscalKey}</p>
            `,
        });

        // Enviar otro email al cliente avisandlo la recepcion

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}