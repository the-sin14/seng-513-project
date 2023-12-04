import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { FaCheck } from 'react-icons/fa';
import React from 'react';

type Props = {
    tier: string;
};

export const PricingCard = (props: Props) => {
    // Define styles using React.CSSProperties
    const styles: Record<string, React.CSSProperties> = {
        card: {
            width: '100%',
            maxWidth: '500px', 
            margin: '10px',
            borderRadius: '6px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.25)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', 
            height: '100%', 
        },
        cardContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '20px', 
           },

        cardHeader: {
            backgroundColor: '#344055',
            color: '#F2F1EE',
            padding: '5px 20px',
            borderRadius: '6px 6px 0 0',
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center', 
            width: '100%',
            boxSizing: 'border-box',
        },
        cardContent: {
            textAlign: 'center',
            padding: '25px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: '1', 
        },
        cardBody: {
            flex: '1'
        },
        buttonBox: {
            marginBottom: '20px',
        },
        button: {
            fontSize: '16px',
            width: '150px',
            backgroundColor: '#344055',
            color: '#F2F1EE',
            borderRadius: '8px',
            fontWeight: '600',
            textTransform: 'capitalize',
            textDecoration: 'none',
            border: 'none',
        },
        feature: {
            display: 'flex',
            alignItems: 'center',
            margin: '10px 0',
        },
        checkIcon: {
            color: '#344055',
            marginRight: '10px',
        },
        featureText: {
            marginLeft: '10px',
            color: "black"
        },

        bold: {
            fontWeight: 'bold',
        },
        underline: {
            textDecoration: 'underline',
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
            <Button style={styles.button}>
                <Link to={props.tier === 'premium' ? '/payment' : '/signup'} style={styles.button}>
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
                <div style={styles.cardBody}>
                    <div style={styles.feature}>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Upload files up to <span style={styles.bold}>5,000</span> characters</Typography>
                    </div>
                    <div style={styles.feature}>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span style={styles.underline}>simple, paragraph-form</span> summaries</Typography>
                    </div>
                    <div style={styles.feature}>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span style={styles.underline}>simple, point-form</span> summaries</Typography>
                    </div>
                    <div style={styles.feature}>
                        <FaCheck style={styles.checkIcon} />
                        <Typography style={styles.featureText}>Let AI generate <span style={styles.underline}>flashcards</span> for self-learning</Typography>
                    </div>
                </div>
            );
        }
    };

    return (

        <Box style={styles.card} >
        <Box style={styles.cardHeader}>
            <Typography variant="h6" component="div">{getAccountTier()}</Typography>
            <Typography variant="h6" component="div">{getAccountPricing()}</Typography>
        </Box>
        <Box style={styles.cardContent} component="div">
            {getCardBody()}
            <Box style={styles.buttonBox}>
                {getNavLink()}
            </Box>
        </Box>
    </Box>
    );
}

export default PricingCard;
