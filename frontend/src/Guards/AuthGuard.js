function AuthGuard(to, from, next){
    if(localStorage.getItem("Auth")){
        let AuthData = JSON.parse(localStorage.getItem("Auth"))
        if(AuthData.isLoggedIn){
            next()
        }
    }else{
        next({path: "/LoginRegister", name: "LoginRegister"})
    }
}

export default AuthGuard;