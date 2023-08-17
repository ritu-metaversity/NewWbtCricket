import React, { useEffect, useState } from "react";
import "./UpperBanner.css";
import Slider from "react-slick";
import { authServices } from "../utils/api/auth/services";

const UpperBanner = () => {
    const [bannerimgs, SetBannerImgs] = useState();

    useEffect(() => {
        const handleradiobtn = async () => {

            const { response } = await authServices.HOMEPAGEBANNERLISTDATA({
                "type": 1
            });
            if (response) {
                console.log(response, "fsfsdfdsaf")
                SetBannerImgs(response)
            }
        }
        handleradiobtn()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000
    };
    return (



        <>

            <Slider {...settings}>
                {bannerimgs?.data?.length &&
                    bannerimgs?.data?.map((res) => {
                        // console.log(res, "dsfdsg");
                        return (
                            <div>
                                <img src={res?.path} alt="" className="bannerImage" />
                            </div>
                        );
                    })}
            </Slider>
        </>
    )
}

export default UpperBanner