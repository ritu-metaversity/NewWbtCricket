import React, { useContext, useEffect, useState } from "react";
import { LoaderContext } from "../../App";
import { sportServices } from "../../utils/api/sport/services";
import BackBtn from "./BackBtn/BackBtn";
import './matchData.css';
import { SummaryCardProps } from "../../components/Inplay/SummaryCard";
import { Link, useNavigate } from "react-router-dom";

interface InplayInterface {
  sportId: string;
  sportid: number;
  name: string;
  matchList: SummaryCardProps[]; // Assuming SummaryCardProps is imported
}

const Inplay = () => {
  const [activeEventList, setActiveEventList] = useState<InplayInterface[]>([]);
  const [matches, setMatch] = useState<InplayInterface[]>([]);
  const [gameIdForItemPage, setgameIdForItemPage] = useState(100);
  const { isSignedIn } = useContext(LoaderContext);


  const { loading, setLoading } = useContext(LoaderContext);

  const navigate = useNavigate()

  useEffect(() => {
    const getList = async (withLoading: boolean) => {
      withLoading && setLoading && setLoading((prev) => ({ ...prev, Inplay: true }));
      const { response } = await sportServices.inplay();
      if (response?.data) {
        setActiveEventList(response.data);
      }
      withLoading && setLoading && setLoading((prev) => ({ ...prev, Inplay: false }));
    };


    getList(true);


    const timer = setInterval(() => {
      getList(false);
    }, 60000);


    return () => clearInterval(timer);
  }, [setLoading]);
  const handleMatchId = (val: number) => {
    setgameIdForItemPage(val)
  }


  console.log(gameIdForItemPage, "gameIdForItemPage")

  return (
    <>
      <BackBtn />
      <div>
        <ul className='games-types'>
          <li className={gameIdForItemPage === 100 ?"active":""} onClick={() => handleMatchId(100)}>

            <img src='/all.png' alt="all" />

            All
          </li>
          {activeEventList?.map((item: InplayInterface) => {
            return (
              <li className={item?.sportid == gameIdForItemPage ? "active" : ""} key={item.sportId} onClick={() => handleMatchId(item?.sportid)}>

                <img src={`/${item?.name}.png`} alt={item?.name} />

                {item?.name}
              </li>
            )
          })}
        </ul>
      </div>
      {
        activeEventList?.find((item) => item?.sportid === gameIdForItemPage)?.matchList?.map((res) => {
          return (
            <div className='old-matches-list live-match' onClick={() =>
              navigate(
                  isSignedIn
                      ? "/in-play-details/?event-id=" + res.matchId
                      : "/sign-in"
              )
          }>
              <div className='TeamName'>
                <Link to='/'>
                  {res?.matchName}
                  <span className='d-inline-flex align-items-center float-left mx-2'>
                    <div className='blink'>

                    </div>
                  </span>
                </Link>
              </div>
              <div className='old-match-details'>
                <Link to='/'>
                  <table width="100%">
                    <tbody>
                      <tr>
                        <td width="1%"></td>
                        <td className='GameList' style={{ verticalAlign: "top" }}>
                          <table width="99%">
                            <tbody>
                              <tr>
                                <td className="GameList" align="center">{res?.openDate}</td>
                              </tr>
                              <tr>
                                <td className="GameList" align="center">MATCH BETS : <span>0</span></td>
                              </tr>
                              <tr>
                                <td className="GameList" align="center">Session Bets : <span>0</span></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td width="1%"></td>
                      </tr>
                    </tbody>
                  </table>
                </Link>

              </div>
            </div>
          )
        })
      }

      {
       gameIdForItemPage == 100 &&  activeEventList?.map((item)=>{
          return(
            <>
            {
              item?.matchList?.map((res)=>{
                return (
                  <div className='old-matches-list live-match' onClick={() =>
                    navigate(
                        isSignedIn
                            ? "/in-play-details/?event-id=" + res.matchId
                            : "/sign-in"
                    )
                }>
                    <div className='TeamName'>
                      <Link to='/'>
                        {res?.matchName}
                        <span className='d-inline-flex align-items-center float-left mx-2'>
                          <div className='blink'>
      
                          </div>
                        </span>
                      </Link>
                    </div>
                    <div className='old-match-details'>
                      <Link to='/'>
                        <table width="100%">
                          <tbody>
                            <tr>
                              <td width="1%"></td>
                              <td className='GameList' style={{ verticalAlign: "top" }}>
                                <table width="99%">
                                  <tbody>
                                    <tr>
                                      <td className="GameList" align="center">{res?.openDate}</td>
                                    </tr>
                                    <tr>
                                      <td className="GameList" align="center">MATCH BETS : <span>0</span></td>
                                    </tr>
                                    <tr>
                                      <td className="GameList" align="center">Session Bets : <span>0</span></td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                              <td width="1%"></td>
                            </tr>
                          </tbody>
                        </table>
                      </Link>
      
                    </div>
                  </div>
                )
              })
            }
            </>
          )
        })
      }
      <BackBtn />

    </>
  );
};

export default Inplay;
