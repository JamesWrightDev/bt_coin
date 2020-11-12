import React from 'react'

export default function PriceComparison(props) {
    const { prices } = props;

    return (
        <div className="mx-auto p-3 flex flex-wrap justify-center">
            {
                prices && (
                    Object.keys(prices).map(currency => {
                        return (
                            <div key={currency} className="p-2 m-1 border rounded text-center w-full md:w-3/12 ">
                                <h2 className="">{`${currency}`}</h2>
                                <p>{`${prices[currency].symbol} ${prices[currency].buy}`}</p>
                            </div>
                        )
                    })
                )
            }
        </div>
    )
}
