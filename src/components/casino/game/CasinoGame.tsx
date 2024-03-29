import { Box, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import "./casinoGame.css";
import { useNavigate, useParams } from "react-router-dom";
import BacktoMenuButton from "../../BacktoMenuButton";

const CasinoGame = () => {
  const matches = useMediaQuery("(max-width: 580px)");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) {
      nav("/");
    }
  }, [id]);

  return (
    <>
      <BacktoMenuButton />
      <Box mt={{ lg: 5 }} height="calc(100vh - 110px)">
        {matches ? (
          <>
            <Box
              right={0}
              top={0}
              width={100}
              height={50}
              position="absolute"
              bgcolor="#0f2327"
            ></Box>
            <Box
              left={10}
              top={0}
              width={50}
              height={44}
              position="absolute"
              bgcolor="#0f2327"
            ></Box>
            <iframe
              src={`https://m.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              height="calc(100vh - 100px)"
              className="mobile_if"
              width="100%"
              title="mobile"
              allowFullScreen={true}
            ></iframe>
          </>
        ) : (
          <>
            {/* <Box
            right={5}
            top={95}
            width={340}
            height={70}
            position="absolute"
            bgcolor="#0f2327"
          ></Box> */}
            <iframe
              src={`https://d.fawk.app/#/splash-screen/${token}/9482?opentable=${id}`}
              className="desktop_if"
              width="100%"
              title="desktop"
            />
          </>
        )}
      </Box>
    </>
  );
};

export default CasinoGame;
