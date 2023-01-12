const Tag = ({ name, bgColor, textColor }: { name: string; bgColor: string; textColor: string }) => {


    return (
        <div className={`bg-[${bgColor}] px-2 py-1 rounded-full`}><span className={`text-[${textColor}] text-[0.8rem]`}>{name}</span></div>
    )
}


export default Tag