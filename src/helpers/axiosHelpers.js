import axios from "axios";
const baseURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8000/api/v1"
    : "/api/v1";
const userAPI = baseURL + "/user";
const transAPI = baseURL + "/transaction";

// ======== user api

export const postUser = async (obj) => {
  try {
    const { data } = await axios.post(userAPI, obj);
    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

//login user
export const loginUser = async (obj) => {
  try {
    const { data } = await axios.post(userAPI + "/login", obj);

    return data;
  } catch (error) {
    return {
      status: "success",
      message: error.message,
    };
  }
};

//return user id
const getUserId = () => {
  const userStr = sessionStorage.getItem("user");
  const userObj = userStr ? JSON.parse(userStr) : null;
  return userObj?._id || null;
};

// ======== transaction api
export const postTransactions = async (userObj) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "You need to log in",
      };
    }
    const { data } = await axios.post(transAPI, userObj, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
export const fetchTransactions = async () => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "You need to log in",
      };
    }
    const { data } = await axios.get(transAPI, {
      headers: {
        Authorization: userId,
      },
    });

    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};

export const deleteTransactions = async (ids) => {
  try {
    const userId = getUserId();

    if (!userId) {
      return {
        status: "error",
        message: "You need to log in",
      };
    }

    const { data } = await axios.delete(transAPI, {
      data: ids,
      headers: {
        Authorization: userId,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
