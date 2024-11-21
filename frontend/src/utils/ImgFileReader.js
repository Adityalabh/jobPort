

export const ImgFileReader =(file)=>{
    return new Promise((resolve)=>{
        const reader = new FileReader();
        reader.onloadend=()=>{
            if(typeof reader.result === 'string')resolve(reader.result);
        }
        reader.readAsDataURL(file);
    })
}

// explain version
// Alright! Let’s break down this code step-by-step in a straightforward way:
// Function Definition: ImgFileReader is a function that takes a file (usually an image) as an argument.
// Promise: This function returns a Promise. A Promise is something that will eventually provide a result (either success or failure) after some time.
// FileReader: Inside the function, a FileReader object is created. FileReader is a built-in browser feature that reads files (like images) and helps convert them into different formats.
// Onloadend Event: The onloadend event fires when the reading operation is complete. If the result is a string, it will resolve the Promise with the result.
// Reading the File: reader.readAsDataURL(file) reads the file and converts it to a Data URL (a string that represents the file’s data).
// So, in simple terms, this function takes a file, reads it as a Data URL, and returns that Data URL after the reading is complete. It helps you convert an image file into a format that you can use directly in your web application.
// It’s like taking a physical photo, scanning it, and then getting a digital version of it you can share online. 📸✨ Let me know if this helps!