import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveProduct = async(e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);


    try {
      await axios.post('http://localhost:5000/products', formData, {
        headers:{
            "Content-type" : "multipart/form-data"
        }
      });
      navigate('/dashboard', { replace: true });
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        <form onSubmit={saveProduct}>
          <div className="field">
            <label htmlFor="title" className="label">
              Product Name
            </label>
            <div className="control">
              <input
                type="text"
                id="title"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Product Name"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="file" className="label">
              Image
            </label>
            <div className="control">
              <div className="file">
                <label className="file-label">
                  <input
                    type="file"
                    id="file"
                    className="file-input"
                    onChange={loadImage}
                  />
                  <span className="file-cta">
                    <span className="file-label">Choose a file...</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          {preview && (
            <figure className="image mb-5 is-128x128">
              <img src={preview} alt="Preview" />
            </figure>
          )}

          <div className="field">
            <div className="control">
                <button type="submit" className="button is-success">Submit</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
