const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
};

const loginButton = async () => {
  document.location.replace('/login');
};

const signUpButton = async () => {
  document.location.replace('/signup');
};
  
// document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('#login').addEventListener('click', loginButton);
document.querySelector('#signup').addEventListener('click', signUpButton);
// document.querySelector('#signUpBtn').addEventListener('click', signUpButton);