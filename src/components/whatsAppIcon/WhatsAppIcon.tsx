/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import './whatsAppIcon.css'
import axios from "axios";

interface FooterImageData {
    s_whatsapp?: {
      link: string;
     
    };
  }

const WhatsAppIcon = () => {
  const [footerImage, setFooterImage] = useState<FooterImageData>({});
  let REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    let appUrll = window.location.hostname.replace("www.", "");
    // let appUrll = "localhost";
    axios
      .post(
        `${REACT_APP_API_URL}/api/admin/getData`,
        { appUrl: appUrll }
      )
      .then((res) => {
        setFooterImage(res?.data?.data);
      });
  }, []);


  
  return (
    <div>
      <a
        href={footerImage?.s_whatsapp?.link != null ? footerImage?.s_whatsapp?.link:"#"}
        className="whatsapp-fixed"
        >
        <div className="whatsapp-text">
          <span>Get an ID Instantly on Whatsapp</span>{" "}
          <span>Click Here Now</span>
        </div>
        <img alt="whatsapp" src="/whatsapp_img.png" />
      </a>
    </div>
  );
};

export default WhatsAppIcon;

