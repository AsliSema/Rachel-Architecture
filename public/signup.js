//-----Sign-In, Sign-Up Page-----//

signUpButton.addEventListener("click", event =>{
    event.preventDefault()
    signInPage.classList.add("non-active")
    signUpPage.classList.remove("non-active")
})

signInButton.addEventListener("click", event =>{
    event.preventDefault()
    signUpPage.classList.add("non-active")
    signInPage.classList.remove("non-active")
})