import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const lotteryprovidersList = [
    {
        name: "BET GAMES",
        logo: "https://www.betgames.tv/api/uploads/BG_Logo_White_Horizontal_Lock_Up_dcca475d41.png",
        filterType: "BTV",
    },
    {
        name: "EVOLUTION",
        logo: "https://wver.sprintstaticdata.com/v14/static/front/img/icons/5.png",
        filterType: "EVO",
    },
    {
        name: "EVOPLAY",
        logo: "https://evoplay.games/wp-content/themes/evoplay/assets/img/logo.svg",
        filterType: "EVP",
    },
    {
        name: "GALAXSYS",
        logo: "https://galaxsys.co/wp-content/uploads/2022/02/Galaxsys.svg",
        filterType: "GLX",
    },
    {
        name: "PLAY GO",
        logo: "https://static.wixstatic.com/media/dad1c6_ef8a09e283c54aa9863a02228afb9852~mv2.png/v1/fill/w_272,h_74,al_c,q_95,enc_auto/playngo_logo_on_black.png",
        filterType: "PNG",
    },
    {
        name: "S4",
        logo: "https://media.licdn.com/dms/image/C4E0BAQGMnMvRWUcOsA/company-logo_200_200/0/1519900555706?e=1703116800&v=beta&t=ezkTp_NYg2wcB5L2JADuOxm2SyH77pKxl6aYnJ0Vuzs",
        filterType: "S4G",
    },
    {
        name: "SPEARHEAD",
        logo: "https://spearheadstudios.com/wp-content/themes/spearheadstudios/assets/img/logo.svg?v=1",
        filterType: "SHS",
    },
    {
        name: "SPRIBE",
        logo: "https://spribe.co/spribe-logo.b13289b5f5fab437.svg",
        filterType: "SPB",
    },
    {
        name: "TRIPLE",
        logo: "https://www.triple-pg.com/wp-content/uploads/2023/05/logo-wh.svg",
        filterType: "TPG",
    },
    {
        name: "KIRON",
        logo: "https://kironinteractive.com/wp-content/uploads/2022/03/Kiron-Logo-Flat-white.png",
        filterType: "KIR",
    },
    {
        name: "TURBO",
        logo: "https://turbogames.io/images/home/home-logo.png",
        filterType: "TRB",
    },
    // {
    //   logo: "https://wazdan.com/wp-content/themes/wazdan/assets/images/logo.svg",
    //   name: "WAZDAN",
    //   filterType: "WAZ",
    // },
];

const LotteryCasionProvider = () => {
    const navigate = useNavigate();

    const handleChangeaa = (val: any) => {
        console.log(val);
        navigate("/lottery-Game-list", { state: val, })


    }

    const token = localStorage.getItem("token");

    const [casionProviderData, setCasinoProviderData] = useState<any>()

    useEffect(() => {
        axios
            .post(
                "https://api.247idhub.com/api/qtech/provider", { gameType: "LOTTERY" },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response: any) => {
                setCasinoProviderData(response?.data?.data)
            })

    }, [])
    return (
        <div className="main_wrap_live-casion">
            {casionProviderData && casionProviderData.map((item: any) => (

                <div className="MainBtn_warp" style={{ border: "0.5px solid" }} onClick={() => handleChangeaa(item)}>
                    <img
                        className="complany-logo-warp"
                        src={item?.image}
                        alt="" />
                    <span className="complany-name-wrap">{item?.providerName}</span>
                </div>
            ))
            }


        </div>
    )
}

export default LotteryCasionProvider