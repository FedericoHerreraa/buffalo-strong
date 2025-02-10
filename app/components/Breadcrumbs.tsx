'use client'

import { usePathname } from "next/navigation"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbEllipsis
} from "@/app/components/ui/breadcrumb"

export const BreadCrumbs = () => {
    const pahtname = usePathname()
    
    return (
        <Breadcrumb>
          <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              {pahtname === "/" && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbEllipsis />
                </>
              )}
              {pahtname === "/about-us" && (
                <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/about-us">Sobre Nosotros</BreadcrumbLink>
                    </BreadcrumbItem>
                </>
              )}
                {pahtname === "/contact-us" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/contact-us">Contacto</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {pahtname === "/news" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/news">Novedades</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
                {pahtname === "/register" && (
                    <>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/register">Registro</BreadcrumbLink>
                        </BreadcrumbItem>
                    </>
                )}
          </BreadcrumbList>
        </Breadcrumb>
    )
}