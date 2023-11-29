import { Box, Card, CardContent, Typography } from "@mui/material"
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
            return "$5/month"
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
                        Want to test out Summarify? Upload your lecture slides and dive into a world of endless possibilities! When you create an account, you’ll get even more benefits and experience new heights of productivity! 
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )
}

export default PricingCard