import { Box, Card, CardContent, Typography, Button } from "@mui/material"
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

    return (
        <Box className="card">
            <Card>
                <CardContent>
                    <Box className="card-header">
                        <Typography variant="h6" className="tier-kind">{getAccountTier()}</Typography>
                        <Typography variant="h6" className="tier-price">{getAccountPricing()}</Typography>
                        
                    </Box>
                    
                    <Typography variant="body2" className="card-body">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta, velit. Minus sunt ut esse voluptatem explicabo dolorem, eaque maxime? Laudantium voluptate reiciendis velit, nisi unde nostrum at et! Veniam, nulla dolorum fuga at sapiente iusto rerum corrupti velit, repudiandae temporibus distinctio architecto doloribus praesentium ipsa illo perferendis. Vitae, accusamus laboriosam!
                    </Typography>

                    <Box className="button-box">
                        <Button className="card-button">{getButtonText()}</Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PricingCard