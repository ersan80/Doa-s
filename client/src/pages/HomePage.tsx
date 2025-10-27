
import { Box } from "@mui/material";
import HeroSection from "../components/HeroSection";
import AboutCraftSection from "../components/AboutCraftSection";

export default function HomePage() {



    return (
        <Box sx={{m: 0, p: 0 }}>
            <HeroSection />
            <AboutCraftSection />
        </Box>
    )
}