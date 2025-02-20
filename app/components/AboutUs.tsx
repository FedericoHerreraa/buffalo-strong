import { Timeline } from "./Timeline"



export const AboutUsComponent = () => {
    return (
        <div className="flex flex-col h-[100vh] items-center mt-10">
            <h1 className="text-4xl mb-3">Sobre Nosotros.</h1>
            <p className="text-zinc-600">En esta pagina nos vas a conocer un poco mas.</p>
            <Timeline/>
        </div>
    )
}