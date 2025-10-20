// assets/js/typed_init.js

document.addEventListener('DOMContentLoaded', function() {
  // Options for the Typed.js instance
  var options = {
    strings: [
      'a software engineer.',
      'learning deep learning (allegedly).',
      'frequent victim of cat-induced distractions.',
      'a roguelike enjoyer.',
      'running on caffeine and conflicting genres.',
      'motorsport enjoyer (with no track time).'
    ],
    typeSpeed: 50,  // Speed of typing in milliseconds
    backSpeed: 25,  // Speed of backspacing
    loop: true,     // Loop the animation indefinitely
    smartBackspace: true // Only backspace what doesn't match the next string
  };

  // Create a new Typed.js instance
  var typed = new Typed('#typed-subtitle', options);
});