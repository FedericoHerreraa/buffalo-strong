

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, lastName, email, address, cuit } = body;

    if (!name || !lastName || !email || !cuit || !address) {
        return NextResponse.json({
            message: "Faltan parámetros requeridos",
            status: 400
        });
    }
    
    try {
        const sendEmail = async (to: string, subject: string, html: string) => {
            try {
                const { data, error } = await resend.emails.send({
                    from: 'autenticacion@sbmusic.ar',
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
        
        // Enviar email a Buffalo
        const emailBuffalo = await sendEmail(
            'info@sbmusic.ar',
            'Registro en Strong Buffalo Music',
            `
                <h3>Un nuevo usuario quiere ingresar a buffalo.</h3>
                <p>Nombre: <strong>${name}</strong></p>
                <p>Apellido: <strong>${lastName}</strong></p>
                <p>Email: <strong>${email}</strong></p>
                <p>Dirección: <strong>${address}</strong></p>
                <p>Clave Fiscal: <strong>${cuit}</strong></p>
            `
        );
        
        // Enviar email al cliente
        const emailCliente = await sendEmail(
            email,
            'Registro en Strong Buffalo Music',
            `
                <h3>¡Hola ${name}!</h3>
                <p>Te registraste en Strong Buffalo Music, nuestro equipo procesará la solicitud y te enviará las credenciales a la brevedad.</p>
            `
        );
        
        // Verificar si hubo errores en los envíos
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