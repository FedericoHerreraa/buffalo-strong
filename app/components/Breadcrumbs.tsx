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
import { categories } from "../info/info";

export const BreadCrumbs = () => {
    const pathname = usePathname()
    const [productTitle, setProductTitle] = useState<string | null>(null);
    const [categoryTitle, setCategoryTitle] = useState<string | null>(null);

    const isProductDetail = pathname.startsWith("/products/detail");
    
    useEffect(() => {
        let categoryId: string | undefined;
        
        if (isProductDetail) {
            const pathParts = pathname.split("/");
            categoryId = pathParts[pathParts.length - 2];
        } else {
            categoryId = pathname.split("/").pop();
        }

        const cat = categories.find(cat => cat.keyValue === categoryId)?.title;
        setCategoryTitle(cat ?? null);
    }, [pathname, isProductDetail]);

    useEffect(() => {
        const fetchProductTitle = async () => {
            if (isProductDetail) {
                const id = pathname.split("/").pop();
                const { data: prod } = await supabase
                    .from("products")
                    .select("title")
                    .eq("id", id)
                    .single();
                
                if (prod) {
                    setProductTitle(prod.title);
                }
            } else {
                setProductTitle(null);
            }
        };

        fetchProductTitle();
    }, [pathname, isProductDetail]);
    
    return (
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <Link href='/' className="hover:underline">Home</Link>
              </BreadcrumbItem>

              {pathname === "/" && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis className="h-5 w-5"/>
                </>
              )}

              {["/about-us", "/contact-us", "/news", "/register", "/admin-dashboard"].includes(pathname) && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href={pathname}>
                            {pathname === "/about-us" && "Sobre Nosotros"}
                            {pathname === "/contact-us" && "Contacto"}
                            {pathname === "/news" && "Novedades"}
                            {pathname === "/register" && "Registro"}
                            {pathname === "/admin-dashboard" && "Dashboard"}
                        </Link>
                    </BreadcrumbItem>
                </>
              )}

              {/* Categoría */}
              {categoryTitle && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href={`/products/${categoryTitle}`}>{categoryTitle}</Link>
                    </BreadcrumbItem>
                </>
              )}

              {/* Producto */}
              {isProductDetail && productTitle && (
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