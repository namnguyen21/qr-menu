import axios from "axios";

export default class User {
  constructor(id) {
    this.id = id;
  }

  postImage = async (imageFile) => {
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "qrmenu");
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/djuq5cwgy/image/upload",
      data
    );
    // will return a url to the image src
    return response.data.secure_url;
  };

  getMenu = () => {
    return axios.get(`/menu/${this.id}`);
  };

  addMenuItemWithImage = async (item) => {
    // get image file from menu item
    const { file, category, name, description, price } = item;
    if (file) {
      var imageUrl = await this.postImage(file);
    }

    return axios.post("/menu", {
      userId: this.id,
      category,
      name,
      description,
      price,
      imageUrl: imageUrl ? imageUrl : undefined,
    });
  };

  editMenuItem(itemId, editedItem) {
    return axios.patch(`/menu/edit/${itemId}`, editedItem);
  }

  deleteMenuItem(itemId) {
    return axios.delete(`/menu/delete/${itemId}`);
  }

  editImage = async (itemId, item, newImage) => {
    const imageUrl = await this.postImage(newImage);
    return this.editMenuItem(itemId, { ...item, imageUrl });
  };

  editUser(userInfo) {
    return axios.patch(`/users/${this.id}`, userInfo);
  }

  getPdf() {
    return axios.get(`/restaurant/pdf/${this.id}`, {
      responseType: "arraybuffer",
      headers: {
        Accept: "application/pdf",
      },
    });
  }

  postCsv(csv) {
    const data = new FormData();
    data.append("file", csv);
    return axios.post(`/menu/csv/${this.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
