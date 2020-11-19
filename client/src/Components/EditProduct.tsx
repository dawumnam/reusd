import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import "../Styles/EditProduct.css";
import axios from "axios";
import "../Styles/EditProduct.css"
import { Context } from './../App';


const EditProduct: React.FC = (props:any) => {
  const [createdAt, setCreatedAt] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [images, setImages] = React.useState([]);
  const { token, intervalId, intervalStatus, isSignedIn } = React.useContext(Context);
  const [tokens, setToken] = token;
  
  const [redirect, setRedirect] = React.useState(false);

  const getItems = async () => {
    let _id = JSON.stringify(props.location.state);
    let id = JSON.parse(_id)["itemid"]
    const data = await axios.get(`http://localhost:5000/item/${id}`, {
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      const {createdAt, description, image, price,title} = data.data;
      setImages(image)
      setCreatedAt(createdAt)
      setDescription(description)
      setPrice(price)
      setTitle(title)
    } else {
      console.log('error!')
    }
  };


  React.useEffect(() => {
      getItems()
  }, []);

  if (redirect === true) return <Redirect to="/" />;
 
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    let _id = JSON.stringify(props.location.state);
    let id = JSON.parse(_id)["itemid"]
    const Item = {
      image: images,
      title: title,
      price: price,
      description: description,
    };
    const data = await axios.put(`http://localhost:5000/item/${id}`, Item, {
      headers: {
        Authorization: "Bearer " + tokens
            },
      withCredentials: true,
      validateStatus: () => true,
    });
    if (data.status === 200) {
      props.history.push("/SellingHistory")
    } else {
      alert("Failed to update the item! ");
    }
  };

  const handleUploadFile = (e:React.ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.value;
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="Editproductpage">
      <div className="edit-product-input-list">
        <div className="sell-product-inputlist-image">
          <div className="file-button">
              <label className="file-label">
                <input
                  className="image-field"
                  type="file"
                  name= "photo"
                  onChange={handleUploadFile}
                  accept='image/png, image/jpeg'
                ></input>
                <span>+</span>
              </label>
            </div>
          </div>
        <div className="sell-product-inputlist-title">
          <p className="sell-product-input-item">TITLE</p>
          <input
            className="edit-input"
            type="text"
            autoFocus
            required
            defaultValue={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          </div>
        <div className="sell-product-inputlist-price">
          <p className="sell-product-input-item">PRICE</p>
          <div className="edit-input-price-container">
            <FontAwesomeIcon className="edit-dollarsign" icon={faDollarSign} />
            <input
              className="edit-input-price"
              type="text"
              autoFocus
              required
              value ={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="sell-product-inputlist-description">
          <p className="edit-product-input-item">DESCRIPTION</p>
          <textarea
            className="edit-input-description"
            value ={description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      <button type="submit" className="edit-product-btn">
        SUBMIT
      </button>
    </form>
  );
};

export default EditProduct;

{/*
.file-button {
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
}

.file-label {
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  border: 1px solid #e0afa0;
  border-radius: 5px;
  color: #e0afa0;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.file-output {
  font-size: 10px;
  text-align: center;
}
.image-field {
  height: 0;
  width: 0;
}

.file-label:hover {
  background-color: #e0afa0;
  color: white;
}
.file-label:active {
  background-color: #e0afa0;
  color: white;
}
 */}