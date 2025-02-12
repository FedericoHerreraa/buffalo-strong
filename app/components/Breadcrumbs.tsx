'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from "@/app/components/ui/breadcrumb"

export const BreadCrumbs = () => {
    const pathname = usePathname()
    const [productTitle, setProductTitle] = useState<string | null>(null);

    useEffect(() => {
        const fetchProductTitle = async () => {
            if (pathname.startsWith("/products/")) {
                const id = pathname.split("/").pop();
                const { data: prod } = await supabase
                    .from("products")
                    .select("title")
                    .eq("id", id)
                    .single();
                
                if (prod) {
                    setProductTitle(prod.title);
                }
            }
        };

        fetchProductTitle();
    }, [pathname])
    
    return (
        <Breadcrumb >
          <BreadcrumbList>
              <BreadcrumbItem>
                <Link href='/'>Home</Link>
              </BreadcrumbItem>
              {pathname === "/" && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis className="h-5 w-5"/>
                </>
              )}
              {pathname === "/about-us" && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href="/about-us">Sobre Nosotros</Link>
                    </BreadcrumbItem>
                </>
              )}
                {pathname === "/contact-us" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/contact-us">Contacto</Link>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname === "/news" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/news">Novedades</Link>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname === "/register" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href="/register">Registro</Link>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname.startsWith("/products/") && productTitle && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <Link href={pathname}>{productTitle}</Link>
                        </BreadcrumbItem>
                    </>
                )}
          </BreadcrumbList>
        </Breadcrumb>
    )
}