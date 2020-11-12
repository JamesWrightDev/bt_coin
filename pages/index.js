import Head from 'next/head'
import react, { useEffect, useState } from 'react';
import blockChainApi from '../util/blockChainApi';
import PriceComparison from '../components/PriceComparison';
import ConvertFormContainer from '../components/ConvertFormContainer';

export default function Home() {
  const [prices, setPrices] = useState();

  useEffect(async () => {
      fetchPrices();
  }, [])


  const fetchPrices = async () => {
    try {
      const res = await blockChainApi.get('/ticker');
      setPrices(res.data);
    } catch (e) {
      console.log(e);
      // TODO Handle Error
    }
  }

  return (
    <>
      <Head>
        <title>Bit Converter</title>
      </Head>
      <main className="container px-3 mx-auto">
        {/* Comparison */}
        <PriceComparison
          prices={prices}
        />
        {/* ConversionForm */}
        <ConvertFormContainer 
          prices={prices}
        />
      </main>
    </>
  )
}
