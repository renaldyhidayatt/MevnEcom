<template>
  <div>
    <center>
      <h4 class="s">
        UserProfile
        <button v-if="EditMode" @click="EditData" class="btn btn-danger">
          Edit
        </button>
        <button v-if="!EditMode" @click="SaveData" class="btn btn-info">
          Save
        </button>
      </h4>
      <div v-if="EditMode">
        mg class="iimg col" :src="UserData.imgSrc" alt="" />
        <div class="container">
          <div class="row">
            <div class="col-md-8 d">
              <h3>
                First Name :
                <strong class="s">{{ UserData.firstName }}</strong>
              </h3>
              <h3>
                Last Name :
                <strong class="s">{{ UserData.lastName }}</strong>
              </h3>
              <h3>
                Email :
                <strong class="s">{{ UserData.Email }}</strong>
              </h3>
              <h3>
                Gender :
                <strong class="s">{{ UserData.Gender }}</strong>
              </h3>
              <h3>
                Birth Day :
                <strong class="s">{{ UserData.BDay }}</strong>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!EditMode">
        <img class="iimg col" alt="" :src="UserData.imgSrc" />
        <div class="fileUpload">
          <input
            type="file"
            @change="onFileChange"
            class="upload"
            enctype="multipart/form-data"
          />
          <span>Upload</span>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-md-8 d">
              <h3>
                First Name :
                <strong class="s">{{ UserData.firstName }}</strong>
                <input
                  class="form-control"
                  placeholder="first name"
                  type="text"
                  v-model="UserData.firstName"
                />
              </h3>
              <h3>
                Last Name :
                <strong class="s">{{ UserData.lastName }}</strong>
                <input
                  class="form-control"
                  placeholder="last name"
                  type="text"
                  v-model="UserData.lastName"
                />
              </h3>
              <h3>
                Email :
                <strong class="s">{{ UserData.Email }}</strong>
                <input
                  class="form-control"
                  placeholder="email"
                  type="email"
                  v-model="UserData.Email"
                  disabled
                />
              </h3>
              <h3>
                Gender :
                <strong class="s">{{ UserData.Gender }}</strong>
                <select v-model="UserData.Gender" class="form-control">
                  <option>male</option>
                  <option>fmale</option>
                </select>
              </h3>
              <h3>
                Birth Day :
                <strong class="s">{{ UserData.BDay }}</strong>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="date"
                      v-model="UserData.BDay"
                      class="form-control"
                    />
                  </div>
                </div>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <button v-on:click="DelAccount" class="btn btn-danger">
        Delete Account
      </button>
    </center>
  </div>
</template>

<script>
import axios from "axios";
const PORT = process.env.PORT || 5000;
const URL_BACKEND = `http://localhost:${PORT}/api`;

export default {
  user: "UserProfile",
  data() {
    return {
      EditMode: true,
      UserData: {},
      files: null,
      fileReaderBase64: null,
    };
  },
  created() {
    const token = JSON.parse(localStorage.getItem("Auth")).Token;

    axios
      .get(`${URL_BACKEND}/users/UserData`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let usDATA = res.data;
        let newarr = {
          userID: usDATA._id,
          firstName: usDATA.first_name,
          lastName: usDATA.last_name,
          Email: usDATA.email,
          Gender: usDATA.gender,
          BDay: usDATA.prith_day,
          imgSrc: usDATA.profile_img,
        };
        this.UserData = newarr;
      })
      .catch((err) => {
        console.log("err", err.response.data.msg);
      });
  },
  methods: {
    ...mapActions(["SetUserAuth"]),
    SaveData: function () {
      this.EditMode = false;
      const token = JSON.parse(localStorage.getItem("Auth")).Token;

      const PostData = new FormData();

      PostData.append("first_name", this.UserData.firstName);
      PostData.append("last_name", this.UserData.lastName);
      PostData.append("email", this.UserData.Email);
      PostData.append("gender", this.UserData.Gender);
      PostData.append("prith_day", this.UserData.BDay);
      PostData.append("profile_img", this.UserData.imgSrc);

      if (this.files !== null) {
        for (const i of Object.keys(this.files)) {
          PostData.append("image", this.files[i]);
        }
      }
      axios
        .put(`${URL_backend}/users/`, PostData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("res updated user data", res.data);
        })
        .catch((err) => {
          console.log("err", err.response.data.msg);
        });
    },
    EditData: function () {
      this.EditMode = !this.EditMode;
    },
    onFileChange(e) {
      this.UserData.imgSrc = URL.createObjectURL(e.target.files[0]);
      this.files = e.target.files;
    },
    DelAccount() {
      const token = JSON.parse(localStorage.getItem("Auth")).Token;

      axios
        .delete(`${URL_backend}/users/`, { headers: { "x-auth-token": token } })
        .then((res) => {
          console.log("deleted user successfully", res.data);
          this.LogOutUser();
        })
        .catch((err) => {
          console.log("err", err.response.data.msg);
        });
    },
    LogOutUser() {
      let data = { isLogedIN: false, isAdmin: false };
      // this.auth = {isUserLogedIN:false, IsUserAdmin:false}
      this.SetUserAuth(data);
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style scoped>
.iimg {
  margin-left: auto;
  margin-right: auto;
  width: 10em;
}
.d {
  font-family: cursive;
  border: 1px solid #2f4f4f1f;
  margin: 1% auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.s {
  color: darkslategrey;
  font-family: fantasy;
}

.fileUpload {
  background: #00bcbe;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  margin: 1.25em auto; /*20px/16px 0*/
  overflow: hidden;
  padding: 0.875em; /*14px/16px*/
  position: relative;
  text-align: center;
  width: 120px;
  cursor: pointer;
}
.fileUpload:hover,
.fileUpload:active,
.fileUpload:focus {
  background: #00a2a4;
  cursor: pointer;
}
.fileUpload input.upload {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  font-size: 20px;
  cursor: pointer;
  opacity: 0;
  filter: alpha(opacity=0);
  width: 148px;
  height: 46px;
  cursor: pointer;
}

input[type="file"] {
  position: fixed;
  right: 100%;
  bottom: 100%;
}
.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
