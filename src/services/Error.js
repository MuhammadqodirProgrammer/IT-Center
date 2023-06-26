export const error = () => {
    sessionStorage.setItem("err", "error")
    window.location.reload();
}
