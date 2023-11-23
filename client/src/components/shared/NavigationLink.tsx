import { Link } from "react-router-dom";
import '../shared/NavigationLink.css'

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  const linkStyles = {
    background: props.bg, 
    color: props.textColor,
    padding: "8px 25px",
    borderRadius: "6px",
    marginRight: "0px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.40)",
    fontWeight: "700",
    transition: "ease-in 0.3s"
  }

  const hoverStyles = {
    background: "#485875",
    color: "#F2F1EE"
  };

  return (
    <Link
      onClick={props.onClick}
      className="nav-link"
      to={props.to}
      style={linkStyles}
      onMouseOver={(e) => {
        e.currentTarget.style.background = hoverStyles.background;
        e.currentTarget.style.color = hoverStyles.color;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = linkStyles.background;
        e.currentTarget.style.color = linkStyles.color;
      }}
    >
      {props.text}
    </Link>
  );
};

export default NavigationLink;
