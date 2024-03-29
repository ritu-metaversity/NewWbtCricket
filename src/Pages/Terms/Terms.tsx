import Layout from "antd/es/layout/layout";
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TermsContainer,
  TermsContinueButton,
  TermsFooter,
  TermsHeader,
  TermsListContainer,
} from "../../components/Terms/styledComponents";
import WelcomeDialog from "../../components/Terms/WelcomeDialog";
import "./Term.css";
import { Box, Modal } from "@mui/material";

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
interface Props {
  show: boolean | null;
  setShow: Dispatch<SetStateAction<boolean | null>>
}
const Terms = () => {
  // const Terms: FC<Props> = ({ show, setShow }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/", { replace: true });
  };
  // const [show, setShow] = useState(false)
  useEffect(() => {
    // setShow(true)
  }, [])

  return (
    <>
      <div className="main-div">
        {/* <WelcomeDialog /> */}
        {/* <Modal
          open={!!show}
          onClose={() => setShow(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="maindatatashow">
            <div className="mainheader-popup">
              <h6 className="maintitle" style={{ color: "#fff" }}>Welcome to {window.location.hostname.replace('www.','')}</h6>
              <button type="button" className="closecross" aria-label="Close" onClick={() => setShow(false)} style={{ cursor: "pointer" }}>
                <span >×</span>
              </button>
            </div>
            <div className="custom-body" >
              <span className="namehead"> प्रिय ग्राहक,</span>
              <span className="namehead_data">
                {" "}
                आपसे अनुरोध है हमारी कोई डुप्लीकेट साइट नही है हमारी आधिकारिक साइट
                <b>{window.location.hostname.replace("www.", "")} </b>से लॉगिन करें। लॉगइन करने से पहले साइट
                का नाम जरूर देख लें। आपके समर्थन के लिए धन्यवाद। टीम <b> {window.location.hostname.replace("www.", "")}</b>
              </span>
              <span className="namehead2">Dear Client,</span>
              <span className="namehead_data2">
                {" "}
                We don't have any duplicate site , You are requested to login with our
                official site <b>{window.location.hostname.replace("www.", "")} </b>I only. Please check the
                site name before you login. Thanks for your support.<b>{window.location.hostname.replace("www.", "")}</b>
              </span>
            </div>
            <div className="modal-footer" >
              <button type="button" className="cancelbtn" onClick={() => setShow(false)} style={{ cursor: "pointer" }}>
                Cancel
              </button>
            </div>
          </div>

        </Modal> */}
        {/* <div className="lang-switch-btn" style={{ paddingLeft: "0px", paddingRight: "0px" }}> */}
        <div className="main_menu_btn" style={{ textAlign: "center", marginBottom: "-17px" }}>
          <Link className="btn rules-btn" id="create_bets" to="/">
            MAIN MENU
          </Link>
        </div>

        <div className="term-and-condition" >
          <h1 style={{ textAlign: "center" }}>
            {/* <span style={{ fontSize: 20 }}>
              <em style={{ boxSizing: "border-box" }}>
                <strong>
                  <a
                    style={{ backgroundColor: "rgb(132, 179, 50)" }}
                    className="btn btn-secondary btn-lg" href="#">
                    <span style={{ color: "#fff" }}>Hindi</span>
                  </a>
                </strong>
              </em>
            </span> */}
            <span style={{ color: "#000000" }}> </span>
            <span style={{ fontSize: 20 }}>
              <em>
                <strong>
                  <a
                    style={{ backgroundColor: "rgb(255, 145, 31)" }}
                    className="btn btn-secondary btn-lg"
                    href="#english-rules-btns"
                    id="hindi-rules-btns"
                  >
                    <span style={{ color: "#fff" }}>English</span>
                  </a>
                </strong>
              </em>
            </span>
          </h1>
          {/* <div id="hindi-rules">
            <h1 >
              <span style={{ color: "#000000" }}>
                <span style={{ fontSize: 20 }}>
                  <em>
                    <strong>
                      कृपया नियमों को समझने के लिए यहां कुछ मिनट दें, और अपने अनुसार समझ
                      लें |
                    </strong>
                  </em>
                </span>
              </span>
            </h1>
            <h2>
              <span style={{ color: "#000000" }}>
                <strong>
                  &nbsp;<em>NOTE-</em>
                </strong>
              </span>
            </h2>

            <ul>
              <li>
                <span style={{ color: "#000000" }}>
                  <strong>
                    1. सभी डीलर्स से निवेदन है कि क्लाइंट्स को साइट&nbsp;के
                    रूल्स समझाने के बाद ही सौदे करवायें।
                  </strong>
                </span>
              </li>



              <li>
                <span style={{ color: "#000000" }}>
                  <strong>
                    2. अगर आप इस एग्रीमेंट को ऐक्सेप्ट नहीं करते हे तो कोई सौदा
                    नहीं कीजिये।
                  </strong>
                </span>
              </li>

              <li>
                <span style={{ color: "#000000" }}>
                  <strong>
                    3&nbsp; सर्वर या वेबसाइट में किसी तरह की खराबी आने या बंद हो
                    जाने पर केवल किए गए सौदे ही मान्य होंगे | ऐसी स्तिथि में
                    किसी तरह का वाद-विवाद मान्य नहीं होगा
                  </strong>
                </span>
              </li>
            </ul>



          </div>
          <h1>
            <span style={{ color: "#000000" }}>
              <em>
                <strong>&nbsp;BOOKMAKER</strong>
              </em>
            </span>
          </h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी कारण से किसी भी टीम को फायदा होगा या नुकसान, इसमें
                          हमारी कोई जवाबदारी नहीं है&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          कंपनी के पास किसी भी आईडी/बेटस को हटाने&nbsp;/शून्य करने का
                          अधिकार&nbsp;है, यदि वह अमान्य&nbsp;पाया जाता है। उदाहरण के लिए
                          vpn/robot-use/एक ही IP से एक से अधिक बेटस&nbsp;एक ही समय में
                          एक से अधिक दांव (पंचिंग) और अन्य के मामले में। नोट: केवल जीतने
                          वाली बेट ही रद्द कर दी जाएगी।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          रिजल्ट या सेशन&nbsp; के बारे में किसी भी प्रश्न के लिए रिजल्ट
                          &nbsp;के 4 दिनों के भीतर संपर्क किया जाना चाहिए, इसे इवेंट के
                          4&nbsp;दिनों के बाद मान्य नहीं माना जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यदि दो टीमों के अंक समान होते हैं, तो रिजल्ट पॉइंट टेबल के
                          आधार पर दिया जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी स्थिति में अगर वीडियो बाधित/बंद हो जाता है तो किसी
                          तकनीकी समस्या के कारण इसे जारी नहीं रखा जा सकता है बुकमेकर
                          बाजार को रद्द कर दिया जाएग
                        </strong>
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <h1>
            <span style={{ color: "#000000" }}>
              <strong>
                <em>
                  &nbsp;CASINO<span style={{ fontSize: 28 }}>&nbsp;RULES&nbsp;</span>
                </em>
              </strong>
            </span>
          </h1>
          <table>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1. यदि किसी कैसिनो गेम में किसी टेक्निकल इशू की वजह से रिजल्ट
                          नहीं डलता है तो उस गेम के क्लाइंट को कॉइन वापिस कर दिए
                          जायेंगे, ऐसी स्थिति मे कोई वाद विवाद मान्य नहीं होगा
                        </strong>
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <h2>
            <span style={{ color: "#000000" }}>
              <strong>
                &nbsp; &nbsp;<em>FANCY RULES&nbsp;</em>
              </strong>
            </span>
          </h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1. मैच टाई होने पर सभी फैंसी बेटस&nbsp;मान्य होंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2. टॉस या खराब&nbsp;मौसम की स्थिति से पहले सभी एडवांस फैंसीयां
                          ससपेंड&nbsp;कर दी जाएंगी।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3&nbsp; टेक्निकल एरर &nbsp;या किसी भी परिस्थिति में किसी भी
                          फैंसी को कैंसिल &nbsp;कर दिया जाता है और इवेंट फिर से शुरू
                          नहीं होता है,तो सभी पिछले दांव मान्य होंगे (हार/जीत के आधार
                          पर)।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4. यदि किसी मामले में गलत रेट फैंसी में दी गई है तो उस फैंसी
                          बेटस &nbsp;को रद्द कर दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          5.किसी भी परिस्थिति में सभी एक्सचेंज में मैनेजमेंट का निर्णय
                          अंतिम होगा। ऑनलाइन पोर्टल में कोई बेमेल होने पर हमारा
                          स्कोरकार्ड मान्य माना जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          6. यदि ग्राहक गलत तरीके से बेट लगाता है तो हम डिलीट करने के
                          लिए उत्तरदायी नहीं होंगे, कोई बदलाव नहीं किया जाएगा और बेट को
                          कन्फर्म बेट माना जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          7. किसी टेक्निकल एरर के कारण मार्किट खुला है और रिजल्ट आ गया
                          है रिजल्ट &nbsp;के बाद भी सभी&nbsp;गलत&nbsp; दांव हटा दिए
                          जाएंग। इसमें कोई वाद विवाद मान्य नहीं होगा।।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          8. हमारे एक्सचेंज में मैनुअल बेट्स ( फ़ोन कॉल के द्वारा
                          )&nbsp;स्वीकार नहीं किए जाते हैं
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          9. हमारा एक्सचेंज हमारे टीवी में 5 सेकंड की देरी प्रदान करेगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          10. कंपनी के पास किसी भी आईडी/बेट को अमान्य&nbsp; पाए जाने पर
                          ससपेंड/शून्य करने का अधिकार सुरक्षित है। उदाहरण के लिए
                          vpn/robot-use/एक ही IP से कई एंट्री/एक ही समय में कई बेट
                          (पंचिंग) और अन्य के मामले में। नोट: केवल जीतने वाली बेट को
                          रद्द कर दिया जाएगा, उदाहरण के लिए: यदि हमें किसी भी आईडी से
                          ऐसी प्रविष्टियां (ऊपर उल्लिखित) मिलती हैं और उनकी बेट हैं
                          (200000 6 ओवर सेशन में 40 की दर से और 200000 48 की दर से वापस)
                          और वास्तविक स्कोर 38 है, 40 ले की बेट रद्द कर दी जाएगी और 48
                          बैक की बेट मान्य&nbsp;मानी जाएगी।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          11. कंपनी मैच के किसी भी बिंदु पर किसी भी फैंसी के किसी भी
                          बेटस (केवल जीतने वाले दांव) को रद्द करने का अधिकार&nbsp;रखती
                          है यदि कंपनी का मानना ​​​​है कि खिलाड़ियों (या तो
                          बल्लेबाज/गेंदबाज) द्वारा उस फैंसी&nbsp; में कोई धोखा/गलत किया
                          जा रहा है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          12. एक बार जब हमारा एक्सचेंज यूजरनेम और पासवर्ड दे देता है तो
                          पासवर्ड बदलने की जिम्मेदारी आपकी होती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>13. पेनल्टी रन किसी भी तरह से नहीं गिने जाएंगे।</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          14. किसी भी गलत &nbsp;गतिविधियों का पता चलने पर &nbsp;यूजर
                          आईडी ब्लॉक कर दिया जाएगा, इस संबंध में कोई प्रश्न स्वीकार नहीं
                          किया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          15. क्लाइंट आईडी के दुरुपयोग के लिए हमारा एक्सचेंज जिम्मेदार
                          नहीं है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          16.नो बॉल के मामले में, गलत बेटस हटा दिए जाएंगे, तो अंतिम
                          निर्णय मैनेजमेंट का होगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          17.मैच अबॉण्डेड या खराब मौसम होने पर जो सेशन, पार्टनरशिप और
                          खिलाडी रनिंग में है &nbsp;या खिलाडी रिटायर हुआ है वो रनिंग
                          सौदे केंसल नहीं होंगे । और जो सेशन कम्पलीट है &nbsp;उनके हिसाब
                          से कोइन्स कम या ज्यादा होंगे। और रिजल्ट आने पे जो खिलाडी जहा
                          है &nbsp;वो वही माने जायेंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h1>
                        <span style={{ fontSize: 20 }}>
                          <span style={{ color: "#000000" }}>
                            <strong>BOWLER RUN FANCY</strong>
                          </span>
                        </span>
                      </h1>
                    </li>

                    <li>
                      <strong>
                        फैंसी में केवल टोटल बॉलर दुवारा दिए गए रन ही मान्य होंगे।
                        &nbsp;टीम के लेग बाई&nbsp; और बाई&nbsp; बॉलर फैंसी में ऐड नहीं
                        किये जायँगे&nbsp;
                      </strong>
                    </li>

                    <li>
                      <strong>
                        ओनली ओवर रन फैंसी में टोटल उस ओवर में दिए गए रन मान्य होंगे
                        जिसमे एक्स्ट्रास और बैट्समैन दुवारा बनाये गए रन मन्ये
                        होंगे&nbsp;
                      </strong>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        &nbsp; &nbsp;
                        <strong>
                          <em>
                            <big> TEST RULES</big>&nbsp;
                          </em>
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>1.1 एडवांस सेशन&nbsp;टेस्ट में मान्य है</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1.2 घोषित पारी या ऑल आउट के कारण मध्य सेशन और सेशन पूरा नहीं
                          हुआ है, इसलिए विशेष ओवर को पूरा माना जाता है और शेष ओवर को
                          अगली टीम पारी में गिना जाता है: - घोषित पारी या ऑल आउट के
                          मामले में 131.5वें ओवर में 132 ओवर माना जाता है मध्य सेशन में
                          133 के लिए बचे हुए 1 ओवर को पूरा किया गया और अगली टीम की पारी
                          से 135 ओवर के सेशन के लिए 3 ओवर गिने गए और एक ओवर का सेशन
                          घोषित किया गया और पारी घोषित होने के कारण केवल ओवर का सेशन
                          पूरा नहीं हुआ, ताकि सेशन के विशेष दांव को हटा दिया जाएगा और
                          सभी पर विचार किया जाएगा पूर्व के लिए मान्य:- 131.5वें ओवर में
                          घोषित पारी के मामले में 132 ओवर हटा दिए जाएंगे और यदि ऑल आउट
                          हुए तो 132 ओवर और केवल 132 ओवर ही मान्य होंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1.6 टेस्ट मैच दोनों इनिंग&nbsp;में एडवांस फैंसी&nbsp;मान्य
                          हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>2 टेस्ट लंबी/इनिंग रन:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2.2 यदि मौसम की स्थिति के कारण मैच रोक दिया गया है तो सभी लंबी
                          फैंसी&nbsp;को हटा दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2.3 टेस्ट में लंबी पारी/इनिंग रन दोनों एडवांस सेशन&nbsp; मान्य
                          हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>3 टेस्ट बल्लेबाज :-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.1 बल्लेबाज के चोटिल होने की स्थिति में अगर बल्लेबाज 34 रन पर
                          है तो फाइनल रिजल्ट में 34 रन ही दिए जायँगे&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.2 बल्लेबाज 50/100 रन पर&nbsp;अगर बल्लेबाज घायल हो जाता है
                          रिजल्ट उसके रन पर दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.3 अगले बैट्समैन आउट फैंसी&nbsp;में&nbsp;अगर खिलाड़ी घायल हो
                          जाता है तो एडवांस फैंसी&nbsp; को हटा दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.4 एडवांस फैंसी&nbsp;में ओपनिंग बैट्समैन ही मान्य है यदि वही
                          बैट्समैन ओपनिंग में आए तो फैंसी मान्य होगा यदि एक बैट्समैन को
                          बदल दिया जाता है तो उस एडवांस फैंसी को हटा दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.5 टेस्ट मैच में दोनों एडवांस बैट्समैन फैन्सी मान्य हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>4 टेस्ट पार्टनरशिप:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.1 पार्टनरशिप में एक बल्लेबाज घायल होता है तो अगले बल्लेबाज
                          के साथ पार्टनरशिप जारी रहती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.2 मौसम की स्थिति के कारण पार्टनरशिप और खिलाड़ी चलता है या
                          मैच रद्द कर दिया जाता है, फाइनल रिजल्ट स्कोर के अनुसार दिया
                          जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.3 दोनों खिलाड़ियों के अलग या समान होने की स्थिति में
                          पार्टनरशिप मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.4 टेस्ट मैच में दोनों एडवांस फैंसी पार्टनरशिप मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <em>
                            <strong>5 अन्य एडवांस फैंसी&nbsp; (TEST):-</strong>
                          </em>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          5.1 चार, छक्के, वाइड, विकेट, अतिरिक्त रन, कुल रन, उच्चतम ओवर
                          और शीर्ष बल्लेबाज तभी मान्य होते हैं जब 300 ओवर खेले गए हों या
                          मैच किसी भी टीम द्वारा जीता गया हो अन्यथा इन सभी फैंसी को हटा
                          दिया जाएगा। इसके अतिरिक्त सभी इवेंट्स केवल पहली पारी के लिए
                          मान्य हैं (यह सभी व्यक्तिगत टीम इवेंट्स पर भी लागू होता है)
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h1>
                        <span style={{ color: "#000000" }}>
                          <em>2 ODI&nbsp;नियम:-</em>
                        </span>
                      </h1>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          मैच का पहला ओवर रन एडवांस फैंसी केवल पहली पारी के रन गिने
                          जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बारिश या मैच रद्द होने की स्थिति में कम्प्लीट फैंसी मान्य
                          है,इन्कम्प्लीट फैंसी हटा दि&nbsp;जाएंगे।।और जो
                          पार्टनरशिप,फॉलऑफ़ विकेट,और खिलाडी रनिंग में है उनका फाइनल
                          रिजल्ट उनके रनो पर ही दिया जायगा&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उदाहरण के लिए: - 35 ओवर रन टीम ए किसी भी मामले में खेल रही है,
                          टीम ए 33 ओवर में ऑल-आउट हो गई है, टीम ए ने 150 रन बना लिए हैं,
                          फैंसी फाइनल रिजल्ट&nbsp;उस रन पर मान्य किया जाता है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>एडवांस फैंसी&nbsp; केवल पहली पारी में मान्य है।</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          50 ओवर पूरा नहीं होने की स्थिति में मौसम या किसी भी स्थिति के
                          कारण, सभी बेट हटा दिए जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>एडवांस 50 ओवर रन केवल पहली पारी में मान्य है।</strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>वनडे बल्लेबाज रन </strong>:-
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बल्लेबाज के चोटिल होने की स्थिति में अगर बल्लेबाज 34 रन पर है
                          तो फाइनल रिजल्ट में 34 रन ही दिए जायँगे&nbsp;।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          अगले बैट्समैन आउट फैंसी&nbsp;में&nbsp;अगर खिलाड़ी घायल हो जाता
                          है तो एडवांस फैंसी&nbsp; को हटा दिया जाएगा।&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          एडवांस फैंसी&nbsp;में ओपनिंग बैट्समैन ही मान्य है यदि वही
                          बैट्समैन ओपनिंग में आए तो फैंसी मान्य होगा|&nbsp;यदि एक
                          बैट्समैन को बदल दिया जाता है तो उस एडवांस फैंसी को हटा दिया
                          जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पार्टनरशिप में एक बल्लेबाज घायल होता है तो अगले बल्लेबाज की
                          पार्टनरशिप जारी रहती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          दोनों खिलाड़ियों के अलग या समान होने की स्थिति में एडवांस
                          सेशन&nbsp;पार्टनरशिप मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          दोनों टीम&nbsp;की एडवांस पार्टनरशिप&nbsp;मैच में मान्य हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>Extra Sessions :-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          चार, छक्के, वाइड, विकेट, अतिरिक्त रन, कुल रन, उच्चतम ओवर,
                          शीर्ष बल्लेबाज, मेडेन ओवर, कैच आउट, नो बॉल, रन आउट, अर्धशतक और
                          शतक मान्य&nbsp; हैं केवल बारिश के कारण मैच पूरा हो गया
                          है&nbsp;ओवर कम कर दिया गया है तो अन्य सभी फैंसी हटा दिए
                          जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>T20 SESSION-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          मैच का पहला ओवर रन एडवांस फैंसी केवल पहली पारी के रन गिने
                          जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बारिश या मैच रद्द होने की स्थिति में कम्प्लीट फैंसी मान्य
                          है,इन्कम्प्लीट फैंसी हटा दि&nbsp;जाएंगे।।और जो
                          पार्टनरशिप,फॉलऑफ़ विकेट,और खिलाडी रनिंग में है उनका फाइनल
                          रिजल्ट उनके रनो पर ही दिया जायगा&nbsp;।।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उदाहरण के लिए: - 35 ओवर रन टीम ए किसी भी मामले में खेल रही है,
                          टीम ए 33 ओवर में ऑल-आउट हो गई है, टीम ए ने 150 रन बना लिए हैं,
                          फैंसी फाइनल रिजल्ट&nbsp;उस रन पर मान्य किया जाता है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>एडवांस फैंसी&nbsp; केवल पहली पारी में मान्य है।</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          एडवांस 20 ओवर रन केवल पहली पारी में मान्य है। 20 ओवर का रन
                          मान्य&nbsp;नहीं माना जाएगा यदि 20 ओवर किसी भी स्थिति में पूरा
                          नहीं होता है
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>टी20 बल्लेबाज रन :-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बल्लेबाज के चोटिल होने की स्थिति में अगर बल्लेबाज 34 रन पर है
                          तो फाइनल रिजल्ट में 34 रन ही दिए जायँगे&nbsp;।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          अगले बैट्समैन आउट फैंसी&nbsp;में&nbsp;अगर खिलाड़ी घायल हो जाता
                          है तो एडवांस फैंसी&nbsp; को हटा दिया जाएगा।&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          एडवांस में ओपनिंग बैट्समैन ही मान्य&nbsp;है अगर वही बैट्समैन
                          ओपनिंग में आए तो फैंसला मान्य होगा यदि एक बैट्समैन को बदल दिया
                          जाता है तो उस विशेष खिलाड़ी को हटा दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पार्टनरशिप&nbsp;में एक बल्लेबाज घायल होता है तो अगले बल्लेबाज
                          की पार्टनरशिप&nbsp;जारी रहती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          दोनों खिलाड़ियों के अलग या समान होने की स्थिति में
                          पार्टनरशिप&nbsp;मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          दोनों टीम एडवांस पार्टनरशिप&nbsp;मैच में मान्य हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          एडवांस SESSION&nbsp;केवल पहली पारी में मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          अगर बारिश या मौसम की स्थिति के कारण ओवर कम हो जाता है या मैच
                          रद्द हो जाता है तो फाइनल रिजल्ट स्कोर के अनुसार दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <em>
                            <strong>EXTRA FANCY&nbsp;</strong>:-
                          </em>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          टी-20, वन डे और टेस्ट मैच में अगर मौजूदा पारी खिलाड़ी और
                          पार्टनरशिप मैच के बीच में चल रही हो तो उसे रद्द कर दिया जाता
                          है या छोड़ दिया जाता है उस स्थिति में सभी मौजूदा खिलाड़ी और
                          साझेदारी के फाइनल रिजल्ट मान्य होते हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          चौका, छक्का, वाइड, विकेट, अतिरिक्त रन, कुल रन, उच्चतम ओवर और
                          शीर्ष बल्लेबाज, मेडेन ओवर, कैच आउट, नो बॉल, रन आउट, अर्धशतक और
                          शतक मान्य&nbsp;हैं केवल बारिश के कारण मैच पूरा हो गया है ओवर
                          कम कर दिया गया है अन्य सभी फैंसी हटा दिए जाएंगे।{" "}
                        </strong>
                      </span>
                    </li>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पहली 6 ओवर डॉट बॉल और 20 ओवर डॉट बॉल फैंसी केवल पहली पारी ही
                          मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी टीम की गेंदों पर पहला विकेट गंवाने का मतलब है कि किसी
                          भी टीम का पहला विकेट कितनी गेंदों में गिर जाता है, कम से कम
                          न्यूनतम एक गेंद खेली जानी चाहिए अन्यथा बेट हटा दी जाएगी।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी टीम का पहला विकेट FALL&nbsp;दोनों पारियों में मान्य
                          है&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी टीम ने 50 रन के लिए कितनी गेंदों का मतलब है कि किसी भी
                          टीम ने 50 रन हासिल किए हैं, उस विशेष गेंद को कितनी गेंदों में
                          कम से कम एक गेंद खेलनी होगी अन्यथा वह फैंसी दांव हटा दिया
                          जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          50 रन के लिए कितनी गेंदों पर किसी भी टीम को केवल पहली पारी ही
                          मान्य होती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पहली 6 इनिंग बाउंड्री रन किसी भी टीम के फैन्स की गिनती केवल रन
                          बनाए गए चौकों और छक्कों के हिसाब से की जाएगी, कम से कम 6 ओवर
                          खेले जाने चाहिए अन्यथा वह फ़ैन्सी हटा दी जाएगी।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पहली पारी में 6 ओवर की बाउंड्री किसी भी टीम के रन जैसे वाइड,
                          नो-बॉल, लेग-बाय, बाई और ओवर थ्रो के रन इस फैंसी में नहीं गिने
                          जाते हैं।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी बल्लेबाज का सामना कितनी गेंदों से होता है मतलब कि कोई
                          भी बल्लेबाज कितनी गेंदों का खेलता है उस&nbsp;में कम से कम एक
                          गेंद खेलनी होती है अन्यथा वह फैंसी दांव हटा दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          किसी भी बल्लेबाज द्वारा कितनी गेंदों का सामना करना दोनों
                          पारियों में मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          सबसे कम स्कोरिंग ओवर को तभी मान्य&nbsp;माना जाएगा जब ओवर पूरी
                          तरह से पूरा हो गया हो (सभी छह गेंदें फेंकी जानी हैं
                        </strong>
                        )
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <em>
                            <strong>टेस्ट में कनकशन</strong>:
                          </em>
                          -
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          सेशन अधूरा होने की स्थिति में, एक ओवर सेशन के सभी बेट्स हटा
                          दिए जाएंगे। उदाहरण के लिए पारी की घोषणा या मैच खराब रोशनी या
                          किसी अन्य स्थिति में ससपेंड&nbsp;।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1. सभी बेट्स को मान्य&nbsp;माना जाएगा यदि किसी खिलाड़ी को
                          कनकशन सब्स्टीट्यूट के तहत बदल दिया गया है, रिजल्ट&nbsp;
                          उल्लिखित खिलाड़ी द्वारा बनाए गए रनों के लिए दिया जाएगा। उदाहरण
                          के लिए डीएम ब्रावो 23 रन पर रिटायर्ड हर्ट हो जाते हैं, तो
                          रिजल्ट&nbsp;23 के लिए दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2. कनकशन सब्स्टीट्यूट के तहत दोनों खिलाड़ियों के दांव मान्य
                          होंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>
                            <em>Total Match- Events (test):-</em>
                          </strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पूरे टेस्ट मैच में कम से कम 300 ओवर फेंके जाने चाहिए, अन्यथा
                          विशेष इवेंट से संबंधित सभी बेट्स अमान्य हो जाएंगे। उदाहरण के
                          लिए, कैच आउट का टोटल मैच केवल तभी मान्य&nbsp;होगा जब किसी
                          विशेष टेस्ट मैच में 300 ओवर फेंके गए हों
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>Limited over events-Test:</strong>
                          <em>
                            <strong>: </strong>
                          </em>
                          -
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          इस इवेंट को केवल तभी मान्य&nbsp;माना जाएगा जब विशेष इवेंट पर
                          परिभाषित ओवरों की संख्या फेंकी गई हो, अन्यथा इस इवेंट से
                          संबंधित सभी दांव शून्य हो जाएंगे। उदाहरण के लिए 0-25 ओवर की
                          घटनाएँ तभी मान्य होंगी जब 25 ओवर फेंके गए हों, अन्यथा उसे
                          मान्य&nbsp;नहीं माना जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यदि टीम किसी भी परिभाषित ओवर से पहले ऑल आउट हो जाती है, तो शेष
                          ओवरों को अगली पारी में गिना जाएगा। उदाहरण के लिए यदि टीम 23.1
                          ओवर में ऑल आउट हो जाती है तो उसे 24 ओवर माना जाएगा और शेष ओवर
                          अगली पारी से गिने जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>बॉलर विकेट इवेंट्स- टेस्ट:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          कम से कम एक&nbsp;ओवर (एक पूर्ण ओवर) &nbsp;गेंदबाज द्वारा फेंका
                          जाना चाहिए, अन्यथा उसे मान्य&nbsp;नहीं माना जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>बॉलर ओवर इवेंट्स- टेस्ट:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उल्लिखित गेंदबाज को निर्धारित ओवरों की संख्या को पूरा करना
                          होगा, अन्यथा उस विशेष इवेंट से संबंधित दांव शून्य हो जाएंगे।
                          उदाहरण के लिए यदि उल्लिखित गेंदबाज ने 8 ओवर फेंके हैं, तो उस
                          विशेष गेंदबाज के 5 ओवर के रन को मान्य&nbsp;माना जाएगा और 10
                          ओवर के रन को अमान्य कर दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>प्लेयर बॉल इवेंट्स- टेस्ट:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          इस इवेंट को तभी मान्य माना जाएगा जब उल्लिखित खिलाड़ी द्वारा
                          बनाए गए रनों की परिभाषित संख्या, अन्यथा रिजल्ट&nbsp; 0 (शून्य)
                          गेंदों के रूप में माना जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उदाहरण के लिए यदि रूट 60 गेंदों में 20 रन बनाता है और 22 रन पर
                          आउट हो जाता है, तो 20 रन का रिजल्ट&nbsp;60 गेंदों का होगा और
                          25 रन के लिए आवश्यक गेंदों का रिजल्ट&nbsp;0 (शून्य) माना जाएगा
                          और वही दिया जाएगा नतीजा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>लिमिटेड ओवर इवेंट-वनडे:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          इस इवेंट&nbsp;को केवल तभी मान्य&nbsp;माना जाएगा जब विशेष इवेंट
                          पर परिभाषित ओवरों की संख्या फेंकी गई हो, अन्यथा इस इवेंट से
                          संबंधित सभी दांव शून्य हो जाएंगे। 0-50 ओवर की घटनाएँ केवल 50
                          ओवर पूरे होने पर ही मान्य होंगी, यदि पहले बल्लेबाजी करने वाली
                          टीम 50 ओवर से पहले ऑल आउट हो जाती है तो शेष ओवर की गणना दूसरी
                          पारी से की जाएगी। उदाहरण के लिए यदि पहले बल्लेबाजी करने वाली
                          टीम 35 ओवरों में ऑल आउट हो जाती है तो शेष 15 ओवर दूसरी पारी से
                          गिने जाएंगे, यदि टीम निर्धारित ओवरों की संख्या से पहले ऑल आउट
                          हो जाती है तो यह सभी घटनाओं पर लागू होता है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यदि मैच में किसी भी स्थिति में ओवर कम हो जाता है, तो अधूरी
                          रहने वाली इवेंट को रद्द कर दिया जाएगा, उदाहरण के लिए यदि बारिश
                          / खराब रोशनी के कारण 15 ओवरों में मैच बाधित हो जाता है और इस
                          ओवर को कम कर दिया जाता है। 0-10 के लिए इवेंट मान्य होंगे, इस
                          प्रकार से संबंधित अन्य सभी इवेंट हटा दिए जाएंगे।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यह ईवेंट तभी मान्य होगा जब ओवर की परिभाषित संख्या पूरी हो गई
                          हो। उदाहरण के लिए पहले बल्लेबाजी करने वाली टीम 29.4 ओवर में ऑल
                          आउट हो जाती है तो उसे 30 ओवर माना जाएगा, बाद में बल्लेबाजी
                          करने वाली टीम को 20 ओवर पूरे करने होंगे तभी 0-50 ओवर को मान्य
                          माना जाएगा। यदि दूसरी बल्लेबाजी करने वाली टीम 19.4 ओवर में ऑल
                          आउट हो जाती है तो 0-50 ओवर की इवेंट को मान्य नहीं माना जाएगा,
                          यह केवल पहली पारी के लिए मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>बॉलर इवेंट- ODI:-</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उल्लिखित गेंदबाज को निर्धारित ओवरों की संख्या को पूरा करना
                          होगा, अन्यथा उस विशेष इवेंट से संबंधित दांव शून्य हो जाएंगे।
                          उदाहरण के लिए यदि उल्लिखित गेंदबाज ने 8 ओवर फेंके हैं, तो उस
                          विशेष गेंदबाज के 5 ओवर के रन को मान्य&nbsp;माना जाएगा और 10
                          ओवर के रन को अमान्य कर दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>दोनों पारियां मान्य&nbsp; हैं</strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>अन्य इवेंट - टी20</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1-10 ओवर और 11-20 ओवर की इवेंट को तभी मान्य माना जाएगा जब
                          उल्लिखित ओवर की संख्या पूरी तरह से खेली गई हो। हालाँकि यदि
                          किसी विशेष इवेंट से पहले ओवर कम हो जाता है तो वह अमान्य हो
                          जाएगा, यदि पहले बल्लेबाजी करने वाली टीम 20 ओवर से पहले ऑल आउट
                          हो जाती है तो शेष ओवर की गणना दूसरी पारी से की जाएगी। उदाहरण
                          के लिए यदि पहले बल्लेबाजी करने वाली टीम 17 ओवर में ऑल आउट हो
                          जाती है तो शेष 3 ओवर दूसरी पारी से गिने जाएंगे और सभी घटनाओं
                          के 3 ओवर गिने जाएंगे। यह केवल पहली पारी के लिए मान्य है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यदि किसी रनिंग इवेंट के बीच ओवर कम हो जाता है, तो उसे
                          मान्य&nbsp;माना जाएगा और बाकी को रद्द कर दिया जाएगा। उदाहरण के
                          लिए.., मैच शुरू हुआ और बारिश/खराब रोशनी या किसी अन्य स्थिति के
                          कारण मैच 4 ओवर में बाधित हो गया और बाद में ओवर कम हो गया। फिर
                          1-10 के लिए इवेंट मान्य हैं बाकी सभी रद्द कर दिए जाएंगे
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बॉलर सेशन: बॉलर सेशन एडवांस इवेंट केवल पहली इनिंग के लिए
                          मान्य। यह इवेंट तभी मान्य होती है जब गेंदबाज ने अपने ओवरों का
                          अधिकतम कोटा पूरा कर लिया हो, अन्यथा उसे रद्द कर दिया जाएगा।
                          हालाँकि यदि मैच का रिजल्ट&nbsp;आ गया है और उस गेंदबाज ने पहले
                          ही अपना अंतिम ओवर फेंकना शुरू कर दिया है तो रिजल्ट&nbsp;दिया
                          जाएगा भले ही उसने ओवर पूरा नहीं किया हो। उदाहरण के लिए बी
                          कुमार अपना अंतिम ओवर फेंक रहे हैं और 3.4 पर मैच का
                          रिजल्ट&nbsp;आया है तो रिजल्ट&nbsp;बी कुमार के ओवर रन के लिए
                          दिया जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          डीएलएस के मामले में, ओवर कम हो गया तो जिस गेंदबाज ने पहले से
                          ही उस रिजल्ट&nbsp;का अपना अधिकतम कोटा डाला है, उसे
                          मान्य&nbsp;माना जाएगा और बाकी को रद्द कर दिया जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>डॉट बॉल इवेंट:</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>केवल कोई रन नहीं होने पर डॉट बॉल मानी जाएगी।</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          अगर विकेट का मतलब है कि डॉट बॉल नहीं गिना जाएगा।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          फ्री हिट पर बाउंड्री हिट को ही मान्य&nbsp;माना जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          उल्लिखित मैच में कोई फ्री हिट नहीं होने पर बेट्स को हटा दिया
                          जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>बल्ले से बाउंड्री मान्य मानी जाएगी</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>चार और छह दोनों मान्य हैं</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बल्लेबाज की बैट बाउंड्री को ही मान्य&nbsp; माना जाता है
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>फ्री हिट सीमाएं भी मान्य हैं</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          यदि उस &nbsp;गेंद को पूरा नहीं किया जाता है तो बेट्स को रद्द
                          कर दिया जाएगा
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          रिजल्ट&nbsp; 0 या 4 (नहीं या हां) दिया जाएगा। उदाहरण के लिए
                          बल्लेबाज &nbsp;गेंद पर चौका मारने का मतलब रिजल्ट&nbsp;0 है
                          अन्यथा रिजल्ट&nbsp;4 है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>बिग बैश में पावर सर्ज नियम</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पावर प्ले पहले चार ओवर + पावर सर्ज दो ओवर-बल्लेबाज पसंद
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          बल्लेबाजी पक्ष चुनता है कि पावर सर्ज के साथ कब&nbsp;करना है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          पारी की शुरुआत में अभी भी चार ओवर का पावर प्ले है, लेकिन अब
                          बल्लेबाजी करने वाली टीम 11वें ओवर के बाद से किसी भी समय अन्य
                          दो पावर सर्ज ओवर ले सकती है।
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          रिजल्ट&nbsp;या दर के बारे में किसी भी प्रश्न के लिए इवेंट से
                          4&nbsp;दिनों के भीतर संपर्क करना होगा, इवेंट से 4&nbsp;दिनों
                          के बाद&nbsp;को मान्य&nbsp;नहीं माना जाएगा
                        </strong>
                      </span>
                    </li>
                  </ul>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                  <p>&nbsp;</p>
                </td>
              </tr>
            </tbody>
          </table> */}
          <h1 style={{ textAlign: "center" }}>
            {/* <span style={{ fontSize: 20 }}>
              <em>
                <strong>
                  <a
                    style={{ backgroundColor: "rgb(132, 179, 50)" }}
                    className="btn btn-secondary btn-lg"
                    href="#hindi-rules-btns"
                    id="english-rules-btns"
                  >
                    <span style={{ color: "#fff" }}>Hindi</span>
                  </a>
                </strong>
              </em>
            </span> */}
          </h1>
          <ul>
            <li>
              <h1>
                <span style={{ color: "#000000" }}>
                  <strong>Bookmaker</strong>
                </span>
              </h1>
            </li>
          </ul>
          <table>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Due to any reason any team will be getting advantage or
                          disadvantage we are not concerned.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Company reserves the right to suspend/void any id/bets if the
                          same is found to be illegitimate. For example incase of
                          vpn/robot-use/multiple entry from same IP/ multiple bets at
                          the same time (Punching) and others. Note : only winning bets
                          will be voided.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Any query about the result or rates should be contacted within
                          4&nbsp;days of the specific event, the same will not be
                          considered valid post 4&nbsp;days from the event.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          If two team ends up with equal points, then result will be
                          given based on the official point table
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          At any situation if the video gets interrupted/stopped then
                          the same cannot be continued due to any technical issues
                          bookmaker market will be voided
                        </strong>
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <p>&nbsp;</p>
          <ul>
            <li>
              <h2>
                <span style={{ color: "#000000" }}>
                  <em>
                    <strong>Fancy</strong>
                  </em>
                </span>
              </h2>
            </li>
          </ul>
          <table>
            <tbody>
              <tr>
                <td>
                  <ul>
                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1. All fancy bets will be validated when match has been tied.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2. All advance fancy will be suspended before toss or weather
                          condition.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3. In case technical error or any circumstances any fancy is
                          suspended and does not resume result will be given all
                          previous bets will be valid (based on haar/jeet).
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4. If any case wrong rate has been given in fancy that
                          particular bets will be cancelled.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          5. In any circumstances management decision will be final
                          related to all exchange items. Our scorecard will be
                          considered as valid if there is any mismatch in online portal
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          6. In case customer make bets in wrong fancy we are not liable
                          to delete, no changes will be made and bets will be consider
                          as confirm bet.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          7. Due to any technical error market is open and result has
                          came all bets after result will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          8. Manual bets(via phone call) are not accepted in our
                          exchange
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          9.Our exchange will provide 5 second delay in our tv.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          10. Company reserves the right to suspend/void any id/bets if
                          the same is found to be illegitimate. For example incase of
                          vpn/robot-use/multiple entry from same IP/ multiple bets at
                          same time (Punching) and others. Note : only winning bets will
                          be voided, For example: If we find such entries (above
                          mentioned) from any id and their bets are (200000 lay in a 6
                          over session for the rate 40 and 200000 back for the rate of
                          48) and the actual score is 38, bets of 40 lay will be voided
                          and the bets for 48 back will be considered valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          11. Company reserves the right to void any bets (only winning
                          bets) of any event at any point of the match if the company
                          believes there is any cheating/wrong doing in that particular
                          event by the players (either batsman/bowler)
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          12. Once our exchange give username and password it is your
                          responsibility to change a password.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          13. Penalty runs will not be counted in any fancy.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          14.Traders will be block the user ID if find any misinterpret
                          activities, No queries accept regarding.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          15. Our exchange is not responsible for misuse of client
                          id.&nbsp;&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          16.in case of NO BALL, wrong bets will be delete, the final
                          decision will be management.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          17.In case of match abandoned or bad weather, the running
                          partnership and player runs or player retired will not be
                          cancelled. And according to the session which is complete, the
                          coins will be more or less. And the players who are where they
                          are after the result it will be considered.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h1>
                        <span style={{ fontSize: 20 }}>
                          <span style={{ color: "#000000" }}>
                            <strong>BOWLER RUN FANCY</strong>
                          </span>
                        </span>
                      </h1>
                    </li>

                    <li>
                      <strong>
                        In fancy total runs scored by the bowler will be valid. Extra
                        runs of the team will not be added to the bowler's fancy
                      </strong>
                    </li>

                    <li>
                      <strong>
                        only over run fancy, the total runs scored in that over will be
                        valid, in which the extras and runs scored by the batsmen will
                        be counted.
                      </strong>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <em>Test</em>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>1.1 Complete session valid in test.</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1.2 Middle session and Session is not completed due to Innings
                          declared or all out so that particular over considered as
                          completed and remaining over counted in next team Innings for
                          ex:- In case of Innings declared or all out In 131.5th over
                          Considered as 132 over completed remaining 1 over counted for
                          133 over middle session and 3 over counted for 135 over
                          session from next team Innings and One over session and Only
                          over session is not completed due to innings declared so that
                          Particular over session bets will be deleted and all out
                          considered as valid for ex:- In case of Innings declared In
                          131.5th over so 132 over will be deleted and if all out then
                          132 over and Only 132 over will be Valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1.3&nbsp;Test match both advance session is valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>2 Test lambi/ Inning run:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2.2 In case due to weather situation match has been stopped
                          all lambi trades will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2.3 In test both lambi paari / inning run is valid in advance
                          fancy.&nbsp;
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>3 Test batsman:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.1 In case batsmen is injured he/she is made 34 runs the
                          result will be given 34 runs.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.2 Batsman 50/100 run if batsman is injured or declaration
                          the result will be given on particular run.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.3 In next men out fancy if player is injured particular
                          fancy will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.4 In advance fancy opening batsmen is only valid if same
                          batsmen came in opening the fancy will be valid in case one
                          batsmen is changed that particular player fancy will be
                          deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          3.5 Test match both advance fancy batsmen run is valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>4 Test partnership:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.1 In partnership one batsman is injured partnership is
                          continued in next batsman.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.2 Partnership and player runs due to weather condition or
                          match abandoned the result will be given as per score.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.3 Advance partnership is valid in case both players are
                          different or same.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          4.4 Test match both advance fancy partnership is valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>5 Other fancy advance (test):-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          5.1 Four, sixes, wide, wicket, extra run, total run, highest
                          over and top batsmen is valid only if 300 overs has been
                          played or the match has been won by any team otherwise all
                          these fancy will be deleted. Additionally all events are valid
                          only for 1st innings( this is applicable to all individual
                          team events also)
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>2 Odi rule:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Match 1st over run advance fancy only 1st innings run will be
                          counted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Complete session is valid in case due to rain or match
                          abandoned particular session will be deleted.And those who are
                          in partnership, fall off wicket, and player running, their
                          final result will be given on their runs
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          For example:- 35 over run team a is playing any case team A is
                          all-out in 33 over team a has made 150 run the session result
                          is validated on particular run.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Advance session is valid in only 1st innings.</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In case 50 over is not completed all bet will be deleted due
                          to weather or any condition.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Advance 50 over runs is valid in only 1st innings.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In case batsman is injured he/she is made 34 runs the result
                          will be given 34 runs.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In next men out fancy if player is injured particular fancy
                          will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In advance fancy opening batsmen is only valid if same batsmen
                          came in opening the fancy will be valid in case one batsmen is
                          changed that particular player fancy will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Odi partnership runs:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In partnership one batsman is injured partnership is continued
                          in next batsman.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Advance partnership is valid in case both players are
                          different or same.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Both team advance partnerships are valid in particular match.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>Other fancy:-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Four, sixes, wide, wicket, extra run, total run, highest over
                          ,top batsman,maiden over,caught-out,no-ball,run-out,fifty and
                          century are valid only match has been completed in case due to
                          rain over has been reduced all other fancy will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>T20 Session:--</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Match 1st over run advance fancy only 1st innings run will be
                          counted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Complete session is valid in case due to rain or match
                          abandoned particular session will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          For example :- 15 over run team a is playing any case team a
                          is all-out in 13 over team A has made 100 run the session
                          result is validated on particular run.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Advance session is valid in only 1st innings.</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Advance 20 over run is valid only in 1st innings. 20 over run
                          will not be considered as valid if 20 overs is not completed
                          due to any situation
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>T20 batsman runs:-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In case batsman is injured he/she is made 34 runs the result
                          will be given 34 runs.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In next men out fancy if player is injured particular fancy
                          will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In advance fancy opening batsmen is only valid if same batsmen
                          came in opening the fancy will be valid in case one batsmen is
                          changed that particular player fancy will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>T20 partnership runs:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          In partnership one batsman is injured partnership is continued
                          in next batsman.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Advance partnership is valid in case both players are
                          different or same.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Both team advance partnerships are valid in particular match.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Advance event is valid in only 1st Innings.</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          If over reduced due to rain or weather condition or match
                          abandoned the result will be given as per score.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>Other fancy:-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          T-20 ,one day and test match in case current innings player
                          and partnership are running in between match has been called
                          off or abandoned that situation all current player and
                          partnership results are valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Four, sixes, wide, wicket, extra run, total run, highest over
                          and top batsman,maiden over,caught-out,no-ball,run-out,fifty
                          and century are valid only match has been completed in case
                          due to rain over has been reduced all other fancy will be
                          deleted. 1st 6 over dot ball and 20 over dot ball fancy only
                          valid is 1st innings.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1st wicket lost to any team balls meaning that any team 1st
                          wicket fall down in how many balls that particular fancy at
                          least minimum one ball have to be played otherwise bets will
                          be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1st wicket lost to any team fancy valid both innings.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          How many balls for 50 runs any team meaning that any team
                          achieved 50 runs in how many balls that particular fancy at
                          least one ball have to be played otherwise that fancy bets
                          will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          How many balls for 50 runs fancy any team only first inning
                          valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1st 6 inning boundaries runs any team fancy will be counting
                          only according to run scored fours and sixes at least 6 over
                          must be played otherwise that fancy will be deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1st inning 6 over boundaries runs any team run like wide
                          ,no-ball ,leg-byes ,byes and over throw runs are not counted
                          this fancy.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          How many balls face any batsman meaning that any batsman how
                          many balls he/she played that particular fancy at least one
                          ball have to be played otherwise that fancy bets will be
                          deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          How many balls face by any batsman both innings valid.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Lowest scoring over will be considered valid only if the over
                          is completed fully (all six deliveries has to be bowled)
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h2>
                        <span style={{ color: "#000000" }}>
                          <strong>Concussion in Test:-</strong>
                        </span>
                      </h2>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          All bets of one over session will be deleted in test scenario,
                          in case session is incomplete. For example innings declared or
                          match suspended to bad light or any other conditions.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          1. All bets will be considered as valid if a player has been
                          replaced under concussion substitute, result will be given for
                          the runs scored by the mentioned player. For example DM Bravo
                          gets retired hurt at 23 runs, then result will be given for
                          23.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          2. Bets of both the player will be valid under concussion
                          substitute.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>
                            <em>Total Match- Events (test):-</em>
                          </strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Minimum of 300 overs to be bowled in the entire test match,
                          otherwise all bets related to the particular event will get
                          void. For example, Total match caught outs will be valid only
                          if 300 overs been bowled in the particular test match
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Limited over events-Test:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          This event will be considered valid only if the number of
                          overs defined on the particular event has been bowled,
                          otherwise all bets related to this event will get void. For
                          example 0-25 over events will be valid only if 25 overs has
                          been bowled, else the same will not be considered as valid
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          If the team gets all out prior to any of the defined overs,
                          then balance overs will be counted in next innings. For
                          example if the team gets all out in 23.1 over the same will be
                          considered as 24 overs and the balance overs will be counted
                          from next innings.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Bowler Wicket event's- Test:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Minimum of one legal over (one complete over) has to be bowled
                          by the bowler mentioned in the event, else the same will not
                          be considered as valid
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Bowler over events- Test:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          The mentioned bowler has to complete the defined number of
                          overs, else the bets related to that particular event will get
                          void. For example if the mentioned bowler has bowled 8 overs,
                          then 5 over run of that particular bowler will be considered
                          as valid and the 10 over run will get void
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Player ball event's- Test:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          This event will be considered valid only if the defined number
                          of runs made by the mentioned player, else the result will be
                          considered as 0 (zero) balls
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          For example if Root makes 20 runs in 60 balls and gets out on
                          22 runs, result for 20 runs will be 60 balls and the result
                          for balls required for 25 run Root will be considered as 0
                          (Zero) and the same will be given as result
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Limited over events-ODI:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          This event will be considered valid only if the number of
                          overs defined on the particular event has been bowled,
                          otherwise all bets related to this event will get void. 0-50
                          over events will be valid only if 50 over completed, if the
                          team batting first get all out prior to 50 over the balance
                          over will be counted from second innings. For example if team
                          batting first gets all out in 35 over balance 15 over will be
                          counted from second innings, the same applies for all events
                          if team gets all out before the defined number of overs
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          The events which remains incomplete will be voided if over
                          gets reduced in the match due to any situation, for example if
                          match interrupted in 15 overs due to rain/badlight and post
                          this over gets reduced. Events for 0-10 will be valid, all
                          other events related to this type will get deleted.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          This events will be valid only if the defined number of over
                          is completed. For example team batting first gets all out in
                          29.4 over then the same will be considered as 30 over, the
                          team batting second must complete 20 overs only then 0-50 over
                          events will be considered as valid. In case team batting
                          second gets all out in 19.4 over then 0-50 over event will not
                          be considered as valid, This same is valid for 1st Innings
                          only.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Bowler event- ODI:-</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          The mentioned bowler has to complete the defined number of
                          overs, else the bets related to that particular event will get
                          void. For example if the mentioned bowler has bowled 8 overs,
                          then 5 over run of that particular bowler will be considered
                          as valid and the 10 over run will get void
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Both innings are valid</strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Other event:- T20</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          The events for 1-10 over and 11-20 over will be considered
                          valid only if the number of over mentioned has been played
                          completely. However if the over got reduced before the
                          particular event then the same will be voided, if the team
                          batting first get all out prior to 20 over the balance over
                          will be counted from second innings. For example if team
                          batting first gets all out in 17 over balance 3 over will be
                          counted from second innings and that 3 over all events are
                          counted. This same is valid for 1st Innings only.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          If over got reduced in between any running event, then the
                          same will be considered valid and the rest will be voided. For
                          example.., match started and due to rain/bad light or any
                          other situation match got interrupted at 4 over and later over
                          got reduced. Then events for 1-10 is valid rest all will be
                          voided
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Bowler Session: Bowler session advance events only valid for
                          1st inning. This event is valid only if the bowler has
                          completed his maximum quota of overs, else the same will be
                          voided. However if the match has resulted and the particular
                          bowler has already started bowling his final over then result
                          will be given even if he haven't completed the over. For
                          example B Kumar is bowling his final over and at 3.4 the match
                          has resulted then result will be given for B Kumar over runs
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Incase of DLS, the over got reduced then the bowler who has
                          already bowled his maximum quota of over that result will be
                          considered as valid and the rest will be voided
                        </strong>
                      </span>
                    </li>

                    <li>
                      <h3>
                        <span style={{ color: "#000000" }}>
                          <strong>Dot ball Event:</strong>
                        </span>
                      </h3>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Only No run will count as dot ball.</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          If wicket means that will not count as dot ball.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Both innings are valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Boundary hit on Free hit only be considered as valid
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Bets will be deleted if there is no Free hit in the mentioned
                          match
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Boundary by bat will be considered as valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Boundaries by Player</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Both Four and six are valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>No Boundaries Event:</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Both Four and Six are valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Batsman bat boundaries only considered as valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Free hit boundaries also valid</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Bets will be voided if that particular ball not completed
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Result will be Given 0 or 4 (No or Yes). For Example batsman
                          hit boundary in particular ball means Result is 0 otherwise
                          Result is 4.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>Power Surge Rule in Big Bash</strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Power Play First Four Overs + Power Surge Two Overs-Batters
                          Choice
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          The batting side chooses when to take control with the
                          addition of the Power Surge.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          There’s still a four-over power play at the start of the
                          innings, but now the batting team can take the other two Power
                          Surge overs any time from the 11th over onwards.
                        </strong>
                      </span>
                    </li>

                    <li>
                      <span style={{ color: "#000000" }}>
                        <strong>
                          Any query regarding result or rate has to be contacted within
                          4&nbsp;days from the event, query after 4&nbsp;days from the
                          event will not be considered as valid
                        </strong>
                      </span>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Terms;
