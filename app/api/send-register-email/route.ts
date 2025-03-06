

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
                    from: 'autenticación@sbmusic.ar',
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
            'fede.juan.herrera@gmail.com',
            'Registro en Buffalo Strong',
            `
                <h3>Un nuevo usuario quiere ingresar a Buffalo's.</h3>
                <p>Nombre: ${name}</p>
                <p>Apellido: ${lastName}</p>
                <p>Email: ${email}</p>
                <p>Dirección: ${address}</p>
                <p>Clave Fiscal: ${cuit}</p>
            `
        );
        
        // Enviar email al cliente
        const emailCliente = await sendEmail(
            email,
            'Registro en Buffalo Strong',
            `
                <h3>¡Hola ${name}!</h3>
                <p>Te registraste en Buffalo's Strong, nuestro equipo procesará la solicitud y te enviará las credenciales a la brevedad.</p>
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