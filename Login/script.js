document.addEventListener('DOMContentLoaded', function () {
  const signUpButton = document.getElementById('signUpButton');
  const signInButton = document.getElementById('signInButton');
  const adminsignInButton = document.getElementById('adminsignInButton');
  const adminsignUpButton = document.getElementById('adminsignUpButton');
  const backToUserLogin = document.getElementById('backToUserLogin');
  const backToUserLoginFromAdminsignUp = document.getElementById('backToUserLoginFromAdminsignUp');

  const signInForm = document.getElementById('signIn');
  const signUpForm = document.getElementById('signup');
  const adminsignInForm = document.getElementById('adminsignIn');
  const adminsignUpForm = document.getElementById('adminsignUp');

  signUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
    adminsignInForm.style.display = "none";
    adminsignUpForm.style.display = "none";
  });

  signInButton.addEventListener('click', function () {
    signInForm.style.display = "block";
    signUpForm.style.display = "none";
    adminsignInForm.style.display = "none";
    adminsignUpForm.style.display = "none";
  });

  adminsignInButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    adminsignInForm.style.display = "block";
    signUpForm.style.display = "none";
    adminsignUpForm.style.display = "none";
  });

  adminsignUpButton.addEventListener('click', function () {
    signInForm.style.display = "none";
    adminsignInForm.style.display = "none";
    adminsignUpForm.style.display = "block";
  });

  backToUserLogin.addEventListener('click', function () {
    adminsignInForm.style.display = "none";
    signInForm.style.display = "block";
  });

  backToUserLoginFromAdminsignUp.addEventListener('click', function () {
    adminsignUpForm.style.display = "none";
    signInForm.style.display = "block";
  });
});
