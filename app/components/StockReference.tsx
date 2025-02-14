

export const StockReference = () => {
    const classname = 'text-md bg-gradient-to-br text-zinc-800 w-fit px-3 py-3 rounded-full shadow-md'
    return (
        <div className="flex items-center gap-5 text-zinc-500 font-semibold">
            <div className="flex items-center gap-3">
                <h1 className="text-xl text-zinc-900">Stock</h1>
                <div className="w-12 h-[1px] bg-zinc-300"></div>
            </div>
            <div className="flex items-center gap-3">
                <p className={`${classname} from-green-300 to-green-600`}></p>
                <p>30 o mas</p>
            </div>
            <div className="flex items-center gap-3 border-x border-x-zinc-300 px-5">
                <p className={`${classname} from-yellow-300 to-yellow-600`}></p>
                <p>29 - 5</p>
            </div>
            <div className="flex items-center gap-3">
                <p className={`${classname} from-red-300 to-red-600`}></p>
                <p>4 - 0</p>
            </div>
        </div>
    )
}