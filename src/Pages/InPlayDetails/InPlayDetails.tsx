import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Bet from "../../components/InPlayDetails/Bet";
import BetRecord from "../../components/InPlayDetails/BetRecord";
import { useSearchParams } from "react-router-dom";
const InPlayDetails = () => {
  const [eventId, setEventId] = useState(0);
  const [sportsId, setSportsId] = useState(0);
  const [searchParams] = useSearchParams();
  console.log(searchParams, "searchParamssearchParams")
  useEffect(() => {
    const eventId = searchParams.get("event-id");
    if (eventId && Number(eventId)) setEventId(Number(eventId));
    return () => {
      setEventId(0);
    };
  }, [searchParams]);

  // console.log(sportsId, "sportsId")
  useEffect(() => {
    const sportsId = searchParams.get("Sports-id");
    if (sportsId && Number(sportsId)) setSportsId(Number(sportsId));
    return () => {
      setSportsId(0);
    };
  }, [searchParams]);

  if (!eventId) {
    return <div>Invalid Url</div>;
  }

  return (
    <Box>
      <Bet event={eventId} sportsId={sportsId} />
    
    </Box>
  );
};

export default InPlayDetails;
