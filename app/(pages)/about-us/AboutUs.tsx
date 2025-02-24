import { Timeline } from "./Timeline"
import { TitleSection } from "@/app/components/reusable/titleSection";


export const AboutUsComponent = () => {
    return (
        <div className="flex flex-col min-h-[100vh] w-full items-center py-6 bg-[#271c04]">
            <TitleSection title="Sobre Nosotros" description="En esta pagina nos vas a conocer un poco mas" color="from-[#e6b993] via-[#94684a] to-[#6e482d]" colorDescription="text-zinc-300"/>
            <Timeline/>
        </div>
    )
}