import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { Stack } from '@mui/material';
import { IMediaProps } from '../model/IMediaProps';


export default function MediaSkeleton(props: IMediaProps) {
    const { loading } = props;
    console.log(loading);
    return (
        <Card sx={{ maxWidth: 250, m: 2 }} >

            {loading ? (
                <Skeleton sx={{ height: 250 }} animation="wave" variant="rectangular" />
            ) : (
                <CardMedia
                    component="img"
                    height="160"
                    image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
                    alt="Nicola Sturgeon on a TED talk stage"
                />
            )}
            <CardContent>
                {loading ? (
                    <React.Fragment>
                        <Skeleton animation="wave" height={30} width="40%" style={{ marginBottom: 6, marginTop: 6 }} />
                        <Skeleton animation="wave" height={10} width="20%" style={{ marginBottom: 6, marginTop: 6 }} />
                        <Skeleton animation="wave" height={20} width="45%" style={{ marginBottom: 6, marginTop: 6 }} />
                        <Stack direction="row" spacing={3}>
                            <Skeleton variant="rectangular" animation="wave" height={20} width={50} />
                            <Skeleton variant="rectangular" animation="wave" height={20} width={50} />
                        </Stack>


                    </React.Fragment>
                ) : (
                    <Typography variant="body2" component="p" sx={{ color: 'text.secondary' }}>
                        {
                            "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
                        }
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

