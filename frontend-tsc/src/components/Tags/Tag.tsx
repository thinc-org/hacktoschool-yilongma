const Tag = ({ name, bgColor, textColor }: { name: string; bgColor: string; textColor: string }) => {


    return (
        <>
            <div style={{backgroundColor: `${bgColor}`}} className={'px-2 py-1 rounded-full'}>
                <span style={{color: `${textColor}`}} className={'text-[0.8rem]'}>{name}</span>
            </div>
        </>
    )
}

export default Tag