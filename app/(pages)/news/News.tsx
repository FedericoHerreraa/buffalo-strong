import { TitleSection } from "@/app/components/reusable/titleSection"

export const NewsComponent = () => {
    return (
        <div className="flex flex-col h-[100vh] items-center mt-10">
            <TitleSection title="Noticias" description="Enterate de las ultimas noticias" color="from-amber-700 to-zinc-700" colorDescription="text-zinc-600"/>
        </div>
    )
}