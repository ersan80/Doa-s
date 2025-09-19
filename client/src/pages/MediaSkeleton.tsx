import { Grid, Skeleton, Stack, Divider} from "@mui/material";
import { IMediaProps } from "../model/IMediaProps";

export default function MediaSkeleton(props: IMediaProps) {
    const { loading } = props;

    if (!loading) return null;

    return (
        <Grid container spacing={2} marginTop={2} justifyContent={"center"} sx={{ width: '100%' }}>
            {/* Image skeleton */}
            <Grid  size={{lg:4,md:3,sm:2,xs:6}} textAlign="center">
                <Skeleton variant="rectangular" width="75%" height={250} />
            </Grid>

            {/* Content skeleton */}
            <Grid size={{ lg: 8, md: 9, sm: 10, xs: 12 }}  textAlign="left">
                {/* Price */}
                <Skeleton variant="text" width="30%" height={40} />
                <Divider sx={{ mb: 2 }} />

                {/* Table skeleton */}
                <Stack spacing={2}>
                    <Skeleton variant="text" width="80%" height={30} />
                    <Skeleton variant="text" width="90%" height={30} />
                    <Skeleton variant="text" width="60%" height={30} />
                </Stack>
            </Grid>
        </Grid>
    );
}
