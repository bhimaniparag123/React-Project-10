import generateUniqueId from "generate-unique-id";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AddMoviesAsync } from "../Services/Actions/MovieAction";
import { useNavigate } from "react-router";

// ✅ Move outside to avoid React hook warning
const initialState = {
  title: "",
  desc: "",
  price: "",
  image: "",
  category: "",
};

const AddMovie = () => {
  const { isCreate, errMSG } = useSelector((state) => state.movieReducer);
  const [inputForm, setInputForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const formError = {};
    if (!inputForm.title.trim()) formError.title = "Title is required!";
    if (!inputForm.desc.trim()) formError.desc = "Description is required!";
    if (!inputForm.price.trim()) formError.price = "Price is required!";
    if (!inputForm.category.trim()) formError.category = "Category is required!";
    if (!inputForm.image.trim()) formError.image = "Image URL is required!";
    setErrors(formError);
    return Object.keys(formError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newMovie = {
      ...inputForm,
      id: generateUniqueId({ length: 6, useLetters: false }),
    };
    dispatch(AddMoviesAsync(newMovie));
  };

  // ✅ No warning now
  useEffect(() => {
    if (isCreate) {
      setInputForm(initialState);
      navigate("/");
    }
  }, [isCreate, navigate]);

  return (
    <Container>
      {errMSG && <p className="text-danger text-center mt-2">{errMSG}</p>}
      <div className="form-wrapper mt-5">
        <h3 className="text-center mb-4">Add Movie</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Title</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                placeholder="Enter Movie Title"
              />
              {errors.title && <div className="text-danger">{errors.title}</div>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Description</Form.Label>
            <Col sm="9">
              <Form.Control
                as="textarea"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                placeholder="Enter Movie Description"
              />
              {errors.desc && <div className="text-danger">{errors.desc}</div>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Price</Form.Label>
            <Col sm="9">
              <Form.Control
                type="number"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                placeholder="Enter Movie Price"
              />
              {errors.price && <div className="text-danger">{errors.price}</div>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">Category</Form.Label>
            <Col sm="9">
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
              >
                <option value="">Select Category</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romantic">Romantic</option>
              </Form.Select>
              {errors.category && <div className="text-danger">{errors.category}</div>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4">
            <Form.Label column sm="3">Image URL</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                placeholder="Enter Movie Image URL"
              />
              {errors.image && <div className="text-danger">{errors.image}</div>}
            </Col>
          </Form.Group>

          <div className="text-center">
            <Button type="submit" variant="primary">Add Movie</Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default AddMovie;
