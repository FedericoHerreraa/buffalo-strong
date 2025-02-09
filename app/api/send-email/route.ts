import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: 'aznarcami@gmail.com',
      to: 'fede.juan.herrera@gmail.com',
      subject: 'My First Email',
      html: '<p>Hello world</p>',
    });

    if (error) {
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}