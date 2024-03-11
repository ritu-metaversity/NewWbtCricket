import React from 'react'
import './Fotter.css'

const Fotter = () => {
    return (
        <div><center>
            
            <div className="col">
                <img
                    height={25}
                    src="/ssl.png"
                    className="default-icon mt-4"
                    alt=""
                />
                <img
                    height={15}
                    src="/betfair.png"
                    className="default-icon mt-4"
                    alt=""
                />
                
                <img
                    height={15}
                    src="/plus.png"
                    className="default-icon mt-4"
                    alt=""
                />
                <img
                    height={20}
                    src="/18plus.png"
                    className="default-icon mt-4"
                    alt=""
                />
            </div>
        </center>
        <center>
  
  <div className="col">
    <img
      height={15}
      src="/gameling.png"
      className="default-icon mt-4"
      alt=""
    />
    <img
      height={15}
      src="/gamble.png"
      className="default-icon mt-4"
      alt=""
    />
    <img
      height={15}
      src="/safe.png"
      className="default-icon mt-4"
      alt=""
    />
  </div>
</center>

        </div>
    )
}

export default Fotter