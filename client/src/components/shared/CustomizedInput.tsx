import TextField from "@mui/material/TextField";
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import InputAdornment from '@mui/material/InputAdornment';

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  const getStartAdornment = () => {
    const iconColor = '#F2F1EE';
    let backgroundColor = '#344055';
    let iconComponent = null;
    let iconSize = 35;
    let strokeWidth = 0.7;

    if (props.name === 'email') {
      iconComponent = <CiMail style={{ color: iconColor }} size={iconSize} stroke-width={strokeWidth} />;
    } else if (props.name === 'password') {
      iconComponent = <CiLock style={{ color: iconColor }} size={iconSize} stroke-width={strokeWidth}/>;
    } else if (props.name === 'name') {
      iconComponent = <CiUser style={{ color: iconColor }} size={iconSize} stroke-width={strokeWidth}/>;
    }

    return (
      <div style={{ 
        backgroundColor, 
        borderRadius: '8px',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60px",
        width: "65px",
        position: "relative",
        left: "-13px"}}>
        {iconComponent}
      </div>
    );
  };

  const getPlaceholder = () => {
    if (props.name === 'email') {
      return "Email Address";
    } else if (props.name === 'password') {
      return "Password";
    } else if (props.name === 'name') {
      return "Name";
    }
  }

  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "black" } }}
      name={props.name}
      type={props.type}
      placeholder={getPlaceholder()}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "black"
        },
        startAdornment: (
          <InputAdornment position="start">
            {getStartAdornment()}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomizedInput;
