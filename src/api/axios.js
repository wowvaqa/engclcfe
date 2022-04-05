import axios from "axios";

export default axios.create({
  baseURL: "https://django-civil-85.herokuapp.com/api/users/login",
});
