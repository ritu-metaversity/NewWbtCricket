import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Bet from "../../components/InPlayDetails/Bet";
import BetRecord from "../../components/InPlayDetails/BetRecord";
import { useSearchParams } from "react-router-dom";
const InPlayDetails = () => {
  const [eventId, setEventId] = useState(0);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const eventId = searchParams.get("event-id");
    if (eventId && Number(eventId)) setEventId(Number(eventId));
    return () => {
      setEventId(0);
    };
  }, [searchParams]);

  if (!eventId) {
    return <div>Invalid Url</div>;
  }

  return (
    <Box>
      <Bet event={eventId} />
      <BetRecord item={eventId} />
    </Box>
  );
};

export default InPlayDetails;
