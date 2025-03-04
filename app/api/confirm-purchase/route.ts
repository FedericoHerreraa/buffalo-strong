

import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ProductCart } from '@/app/types/types';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { cart, user } = body;

    if (!cart || !user) {
        return NextResponse.json({
            message: "Faltan parámetros requeridos",
            status: 400
        });
    }
    
    const sendEmail = async (to: string, subject: string, html: string) => {
        try {
            const { data, error } = await resend.emails.send({
                from: 'compras@sbmusic.ar',
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

    const cartHTML = cart.map((item: ProductCart) => `
        <tr>
            <td>${item.title}</td>
            <td>${item.quantity}</td>
            <td>${item.listPrice * item.quantity}</td>
            <td>${item.color}</td>
            <td>${item.listCode}</td>
        </tr>
    `).join("");

    try {
        
        const emailBuffalo = await sendEmail(
            'fede.juan.herrera@gmail.com',
            'Se realizó una compra en Buffalo Strong',
            `
                <p>Un usuario realizó una compra en Buffalo's Strong.</p>
                <p><strong>Nombre:</strong> ${user.name}</p>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Direccion:</strong> ${user.address}</p>
                <h3>Productos comprados:</h3>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Color</th>
                            <th>Codigo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartHTML}
                    </tbody>
                </table>
            `
        );

        const emailCliente = await sendEmail(
            user.email,
            '¡Gracias por tu compra en Buffalo Strong!',
            `
                <h1>Hola ${user.name},</h1>
                <p>Recibimos tu compra en Buffalo's Strong. Nuestro equipo te contactará a la brevedad.</p>
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