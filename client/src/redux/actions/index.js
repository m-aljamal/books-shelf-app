import axios from "axios";
// get lest of all books
// /api/books?skip=0&limit=5&order=asc
// should except the options to pass to url
// get 10 book by default
export async function getBooks(
  limit = 10,
  start = 0,
  order = "asc",
  list = ""
) {
  // using redux promise as middle ware
  // could make a request from here and when it comes it save to store

  const request = await axios.get(
    `/api/books?limit=${limit}&skip=${start}&order=${order}`
  );
  // `/api/books?limit=${limit}&skip=${start}&order=${order}`

  return {
    type: "GET_BOOKS",
    // payload what ever comes from request
    payload: list ? [...list, ...request.data] : request.data
  };
}
// here we need to get the book creator for users database and the book
// id database for book we have ownerId which is same as user id
export function getBookWithReviewer(id) {
  const request = axios.get(`/api/getBook?id=${id}`);
  return dispatch => {
    request.then(({ data }) => {
      let book = data;

      axios.get(`/api/getReviewer?id=${book.ownerId}`).then(({ data }) => {
        let response = {
          book,
          reviewer: data
        };

        dispatch({
          type: "GET_BOOK_W_REVIEWER",
          payload: response
        });
      });
    });
  };
}

export function clearBookWithReviewer() {
  return {
    type: "CLEAR_BOOK_W_REVIEWER",
    payload: {
      book: {},
      reviewer: {}
    }
  };
}

export function addBook(book) {
  const request = axios.post("/api/book", book).then(response => response.data);
  return {
    type: "ADD_BOOK",
    payload: request
  };
}

export function clearNewBook() {
  return {
    type: "CLEAR_NEW_BOOK",
    payload: {}
  };
}

export function getUserPosts(userId) {
  const request = axios
    .get(`/api/user_posts?user=${userId}`)
    .then(response => response.data);

  return {
    type: "GET_USER_POSTS",
    payload: request
  };
}

// getBook , updateBook, clearBook, deleteReview

export function getBook(id) {
  const request = axios
    .get(`/api/getBook?id=${id}`)
    .then(response => response.data);

  return {
    type: "GET_BOOK",
    payload: request
  };
}

export function updateBook(book) {
  const request = axios
    .post(`/api/book_update`, book)
    .then(response => response.data);

  return {
    type: "UPDATE_BOOK",
    payload: request
  };
}

export function deleteReview(id) {
  const request = axios
    .delete(`/api/delete_book?id=${id}`)
    .then(response => response.data);
  return {
    type: "DELETE_BOOK",
    payload: request
  };
}

export function clearBook() {
  return {
    type: "CLEAR_BOOK",
    payload: {
      book: {},
      updateBook: false,
      postDeleted: false
    }
  };
}

/*================== User =====================*/
export function loginUser({ email, password }) {
  const request = axios
    .post("/api/login", { email, password })
    .then(response => response.data);
  return {
    type: "USER_LOGIN",
    payload: request
  };
}

export function auth() {
  const request = axios.get("/api/auth").then(response => response.data);
  return {
    type: "USER_AUTH",
    payload: request
  };
}

export function getUsers() {
  const request = axios.get(`/api/users`).then(response => response.data);

  return {
    type: "GET_USERS",
    payload: request
  };
}

export function userRegister(user, userList) {
  const request = axios.post(`/api/register`, user);

  return dispatch => {
    request.then(({ data }) => {
      let users = data.success ? [...userList, data.user] : userList
      let response = {
        success: data.success,
        users
      };

      dispatch({
        type: "USER_REGISTER",
        payload: response
      });
    });
  };
}
