import { Timeline } from "./Timeline"
import { TitleSection } from "@/app/components/reusable/titleSection";


export const AboutUsComponent = () => {
    return (
        <div className="flex flex-col min-h-[100vh] items-center my-10">
            <TitleSection title="Sobre Nosotros" description="En esta pagina nos vas a conocer un poco mas"/>
            <Timeline/>
        </div>
    )
}