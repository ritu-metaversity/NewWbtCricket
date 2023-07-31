import React, { useEffect, useState } from "react";

// import { psotbetsingleusevalue } from "../../App/Features/auth/authActions";
import "./casionmodal.css"
import cassionimg from "./casino.png"
const CasinoModals = () => {
    const [singleUserValue, setSingleUserValue] = useState()

    // const { psotbetsingleusevalueData } = useSelector((state) => state.auth);

    // console.log(psotbetsingleusevalueData, "kjhgfcvbhuytfv")
    useEffect(() => {
        // GameAPI.SINGLE_USER_VALUE().then((res) => {
        //     setSingleUserValue(res?.data?.value)
        // })
        // dispatch(psotbetsingleusevalue())
    }, [])
    return (
        <>
            <div className="main_casino_modals">
                <div className="casino_images_modals">
                    <img src={cassionimg} alt="" />
                </div>
                <div className="casino_message">
                    <p className="please_note">Please Note</p>
                    <p className="points">(1 Points = ₹1)</p>
                    <div className="casino_dis">
                        <p>
                            <span>For Example:</span> If you place ₹100 your bet will be ₹
                            {100 * 1} Win or Loss according to the above
                            calculation.
                        </p>
                        <p>
                            यदि आप ₹100 लगाते हैं तो उपरोक्त गणना के अनुसार आपकी शर्त जीत या हार ₹ {100 * 1} होगी।
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CasinoModals;









