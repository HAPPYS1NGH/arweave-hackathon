import Link from 'next/link'
import React from 'react'

function Paper(props) {
    return (
        <div className='flex justify-between gap-4' key={props.id}>
            <div className='flex flex-col'>
                <Link href={`/paper/${props.id}`}>{props.title}</Link>
                <p className='text-sm text-green-600'>{props.author}</p>
                {/* <p className='text-sm text-gray-600'>...{props.text}...</p> */}
            </div>
            <div>
                <Link
                    href={`https://arweave.net/${props.id}`}
                >
                    See PDF
                </Link>
            </div>
        </div>
    )
}

export default Paper