const range = document.getElementById("range");
const checkBoxes = document.getElementsByName("checkboxes");
let passLenght = document.querySelector("#lengthValue");
let generatePassBtn = document.getElementById("generatePasswordBtn");
let input = document.querySelector("input");
let randomPasswordGenerator = "";
let showPassword = "";
let eye_icon = document.querySelector("i");
let copyIcon = document.querySelector(".fa-copy");
let text = document.querySelector(".text");
let flag = true;


input.addEventListener("input", () => {
  if (input.value) {
    copyIcon.title = "Copy Password";
  } else {
    copyIcon.title = " ";
  }
});

copyIcon.addEventListener("click", () => {
  if (input.value.trim() && flag) {
    input.select();
    document.execCommand("copy");
    copyIcon.className = "fa-solid fa-check";
    copyIcon.title = "Password Copied";
    flag = false;
  } else {
    copyIcon.className = "fa-regular fa-copy";
    copyIcon.title = "Copy Password";
    flag = true;
  }
});

eye_icon.addEventListener("click", () => {
 
  console.log(eye_icon.className);
  if (eye_icon.className == "fa-regular fa-eye text-gray-500") {
    eye_icon.className = "fa-regular fa-eye-slash text-gray-500";
    input.type = "password";
  } else {
    input.type = "text";
    eye_icon.className = "fa-regular fa-eye text-gray-500";
  }
});

passLenght.innerText = `Password length:${range.value}`;

range.addEventListener("input", function () {
  passLenght.innerText = `Password length:${range.value}`;
});

let password = "";
let smallAlphabets = "abcdefghijklmnopqrstuvwxyz";

let result = "";
let num = 0;

generatePassBtn.addEventListener("click", () => {
  let yesOrNot = false;
  let hasOrNot = false;
  checkBoxes.forEach((selection) => {
    if (selection.checked) {
      yesOrNot = true;
      if (selection.value == "AZ") {
        password += smallAlphabets.toUpperCase();
        num++;
      }

      if (selection.value == "az") {
        password += smallAlphabets;
        num++;
      }

      if (selection.value == "09") {
        password += "0123456789";
        num++;
      }

      if (selection.value == "!@#") {
        password += "!@#$%^&*()_+-=[]{}|;:',.<>?/\\";
        num++;
      }

      if (num) {
        let messages = [
          "",
          "🚨 Too Weak! Select more options.", 
          "⚠️ Weak. Try including more options.", 
          "🔵 Medium. Add more variations for better security.", 
          "✅ Strong! Your password is secure.", 
        ];
        let colors = ["black", "red", "brown", "blue", "green"];

        for (let i = 1; i < messages.length; i++) {
          if (num == i) {
            hasOrNot = true;
            text.innerText = `${messages[i]}`;
            text.style.color = colors[i];
          }
        }
      }
    }
  });

  if (!hasOrNot) {
    text.innerText = "";
  }

  if (!yesOrNot) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "error",
      title: " Please Select option.",
    });
  }

  input.value = "";
  if (password) {
    for (let i = 0; i < range.value; i++) {
      showPassword = password[Math.trunc(Math.random() * password.length)];
      input.value += showPassword;
    }
  }

  num = 0;
  password = "";
});
