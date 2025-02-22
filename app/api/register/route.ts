

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: NextRequest) {
    const { email, name, password, cuit, address } = await req.json();

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
    });

    if (error) {
        return NextResponse.json({ success: false, error: error.message });
    }

    const user = data.user;
    if (!user) {
        return NextResponse.json({ success: false, error: "No se pudo crear el usuario" });
    }

    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        role: 'Cliente',
        cuit,
        name,
        address
    });

    if (profileError) {
        return NextResponse.json({ success: false, error: profileError.message });
    }

    return NextResponse.json({ success: true, user });
}