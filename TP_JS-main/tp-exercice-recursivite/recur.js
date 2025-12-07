setInterval(function run() {
  console.log("hello");
}, 1000);
//answer 
function run() {
  console.log("hello");
  setTimeout(run, 1000); 
}

setTimeout(run, 1000); l