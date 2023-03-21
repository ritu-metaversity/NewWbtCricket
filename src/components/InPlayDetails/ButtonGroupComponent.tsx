import { Button, ButtonGroup } from "@mui/material";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { userServices } from "../../utils/api/user/services";

interface Props {
  setAmount: Dispatch<SetStateAction<number>>;
}
const ButtonGroupComponent: FC<Props> = ({ setAmount }) => {
  const [buttonData, setButtonData] = useState<{ [x: string]: number }>({});

  const getButtondata = async () => {
    const { response } = await userServices.getButtonValue();
    if (response) {
      setButtonData(response.data);
    }
    // await axios
    //   .post(
    //     "http://api.a2zscore.com/admin-new-apis/enduser/get-stake-button",
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setButtonData(res?.data?.data);
    //     console.log(res.data);
    //   });
  };
  useEffect(() => {
    getButtondata();
  }, []);
  return (
    <>
      <ButtonGroup sx={{ maxWidth: "100%" }}>
        {Object.keys(buttonData)?.map((item: any) => (
          <Button
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
            onClick={() => setAmount(buttonData[item])}
          >
            {buttonData[item]}
          </Button>
        ))}
      </ButtonGroup>
    </>
  );
};

export default ButtonGroupComponent;
