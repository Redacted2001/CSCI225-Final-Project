$(document).ready(function() {
  $('#signUpTab').click(function() {
      $('#signUpForm').show();
      $('#signInForm').hide();
  });

  $('#signInTab').click(function() {
      $('#signInForm').show();
      $('#signUpForm').hide();
  });

  $('#signInForm').submit(function(event) {
      event.preventDefault();

      let username = $('#signInUsername').val();
       let password = $('#signInPassword').val();
      console.log('Sign in:', username, password);

      // Redirect to 'stowaway.html' after form submission
      window.location.href = 'stowaway.html';
  });

  $('#signUpForm').submit(function(event) {
      event.preventDefault();
      let username = $('#signUpUsername').val();
      let password = $('#signUpPassword').val();
      console.log('Sign up:', username, password);

      // Redirect to 'stowaway.html' after form submission
      window.location.href = 'stowaway.html';
  });
});
