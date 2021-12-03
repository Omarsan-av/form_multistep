let currentTab = 0; 
let title = document.getElementById("title");
let nameUser = document.getElementById("name");
let paternal = document.getElementById("paternal");
let maternal = document.getElementById("maternal");
let address = document.getElementById("address");
let cp = document.getElementById("cp");
let phone = document.getElementById("phone");
let email = document.getElementById('email'); 
let next = document.getElementById("nextBtn");
let letters_spaces = document.querySelectorAll('.letters_spaces')
let letters_spaces_numbers = document.querySelectorAll('.letters_spaces_numbers')
let numbers = document.querySelectorAll('.numbers');
let error_email = document.querySelectorAll('.error_email');
const patron1 = /^[a-zA-Z\s]{1,40}$/;
const patron2 = /^[a-zA-Z0-9\s#]{3,100}$/;
const patron3 = /^[0-9]{5}$/;
const patron4 = /^[0-9]{10}$/;
const patron5 = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

showTab(currentTab); 

function showTab(n) 
{
   let x = document.getElementsByClassName("tab");
   x[n].style.display = "block";

   if (n == 0) 
   {
      document.getElementById("prevBtn").style.display = "none";
   } 
   else 
   {
      document.getElementById("prevBtn").style.display = "inline";
   }
   
   if (n == (x.length - 1)) 
   {
      next.innerHTML = "Enviar";
   } 
   else 
   {
      next.innerHTML = "Siguiente";
   }
   
   fixStepIndicator(n)
}

function nextPrev(n) 
{
   let x = document.getElementsByClassName("tab");

   if (n == 1 && !validateForm()) return false;

   x[currentTab].style.display = "none";

   currentTab = currentTab + n;

   if (currentTab >= x.length) 
   {
      document.getElementById("register").submit();
      return false;
   }
   
   showTab(currentTab);
}

function validateForm()  
{
   let x, y, valid = true;
   x = document.getElementsByClassName("tab");
   y = x[currentTab].getElementsByTagName("input");

   function getAddress()
   {
      if(patron2.test(address.value))
      {
         letters_spaces_numbers[0].style.display = "none";
      }

      else 
      {
         letters_spaces_numbers[0].style.display = "block";
         valid = false;
         address.classList.add("invalid");
      }
   }

   function onlyNumbers(number, field, nameClass, patron)
   {

      if(patron.test(field.value) == false )
      {
         dateInvalid(number, field, nameClass)
      }

      else
      {
         nameClass[number].style.display = "none";
      }
   }

   function getEmail(number, field, nameClass)
   {
      if(patron5.test(field.value) == false)
      {
         dateInvalid(number, field, nameClass)
      }

      else
      {
         nameClass[number].style.display = "none";
      }
   }

   function dateInvalid(number, field, nameClass)
   {
      field.classList.add("invalid");
      valid = false;
      nameClass[number].style.display = "block";
   }

   function typeField(field, number, patron, nameClass)
   {
      if(field.value.length < 3 || field.value.length > 30)
      {
         dateInvalid(number, field, nameClass)
      }
   
      else 
      {
         if(patron.test(field.value) == false )
         {
            dateInvalid(number, field, nameClass)
         }

         else
         {
            nameClass[number].style.display = "none";
         }
      }
   }

   typeField(nameUser, 0, patron1, letters_spaces)
   typeField(paternal, 1, patron1, letters_spaces)
   typeField(maternal, 2, patron1, letters_spaces)
   getAddress()
   onlyNumbers(0, cp, numbers, patron3)
   onlyNumbers(1, phone, numbers, patron4)
   getEmail(0, email, error_email)

   if (valid) 
   {
      document.getElementsByClassName("step")[currentTab].className += " finish";
   }
   return valid; 
   
}

function fixStepIndicator(n) 
{
   let i, x = document.getElementsByClassName("step");
   
   for (i = 0; i < x.length; i++) 
   {
      x[i].className = x[i].className.replace(" active", "");
   }

   x[n].className += " active";
}