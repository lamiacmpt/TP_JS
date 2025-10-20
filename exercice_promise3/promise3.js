console.log("Program started");

const firstPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Step 1 complete");
  }, 3000);
});

console.log("Program in progress...");
console.log(firstPromise); 
firstPromise
  .then((message) => {
    console.log(message);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Step 2 complete");
      }, 3000);
    });
  })
  .then((message2) => {
    console.log(message2);
  });