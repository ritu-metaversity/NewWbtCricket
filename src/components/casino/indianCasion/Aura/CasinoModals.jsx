import React, { useEffect, useState } from "react";

// import { psotbetsingleusevalue } from "../../App/Features/auth/authActions";
import "./casionmodal.css"
import cassionimg from "./casino.png"
import axios from "axios";
const CasinoModals = (type) => {
    console.log(type?.type, ("type"));
    const [singleUserValue, setSingleUserValue] = useState()
    const [casionValue, setCasionValue] = useState()
    let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

    // const { psotbetsingleusevalueData } = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.post(
            `${REACT_APP_API_URL}/api/getOneUserBetResult`, {},
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },

            }
        ).then((res) => {
            setCasionValue(res?.data?.data[type?.type])
            console.log(res?.data?.data[type?.type], "sdfsdfsdfsd");
        })
    }, [])

    return (
        <>
            <div className="main_casino_modals">

                <div className="casino_message">
                    <img src={cassionimg} alt="" className="casion_alt_popup" />
                    <p className="please_note">Please Note</p>
                    <p className="points">(1 Points = ₹{casionValue})</p>
                    <div className="casino_dis">
                        <p>
                            <span>For Example:</span> If you place ₹100 your bet will be ₹
                            {100 * casionValue} Win or Loss according to the above
                            calculation.
                        </p>
                        <p>
                            यदि आप ₹100 लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹ {100 * casionValue} होगी।
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CasinoModals;









