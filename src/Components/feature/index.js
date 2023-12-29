import Link from 'next/link'
import React from 'react'

export default function Feature() {
  return (
<div className="flex flex-col justify-center items-center  ">
      <div
        className="flex w-full flex-col rounded-md bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px] max-w-[95%] xl:max-w-[800px] w-[95%]"
        style={{ backgroundImage: 'url("https://raw.githubusercontent.com/horizon-ui/horizon-tailwind-react-ts-corporate/main/src/assets/img/nfts/NftBanner1.png")' }}
      >
        <div className="w-full">
          <h4 className="mb-[14px] max-w-full text-xl font-bold text-white md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
            Dont ever hesitate to party
          </h4>
          <p className="mb-[40px] max-w-full text-base font-medium text-[#E3DAFF] md:w-[64%] lg-w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
            Enter this party world and get the latest party notification and event
          </p>
          <div className="mt-[36px] flex items-center justify-between gap-4 sm:justify-start 2xl:gap-10">
            <button className="text-black linear rounded-md bg-white px-4 py-2 text-center text-base font-medium transition duration-200 hover:!bg-white/80 active:!bg-white/70">
              <Link href={'/filterevent'}>
              
              Learn More
              </Link>
            </button>
            <button className="text-base font-medium text-lightPrimary hover:text-lightPrimary 2xl:ml-2">
            <Link href={'/listevent'}>

              List your event
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>  
    )
}
