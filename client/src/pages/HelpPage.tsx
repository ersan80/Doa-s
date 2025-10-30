import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function HelpPage() {
    return (
        <Box sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
            <Typography variant="h4" fontWeight={600} color="#6f4e37" gutterBottom>
                Help & FAQ
            </Typography>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>How can I track my order?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    You can view your order status anytime in the “All Orders” section. Once it’s shipped, you’ll see the tracking number appear automatically.
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Can I change my delivery address?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Yes! You can update it anytime under “User Info” or directly during checkout. If you save it, it’ll appear as a suggested address next time.
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>What payment methods are accepted?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    We accept Visa, MasterCard, PayPal, Apple Pay, and Google Pay — all securely processed through our payment partner.
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography fontWeight={600}>Can I return or cancel my order?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Orders can be cancelled before shipping. After that, please contact us within 7 days of delivery for return assistance.
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
