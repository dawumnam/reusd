import * as React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";


interface ChildProps{
    images : () => any
}

const ImageSlider: React.FC<ChildProps> = ({images}:any) => {
    return (
        <div>

            <AliceCarousel autoPlay={false} mouseTracking infinite={true} disableDotsControls={true} disableButtonsControls={true}  >
                {images.map((image:any, index:any) => (
                    <div key={index}>
                        <img style={{ width: '200px', height :'200px', maxHeight: '200px', overflow:"hidden", objectFit: 'cover'}}
                            src={`http://localhost:5000/${image}`} alt="Image" />
                </div>
                ))}
            </AliceCarousel>
        </div>
    )

}
export default ImageSlider;
