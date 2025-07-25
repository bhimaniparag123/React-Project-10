import generateUniqueId from "generate-unique-id";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddMoviesAsync } from "../Services/Actions/MovieAction";
import { useNavigate } from "react-router";

const AddMovie = () => {
  const { isCreate ,errMSG } = useSelector(state => state.movieReducer);
  const intialState = {
    id: "",
    title: "",
    desc: "",
    price: "",
    image: "",
    category: "",
  };
  const [inputForm, setInputForm] = useState(intialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

    const validate = () => {
    const formError = {};

    if (!inputForm.title.trim()) formError.title = "Title is required!";
    if (!inputForm.desc.trim()) formError.desc = "Description is required!";
    if (!inputForm.category.trim()) formError.category = "Category is required!";
    if (!inputForm.image.trim()) formError.image = "Image URL is required!";
    if (!inputForm.price.trim()) formError.price = "Price is required!";

    setErrors(formError);
    return Object.keys(formError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    let id = generateUniqueId({ length: 6, useLetters: false });
    inputForm.id = id;
    dispatch(AddMoviesAsync(inputForm))
    setInputForm(intialState);
  };

  useEffect(()=> {
  if(isCreate)
    navigate("/")
}, [isCreate])


  return (
    <>
    <Container>
       {errMSG ? <p>{errMSG}</p>: ""}
      < div className="form-wrapper">
      <h3 className="text-center mb-3">Add Movie</h3>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Title
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="title"
              value={inputForm.title}
              onChange={handleChanged}
              placeholder="Enter Movie Title"
            />
             {errors.title && <div className="error">{errors.title}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Description
          </Form.Label>
          <Col sm="9">
            <Form.Control
              as="textarea"
              name="desc"
              value={inputForm.desc}
              onChange={handleChanged}
              placeholder="Enter Movie Description"
            />
            {errors.desc && <div className="error">{errors.desc}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Price
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="number"
              name="price"
              value={inputForm.price}
              onChange={handleChanged}
              placeholder="Enter Movie Price"
            />
            {errors.price && <div className="error">{errors.price}</div>}
          </Col>
        </Form.Group>

         <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">Category</Form.Label>
          <Col sm="9">
            <Form.Select
              name="category"
              value={inputForm.category}
              onChange={handleChanged}
              required
            >
              <option value="">Select Category</option>
              <option value="Action">Action</option>
              <option value="Comedy">Comedy</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Romantic">Romantic</option>
            </Form.Select>
            {errors.category && <div className="error">{errors.category}</div>}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="3">
            Image
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              name="image"
              value={inputForm.image}
              onChange={handleChanged}
              placeholder="Enter Movie Image URL"
            />
            {errors.image && <div className="error">{errors.image}</div>}
          </Col>
        </Form.Group>

        <Button type="submit">Add Movie</Button>
      </Form>
      </div>
      </Container>
    </>
  );
};

export default AddMovie;