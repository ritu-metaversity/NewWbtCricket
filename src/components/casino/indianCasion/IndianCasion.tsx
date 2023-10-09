import React from 'react'
import { useNavigate } from 'react-router-dom';


const IndianCasion = () => {
    const navigate = useNavigate();

    let gamesName = [
        {
            name: "Super nowa",
            url: "https://supernovagamesstudios.com/wp-content/uploads/2021/06/suxnova.png",
            filterType: "SP-NOWA"
        },
        {
            name: "Aura",
            url: "https://auragaming.org/images/supercleanaura%20white.png?crc=7159781",
            filterType: "AURA"
        }]

    const handleChangeaa = (val: any) => {
        console.log(val, "adcnlkscaksdn");
        if (val?.filterType === "SP-NOWA") {
            navigate("/SuperNowa_casion")
        } else {
            navigate("/casino")

        }


    }

    return (

        <div className="main_wrap_live-casion">
            {gamesName.map((item: any) => (

                <div className="MainBtn_warp" style={{ border: "0.5px solid" }}
                    onClick={() => handleChangeaa(item)}
                >
                    <img
                        className="complany-logo-warp"
                        src={item?.url}
                        alt="" />
                    <span className="complany-name-wrap">{item?.name}</span>
                </div>
            ))
            }


        </div>

    )
}

export default IndianCasion