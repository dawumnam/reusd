import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

import "../Styles/Sellproduct.css";
import FileUpload from '../Components/FileUpload'
import axios from "axios";
import { Context } from './../App';


const Sellproduct: React.FC = (props:any) => {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [images, setImages] = React.useState([]);
  const { token } = React.useContext(Context);
  const [tokens, setToken] = token;
  

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const Item = {
      image: images,
      title: title,
      price: price,
      description: description,
    };
    const data = await axios.post("http://localhost:5000/item", Item, {
      headers: {
        Authorization: "Bearer " + tokens
            },
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      props.history.push("/")
    } else {
      alert("Failed to upload the item! :( ");
    }
  };

  const updateImages = (newImages:any) => {
    setImages(newImages)
}

  return (
    <form onSubmit={handleSubmit} className="Sellproductpage">
      <div className="sell-product-input-list">
        <FileUpload updateImages={updateImages}/>
        <div className="sell-product-inputlist-area">
        <div className="sell-product-inputlist-title">
          <p className="sell-product-input-item">TITLE</p>
          <input
            className="sell-input"
            type="text"
            autoFocus
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          </div>
        <div className="sell-product-inputlist-price">
          <p className="sell-product-input-item">PRICE</p>
          <div className="sell-input-price-container">
            <FontAwesomeIcon className="dollarsign" icon={faDollarSign} />
            <input
              className="sell-input-price"
              type="text"
              autoFocus
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sell-product-inputlist-description">
          <p className="sell-product-input-item">DESCRIPTION</p>
          <textarea
            wrap='soft'
            className="sell-input-description"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        </div>
      </div>
      <div className ='sell-product-btn-area'>
      <button type="submit" className="sell-product-btn">
        SUBMIT
      </button></div>
    </form>
  );
};

export default Sellproduct;
