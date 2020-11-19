import * as React from "react";
import axios from "axios";
import "../Styles/DetailProduct.css";
import { Link } from "react-router-dom";
import ImageSliderDetail from "./utils/ImageSliderDetail";
import moment from "moment";

const DetailProduct: React.FC = (props: any) => {
  const [createdAt, setCreatedAt] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [country, setcountry] = React.useState("");
  const [state, setstate] = React.useState("");
  const [city, setcity] = React.useState("");

  React.useEffect(() => {
    const getDetailedItem = async (createdBy: any) => {
      const itemdata = await axios.get(
        `http://localhost:5000/user/${createdBy}`,
        {
          withCredentials: true,
          validateStatus: () => true,
        }
      );
      if (itemdata.status === 200) {
        const { firstName, lastName, country, state, city } = itemdata.data;
        setfirstName(firstName);
        setlastName(lastName);
        setcountry(country);
        setstate(state);
        setcity(city);
      }
    };

    const getItems = async () => {
      let _id = JSON.stringify(props.location.state);
      let id = JSON.parse(_id)["itemid"];

      const data = await axios.get(`http://localhost:5000/item/${id}`, {
        withCredentials: true,
        validateStatus: () => true,
      });

      if (data.status === 200) {
        const {
          createdAt,
          createdBy,
          description,
          image,
          price,
          title,
        } = data.data;
        getDetailedItem(createdBy);
        setImages(image);
        setCreatedAt(createdAt);
        setDescription(description);
        setPrice(price);
        setTitle(title);
      } else {
        console.log("error!");
      }
    };
    getItems();
  }, []);

  return (
    <div className="DetailProduct">
      <div className="Product-image-area">
        <ImageSliderDetail images={images} />
      </div>
      <div className="Product-userinfo-area">
        <div className="Product-userinfo-name-location">
          <p className="Product-userinfo-name">
            {firstName.toUpperCase() + " " + lastName.toUpperCase()}
          </p>
          <p className="Product-userinfo-location">
            {city + ", " + state + ", " + country}
          </p>
        </div>
        <div className="Product-userinfo-rate-area">
          <p className="Product-userinfo-rate">Rate of Seller</p>
        </div>
        <div className="Product-userinfo-startchat-area">
          <Link to="/Chat" style={{ textDecoration: "none" }}>
            <button className="Product-userinfo-startchat">Start Chat</button>
          </Link>
        </div>
      </div>
      <p className="hrline"></p>
      <div className="Product-detailinfo-area">
        <p className="Product-detail-title-area">{title.toUpperCase()}</p>
        <p className="Product-detail-createdAt-area">
          {moment(createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <p className="Product-detail-price-area">$ {price}</p>
        <p className="Product-detail-description-area">{description}</p>
      </div>
    </div>
  );
};

export default DetailProduct;
