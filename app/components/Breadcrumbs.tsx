'use client'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabaseClient";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
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
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
                        <BreadcrumbLink href="/about-us">Sobre Nosotros</BreadcrumbLink>
                    </BreadcrumbItem>
                </>
              )}
                {pathname === "/contact-us" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/contact-us">Contacto</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname === "/news" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/news">Novedades</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname === "/register" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/register">Registro</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {pathname.startsWith("/products/") && productTitle && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={pathname}>{productTitle}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
          </BreadcrumbList>
        </Breadcrumb>
    )
}