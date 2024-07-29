function showLoginForm() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('form-title').innerText = 'Log In';
}

function showSignupForm() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('form-title').innerText = 'Sign Up';
}
