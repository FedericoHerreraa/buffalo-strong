


export const CustomSeparator = () => {
    return (
        <div className="flex flex-col gap-3 py-10">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="relative w-full h-[1px] bg-[#6F4E37] bg-opacity-60"
                    style={{
                        backgroundImage: "radial-gradient(circle, black 10%, transparent 20%)",
                        backgroundSize: "10px 10px",
                        backgroundRepeat: "repeat-x",
                    }}
                ></div>
            ))}
        </div>
    )
}