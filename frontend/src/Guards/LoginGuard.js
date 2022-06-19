function LoginRegGuard(to, from, next){
    if(localStorage.getItem("Auth")){
        let AuthData = JSON.parse(localStorage.getItem("Auth"))
        if(AuthData.isLoggedIn == false){
            next()
        }
    } if (!localStorage.getItem("Auth")){
        next();
    }else{
        next({ path: "/UserProfile"})
    }
}

export default LoginRegGuard