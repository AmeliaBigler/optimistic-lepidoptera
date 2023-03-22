const loginFunction = async () => {
  document.location.replace('/login');
};

const signUpFunction = async () => {
  document.location.replace('/signup');
};
  
document.querySelector('#login').addEventListener('click', loginFunction);
document.querySelector('#signup').addEventListener('click', signUpFunction);