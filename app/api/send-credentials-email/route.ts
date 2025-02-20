

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const bodyEmail = await req.json();
    const { to, subject, body } = bodyEmail;

    if (!to || !subject || !body) {
        return NextResponse.json({
            message: "Faltan parámetros requeridos",
            status: 400
        });
    }
    
    try {
        // Email enviado a "buffalo"
        const { data, error } = await resend.emails.send({
            from: 'federicoherrera@asneeed.com',
            to: to,
            subject: subject,
            html: `
                <h1>¡Hola Buffalo!</h1>
                <p>Este es un email de prueba enviado desde el servidor.</p>
                <div>${body}</div>
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