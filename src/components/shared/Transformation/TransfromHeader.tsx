import React from 'react'

const TransfromHeader = ({title, subTitle}: {title: string, subTitle: string}) => {
    return (
        <>
        <h2 className='h2-bold text-slate-700'>{title}</h2>
        {subTitle && <p className="p-16-regular mt-4">{subTitle}</p>}
        </>
    )
}

export default TransfromHeader