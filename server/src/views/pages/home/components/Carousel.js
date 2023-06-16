import Carousel from 'react-material-ui-carousel';
import {Paper, Stack} from '@mui/material'

const CarouselComponent = () => {

    const carouselImages = [
        '/images/bracelet.jpg',
        '/images/earring.jpg',
        '/images/pendant.jpg',
        '/images/ring.jpg'
    ]

    return (
        <Carousel>
            {carouselImages.map((image, index) => (
                <Stack
                    sx={{
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Paper
                        key={index}
                        sx={{
                            padding: '16px',
                            heigth: '500px',
                            width: '500px'
                        }}
                    >
                        <img
                            src={carouselImages[index]}
                            height="100%"
                            width="100%"
                        />
                    </Paper>
                </Stack>
            ))}
        </Carousel>
    )

}


export default CarouselComponent