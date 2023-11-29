import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material"
import { FaCheck } from "react-icons/fa6";
import "./PricingCard.css"

type Props = {
    tier: string
    price: string
}

export const PricingCard = (props: Props) => {

    const getAccountTier = () => {
        if (props.tier === "free") {
            return "NO ACCOUNT"
        } else if (props.tier === "basic") {
            return "BASIC ACCOUNT"
        } else if (props.tier === "premium") {
            return "PREMIUM ACCOUNT"
        }
    }

    const getAccountPricing = () => {
        if (props.tier === "free" || props.tier === "basic") {
            return "FREE"
        } else if (props.tier === "premium") {
            return "$5/MONTH"
        }
    }

    const getButtonText = () => {
        if (props.tier === "free") {
            return "Try it out"
        } else if (props.tier === "basic") {
            return "Sign Up"
        } else if (props.tier === "premium") {
            return "Purchase"
        }
    }

    const getNavLink = () => {
        if (props.tier === "free") {
            return <Button className="card-button">{getButtonText()}</Button>
        } else if (props.tier === "basic") {
            return (
                <Button className="card-button">
                    <Link to="/signup" className="link">{getButtonText()}</Link>
                </Button>
            )
        } else if (props.tier === "premium") {
            return <Button className="card-button">{getButtonText()}</Button>
        }
    }

    const getCardBody = () => {
        if (props.tier === "free") {
            return (
                <Typography variant="body1" className="card-feature-free">
                Want to test out Summarify? Upload your lecture slides and dive into a world of endless possibilities! When you create an account, you’ll get even more benefits and experience new heights of productivity!
                </Typography>
            );
        } else if (props.tier === "basic") {
            return (
                <div className="card-body">
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Upload files up to <span className="bold">5,000</span> characters </Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">simple, paragraph-form</span> summaries</Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">simple, point-form</span> summaries</Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">flashcards</span> for self-learning</Typography>
                    </div>
                </div>
            );
        } else if (props.tier === "premium") {
            return (
                <div className="card-body">
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Upload files up to <span className="bold">10,000</span> characters </Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">simple, paragraph-form</span> summaries</Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">simple, point-form</span> summaries</Typography>
                    </div>
                    <div className="card-feature">
                        <FaCheck className="check-icon"/>
                        <Typography variant="body1" className="card-feature-text">Let AI generate <span className="underline">flashcards</span> for self-learning</Typography>
                    </div>
                </div>
            );
        }
    }

    return (
        <Box className="card">
            <Card>
                <CardContent>
                    <Box className="card-header">
                        <Typography variant="h6" className="tier-kind">{getAccountTier()}</Typography>
                        <Typography variant="h6" className="tier-price">{getAccountPricing()}</Typography>
                    </Box>

                    {getCardBody()}

                    <Box className="button-box">
                        {/* <Button className="card-button">{getButtonText()}</Button> */}
                        {getNavLink()}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PricingCard