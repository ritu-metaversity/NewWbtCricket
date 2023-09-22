import { useNavigate } from "react-router-dom";

export const FantasyGamedata = [
    {
        name: "Aviator",
        logo: "https://sitethemedata.com/casino_icons/fantasy/aviator.png",
        filterType: "SPB",
    },
    {
        name: "Relex",
        logo: "https://cf-cdn.relax-gaming.com/static/img/logo.svg",
        filterType: "RLX",
    },
    {
        name: "Thunder Kick",
        logo: "https://www.thunderkick.com/wp-content/uploads/2021/04/thunderkick-logo-horizontal-white.svg",
        filterType: "TK",
    },
    {
        name: "Nolimit City",
        logo: "https://www.nolimitcity.com/img/site-img/nolimit-city.png",
        filterType: "NLC",
    },
];
const FantasyGameProvider = () => {
    const navigate = useNavigate();

    const handleChangeaa = (val: any) => {
        console.log(val);
        navigate("/Fantasy-Game-list", { state: val, })


    }
    return (
        <div className="main_wrap_live-casion">
            {FantasyGamedata.map((item: any) => (

                <div className="MainBtn_warp" style={{ border: "0.5px solid" }} onClick={() => handleChangeaa(item)}>
                    <img
                        className="complany-logo-warp"
                        src={item?.logo}
                        alt="" />
                    <span className="complany-name-wrap">{item?.name}</span>
                </div>
            ))
            }


        </div>
    )
}

export default FantasyGameProvider