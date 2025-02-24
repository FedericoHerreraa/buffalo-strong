
import { BsMusicNoteList } from "react-icons/bs";
import { BsMusicPlayerFill } from "react-icons/bs";
import { BsMusicNoteBeamed } from "react-icons/bs";

export const TitleSection = ({
    title,
    description,
    color,
    colorDescription
} : {
    title: string,
    description: string,
    color: string,
    colorDescription: string
}) => {
    return (
        <div className="flex justify-center items-center flex-col gap-3 pb-6">
            <div className={`flex items-center gap-3 ${colorDescription}`} >
                <BsMusicNoteList size={20} />
                <BsMusicPlayerFill size={20} />
                <BsMusicNoteBeamed size={20} />
            </div>
            <h1 className={`text-4xl font-semibold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
                {title}
            </h1>
            <p className={`${colorDescription}`}>{description}.</p>
        </div>
    )
}