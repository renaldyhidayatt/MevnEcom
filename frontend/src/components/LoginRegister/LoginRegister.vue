<template>
  <div>
    <section class="contact-from pt-4">
      <div class="container">
        <div class="row mt-12">
          <!-- Register  -->
          <div class="col-md-6 mx-auto register">
            <div class="form-wrapper">
              <div class="row">
                <div class="col-md-12">
                  <h4>Registr</h4>
                </div>
              </div>
              <form>
                <div class="row">
                  <div v-if="RegisterError !== ''" class="alert alert-danger" role="alert">
                    {{ RegisterError }}
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" v-model="RegisterData.FName" class="form-control" placeholder="First name" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="text" v-model="RegisterData.LName" class="form-control" placeholder="Last name" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="email" v-model="RegisterData.Email" class="form-control R_Email"
                        placeholder="Email" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                          value="true" v-model="RegisterData.GenderMale" />
                        <label class="form-check-label" for="inlineRadio1">Male</label>
                      </div>
                      <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                          value="true" v-model="RegisterData.GenderFemale" />
                        <label class="form-check-label" for="inlineRadio1">Female</label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" v-model="RegisterData.Pass" class="form-control R_Pass"
                        placeholder="Password " />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" v-model="RegisterData.confirmPass" class="form-control CR_Pass"
                        placeholder="Confirm Password" />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="date" class="form-control" v-model="RegisterData.UserDate" />
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <button v-on:click="Register($event)" class="btn btn-primary RegisterIN">
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Login -->
          <div class="col-md-6 mx-auto login">
            <div class="form-wrapper">
              <div class="row">
                <div class="col-md-12">
                  <h4>Login</h4>
                </div>
              </div>
              <form>
                <div class="row">
                  <div v-if="LoginError" class="alert alert-danger" role="alert">
                    invalid username or password
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="email" class="form-control emailIN" placeholder="Email" v-model="LoginData.Email" />
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <input type="password" class="form-control PassIN" placeholder="Password"
                        v-model="LoginData.Password" />
                    </div>
                  </div>
                </div>
                <div class="mt-3">
                  <button v-on:click="Login($event)" class="btn btn-primary loginbut">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
const PORT = process.env.PORT || 5000;
const URL_BACKEND = `http://localhost:${PORT}/api`;
export default {
  name: "LoginRegister",
  data() {
    return {
      RegisterData: {
        FName: "",
        LName: "",
        Email: "",
        GenderMale: false,
        GenderFemale: false,
        Pass: "",
        confirmPass: "",
        UserDate: [],
      },
      LoginData: {
        Email: "",
        Password: "",
      },
      LoginError: false,
      RegisterError: "",
    };
  },
  computed: {
    ...mapGetters(["UserAuth"]),
  },
  methods: {
    ...mapActions(["SetUserAuth"]),
    Register: function (e) {
      e.preventDefault();
      let userdata;
      if (this.RegisterData.GenderMale == "true") {
        this.RegisterData.GenderMale = false;
        userdata = {
          first_name: String(this.RegisterData.FName),
          last_name: String(this.RegisterData.LName),
          email: String(this.RegisterData.Email),
          password: String(this.RegisterData.confirmPass),
          gender: "male",
          prith_day: String(this.RegisterData.UserDate),
        };
      } else {
        this.RegisterData.GenderFemale = false;
        userdata = {
          first_name: String(this.RegisterData.FName),
          last_name: String(this.RegisterData.LName),
          email: String(this.RegisterData.Email),
          password: String(this.RegisterData.confirmPass),
          gender: "fmale",
          prith_day: String(this.RegisterData.UserDate),
        };
      }
      if (this.RegisterData.Pass !== this.RegisterData.confirmPass) {
        this.RegisterError = "password not matched";
        this.RegisterData.Pass = "";
        this.RegisterData.confirmPass = "";
      } else {
        axios
          .post(`${URL_BACKEND}/users`, userdata)
          .then((res) => {
            console.log("reigester res", res);
            this.LoginData.Email = res.data.email;
            this.LoginData.Password = this.RegisterData.confirmPass;
            this.RegisterError = "";
          })
          .catch((err) => {
            this.RegisterError = err.response.data;
          });
      }
    },
    Login: function (e) {
      e.preventDefault();
      console.log("Log", this.LoginData);
      let userdata = {
        email: String(this.LoginData.Email),
        password: String(this.LoginData.Password),
      };
      axios
        .post(`${URL_BACKEND}/auth`, userdata)
        .then((res) => {
          getusdata(res);
          this.LoginError = false;
        })
        .catch((err) => {
          this.LoginError = true;
          console.log("er", err.response.data.msg);
        });

      const getusdata = (Token) => {
        axios
          .get(`${URL_BACKEND}/users/UserData`, {
            headers: { "x-auth-token": String(Token.data) },
          })
          .then((res) => {
            let data = {
              isLogedIN: true,
              isAdmin: res.data.isAdmin,
              Token: String(Token.data),
            };
            this.SetUserAuth(data);
            this.$router.push({ path: "/UserProfile" });
          });
      };
    },
  },
};
</script>

<style scoped>
.register {
  background: #9e9e9e26;
  padding: 15px;
}

.login {
  background: #007bff0a;
  padding: 15px;
}
</style>
