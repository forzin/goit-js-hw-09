const form = document.querySelector(`.feedback-form`);

let formData = {
    email: "",
    message: ""
}

const saveUserInfo = (key) => {
    try {
        const infoKey = localStorage.getItem(key);

        return infoKey === null ? undefined : JSON.parse(infoKey);
    } catch (err) {
        console.log(err);
    }
}

form.addEventListener(`input`, event => {
    
    const { name, value } = event.target;
    
    formData[name] = value.trim();
    
    try {
        localStorage.setItem(`feedback-form-state`, JSON.stringify(formData));
    } catch (err) {
        console.log(err);
    }
    
})


window.addEventListener(`load`, () => {
    const userLogInfo = saveUserInfo(`feedback-form-state`);
    if (userLogInfo !== undefined) {
        formData.email = userLogInfo.email || "";
        formData.message = userLogInfo.message || "";

        form.elements.email.value = formData.email;
        form.elements.message.value = formData.message;
    }
})


form.addEventListener(`submit`, event => {
    event.preventDefault(); 
    if (!formData.email || !formData.message) {
        alert(`Fill please all fields`);
        return
    }

    resetStorage();

})

const resetStorage = () => {
    console.log(formData);
    localStorage.removeItem(`feedback-form-state`);
    formData = {
        email: ``,
        message: ``
    }
    form.reset();
}