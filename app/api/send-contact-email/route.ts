

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
        return NextResponse.json({
            message: "Faltan parámetros requeridos",
            status: 400
        });
    }
    
    try {
        const sendEmail = async (to: string, subject: string, html: string) => {
            try {
                const { data, error } = await resend.emails.send({
                    from: 'contacto@sbmusic.ar',
                    to,
                    subject,
                    html,
                });
        
                if (error) {
                    console.error(`Error enviando correo a ${to}:`, error);
                    return { success: false, error };
                }
        
                return { success: true, data };
            } catch (err) {
                console.error(`Error inesperado enviando correo a ${to}:`, err);
                return { success: false, error: err };
            }
        };
        
        const emailBuffalo = await sendEmail(
            'fede.juan.herrera@gmail.com',
            subject,
            `
                <h3>Un usuario quiere contactarse con Buffalo's.</h3>
                <p>Nombre: ${name}</p>
                <p>Email: ${email}</p>
                <strong>"${message}"</strong>
            `
        );
        
        const emailCliente = await sendEmail(
            email,
            'Contacto con Buffalo Strong',
            `
                <h3>¡Hola ${name}!</h3>
                <p>Enviaste un mensaje a Buffalo's Strong, nuestro equipo te contestara a la brevedad.</p>
            `
        );
        
        if (!emailBuffalo.success) {
            console.error("Error al enviar el email a Buffalo:", emailBuffalo.error);
        }
        
        if (!emailCliente.success) {
            console.error("Error al enviar el email al cliente:", emailCliente.error);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}