import * as React from "react";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import '../../Styles/imageSliderDetail.css';
import Modal from '@bdenzer/react-modal';


interface ChildProps{
    images : any 
}

const ImageSliderDetail: React.FC<ChildProps> = ({images}:any) => {
    const [zoomed, setZoomed] = React.useState(false);
    return (
        <div>
            <Modal  closeModal ={()=>setZoomed(false)} shouldShowModal={zoomed}>
            <AliceCarousel autoPlay={false}  disableDotsControls={true} animationType="fadeout" >
                {images.map((image:any, index:any) => (
                    <div className = 'imageSliderDetail' key={index}>
                        <img style={{ width: '100%', height:'auto'}} src={`http://localhost:5000/${image}`} />
                         
                </div>
                ))}
            </AliceCarousel>
            </Modal>
            <AliceCarousel autoPlay={false}  disableButtonsControls={true}
             animationType="fadeout" >
                {images.map((image:any, index:any) => (
                    <div className = 'imageSliderDetail' key={index}>
                        <img style={{ width: '43%', height:'500px', minWidth:"500px", overflow:"hidden", objectFit:"cover"}} src={`http://localhost:5000/${image}`} 
                         onClick={()=>setZoomed(true)} />
                         
                </div>
                ))}
            </AliceCarousel>
        </div>
    )

}
export default ImageSliderDetail;
