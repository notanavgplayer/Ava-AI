import React from 'react'
import Image from 'next/image'
const page = () => {
    return (
      <Image
        src={
          "https://replicate.delivery/pbxt/h1JS7qLUJDJdBtVemt7k3oEkp4meHH6V6E4J9CKyUsSq9hXSA/out-0.png"
        }
            alt="Picture of the author"
            width={500}
            height={500}
            
      />
    );
}

export default page