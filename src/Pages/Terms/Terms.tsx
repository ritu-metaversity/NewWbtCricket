import { Box, Button, List, ListItem } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  TermsContainer,
  TermsContinueButton,
  TermsFooter,
  TermsHeader,
  TermsListContainer,
} from "../../components/Terms/styledComponents";
import WelcomeDialog from "../../components/Terms/WelcomeDialog";

const TermsList = [
  "लोगिन करने के बाद अपना पासवर्ड बदल लें।",
  " प्रत्येक गेम के लिए 100/- Coins चार्ज और टेस्ट गेम में प्रतिदिन 100/- coins चार्ज रहेगा।",
  "गेम रद्द होने या टाई होने पर मैच के सभी सौदे रद्द माने जायेंगे और जो सेशन पुरे हो चुके हे, उनके हिसाब से ही Coins कम या ज्यादा होंगे।",
  "मैच के दौरान भाव को देख व समझ के ही सौदा करे। किये गए किसी भी सौदे को हटाया या बदला नहीं जाएगा। सभी सौदे के लिए स्वयं आप ही जिम्मेदार होंगे।",
  "मैच या सेशन भाव गलत चलने पर जो भी मैच या सेशन के सौदे हुए हे वह स्वतः हट जायेंगे।",
  "मैच में जो सेशन कम्पलीट होंगे सिर्फ उनके हिसाब से कॉइन कम या ज्यादा होंगे और जो सेशन कम्पलीट नहीं हुए है बो सारे सेशन रद्द हो जाएंगे|",
  "अगर कोई सेशन रनिंग मै चल रहा है और टीम जीत जाती है या आलआउट हो जाती है तो सेशन डिक्लेअर होगा।",
  "मैच मैं ओवर कम होने पर एडवांस सेसन फैंसी कैंसल हो जाएंगी|",
  "मैच में ओवर कम होने पर अगर सेम टीम दुबारा खेलने के लिए आती है तो जो रनिंग में प्लेयर के रन और पार्टनरशीप डिक्लेयर होगी। अगर ओवर कम होने पर दूसरी टीम खेलने के लिए आती है तो जो रनिंग में प्लेयर रन, पार्टनरशीप रद्द हो जाएंगे",
  "प्लेयर के रिटायर्ड हर्ट या इंजर्ड होने पर प्लेयर के रन डिक्लेअर किये जायेंगे|",
  "सेशन को डिक्लेअर और कैंसिल करने के लिए कंपनी का निर्णय अन्तिम होगा| ऐसी स्थिति में किसी भी तरह का वाद-विवाद मान्य नहीं होगा|",
  " टेस्ट में पारी डिक्लेअर होने पर जो सेशन रनिंग में हे उस सेशन को डिक्लेअर करने के लिए दूसरी टीम के ओवर या बॉल काउंट किये जायेंगे|",
  "नोट : सर्वर या वेबसाईट में किसी तरह की खराबी आने या बंद हो जाने पर केवल किये गए सौदे ही मान्य होंगे। ऐसी स्थिति में किसी भी तरह का वाद-विवाद मान्य नहीं होगा।",
];
const Terms = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/", { replace: true });
  };
  return (
    <>
      <TermsContainer>
        <TermsHeader>Terms & Conditions</TermsHeader>
        <TermsListContainer textAlign={"left"}>
          <ol>
            {TermsList.map((term, index) => (
              <li key={`terms-${index}`}>{term}</li>
            ))}
          </ol>
        </TermsListContainer>
        <TermsFooter>
          <TermsContinueButton
            onClick={handleClick}
            variant="contained"
            sx={{ bgcolor: "#FF471A" }}
          >
            <b>CONTINUE</b>
          </TermsContinueButton>
        </TermsFooter>
      </TermsContainer>

      <WelcomeDialog />
    </>
  );
};

export default Terms;
