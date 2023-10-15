function LogoutAuthorizedUser(context) {
    context.user = {};
    context.isAuth = false;
    localStorage.removeItem("token");
}

export default LogoutAuthorizedUser;