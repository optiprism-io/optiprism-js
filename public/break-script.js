/* An example of a script that should break the call to the second handler
 * But this doesn't happen in most modern browsers */

let button = document.querySelector('button')

button.addEventListener('click', function () {
  console.log('First handler')
  throw new Error('Error in first handler')
})

button.addEventListener('click', function () {
  console.log('Second handler')
})
