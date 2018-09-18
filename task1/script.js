function loading_event() {
    let div = document.getElementsByClassName("select1_click");
    let div1 = document.getElementsByClassName("select1_leave");
    let div2 = document.getElementsByClassName("select_1_update");
    let arrow_up = document.getElementsByClassName("select_2_2_arrow1");
    let arrow_down = document.getElementsByClassName("select_2_2_arrow2");
    for (let i = 0; i < div.length; i++) {
        div[i].addEventListener('click', function () {
            if (this.parentElement.getElementsByClassName("hidden").length !== 0) {
                this.parentElement.getElementsByClassName("hidden")[0].classList.add("open");
                this.parentElement.getElementsByClassName("open")[0].classList.remove("hidden");
            }
        });
        div1[i].addEventListener('mouseleave', function () {
            if (this.getElementsByClassName("open").length !== 0) {
                this.getElementsByClassName("open")[0].classList.add("hidden");
                this.getElementsByClassName("hidden")[0].classList.remove("open");
            }
        });
    }
    for (let i = 0; i < div2.length; i++) {
        div2[i].addEventListener('click', function () {
            this.parentElement.parentElement.getElementsByClassName("select_text")[0].innerText = this.innerText;
            if (this.parentElement.classList[0] === "open") {
                this.parentElement.parentElement.getElementsByClassName("open")[0].classList.add("hidden");
                this.parentElement.parentElement.getElementsByClassName("hidden")[0].classList.remove("open");
            }
        });
    }
    for (let i = 0; i < arrow_up.length; i++) {
        arrow_up[i].addEventListener('click', function () {
            let str = this.parentElement.parentElement.getElementsByClassName("select_text");
            str[0].innerText = parseInt(str[0].innerText) + 1;
        });
        arrow_down[i].addEventListener('click', function () {
            let str = this.parentElement.parentElement.getElementsByClassName("select_text");
            str[0].innerText = parseInt(str[0].innerText) - 1;
        });
    }
}
window.onload = function () {
    loading_event();
};
