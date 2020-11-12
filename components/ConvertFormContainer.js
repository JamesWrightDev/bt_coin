import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import blockChainApi from '../util/blockChainApi';

export default function ConvertFormContainer({ prices }) {
    const [result, setResult] = useState();
    const { register, handleSubmit, errors, formState } = useForm();
    const onSubmit = async (form) => {
        const res = await blockChainApi.get('/tobtc', {
            params: {
                currency: form.currency,
                value: form.baseValue,
            },
        })
        const { data } = res;
        setResult(data);
    }
    return (
        <div className="md:w-3/12 mx-auto">
            <form onSubmit={handleSubmit(onSubmit)} >
                <input
                    type="number"
                    name="baseValue"
                    ref={register( { required: true, min: 1 })}
                    className="appearance-none border border-black rounded w-full 
                        py-1 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                <div className="flex flex-col justify-between md:flex-row">
                    <select ref={register({ required: true })} className="my-3" name="currency">
                        {
                            prices && (
                                Object.keys(prices).map(currency => {
                                    return <option key={currency} value={currency}>{currency}</option>
                                })
                            )
                        }
                    </select>
                    <button className="my-3 bg-black hover:bg-blue-700 text-white 
                        font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Convert</button>
                </div>
            </form>
            {
                result && (
                    <span>{`${result} BTC`}</span>
                )
            }
            {errors.baseValue ? <p className="text-red-500">Please enter a number higher than 0</p> : null}
            {errors.currency ? <p className="text-red-500">Please Select a currency</p> : null}
        </div>
    )
}
