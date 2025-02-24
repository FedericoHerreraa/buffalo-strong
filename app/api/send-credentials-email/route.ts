

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
        const { data, error } = await resend.emails.send({
            from: 'autenticacion@sbmusic.ar',
            to: to,
            subject: subject,
            html: `
                <p>Buffalo's ya proceso tu solicitud y te envia las credenciales.</p>
                <div>${body}</div>
            `,
        });

        if (error) {
            return NextResponse.json({ success: false, error }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}