import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { FaCheck } from 'react-icons/fa';
import React from 'react';
import "./PricingCard.css"

type Props = {
    tier: string;
};

export const PricingCard = (props: Props) => {
    // Defined styles using React.CSSProperties
    const styles: Record<string, React.CSSProperties> = {

        buttonBox: {
            marginBottom: '20px',
        },
       
        checkIcon: {
            color: '#344055',
            marginRight: '10px',
        },
        featureText: {
            marginLeft: '10px',
            color: "black"
        },

    };
    
    // Helper functions
    const getAccountTier = () => {
        if (props.tier === 'free') {
            return 'NO ACCOUNT';
        } else if (props.tier === 'basic') {
            return 'BASIC ACCOUNT';
        } else if (props.tier === 'premium') {
            return 'PREMIUM ACCOUNT';
        }
    };

    const getAccountPricing = () => {
        if (props.tier === 'free' || props.tier === 'basic') {
            return 'FREE';
        } else if (props.tier === 'premium') {
            return '$5/MONTH';
        }
    };

    const getButtonText = () => {
        if (props.tier === 'free') {
            return 'Try It Out';
        } else if (props.tier === 'basic') {
            return 'Sign Up';
        } else if (props.tier === 'premium') {
            return 'Purchase';
        }
    };

    const getNavLink = () => {
        return (
            <Button className='button'>
                <Link to={props.tier === 'premium' ? '/login' : '/signup'} className='button'>
                    {getButtonText()}
                </Link>
            </Button>
        );
    };

    const getCardBody = () => {
        if (props.tier === 'free') {
            return (
                <Typography style={{marginBottom: "50px", marginTop:"15px"}}>
                   <span style={{color: "black"}}> 
                    Want to test out Summarify? Upload your lecture slides and dive into a world of endless possibilities!
                    When you create an account, you’ll get even more benefits and experience new heights of productivity!
                   </span>
                </Typography>
            );
        } else {
            // Basic and Premium tiers share the same layout
            return (
                <div className='card-body'>
                    <div className='feature'>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Upload files up to <span className='bold'>5,000</span> characters</Typography>
                    </div>
                    <div className='feature'>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span className='underline'>simple, paragraph-form</span> summaries</Typography>
                    </div>
                    <div className='feature'>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span className='underline'>simple, point-form</span> summaries</Typography>
                    </div>
                    <div className='feature'>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span className='underline'>flashcards</span> for self-learning</Typography>
                    </div>
                </div>
            );
        }
    };

    return (

        <Box className="card" >
        <Box className="card-header">
            <Typography variant="h6" component="div">{getAccountTier()}</Typography>
            <Typography variant="h6" component="div">{getAccountPricing()}</Typography>
        </Box>
        <Box className='card-content' component="div">
            {getCardBody()}
            <Box style={styles.buttonBox}>
                {getNavLink()}
            </Box>
        </Box>
    </Box>
    );
}

export default PricingCard;
