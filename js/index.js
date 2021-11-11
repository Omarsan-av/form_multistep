let currentTab = 0; 
showTab(currentTab); 

let title = document.getElementById("title");

function showTab(n) 
{
   let x = document.getElementsByClassName("tab");
   x[n].style.display = "block";

   if (n == 0) 
   {
      document.getElementById("prevBtn").style.display = "none";
      title.innerHTML = "INformación de Contacto";
   } 
   else 
   {
      document.getElementById("prevBtn").style.display = "inline";
   }

   if(n == 1)
   {
      title.innerHTML = "Especificaciones <br> de la propiedad";
   }

   if(n == 2)
   {
      title.innerHTML = "Detalles de la propiedad";
   }

   if(n == 3)
   {
      title.innerHTML = "Fotos de la propiedad";
   }

   if(n == 4)
   {
      title.innerHTML = "Términos y Condiciones";
   }
   
   if (n == (x.length - 1)) 
   {
      document.getElementById("nextBtn").innerHTML = "Enviar";
   } 
   else 
   {
      document.getElementById("nextBtn").innerHTML = "Siguiente";
   }
   
   fixStepIndicator(n)
}

function nextPrev(n) 
{
   // This function will figure out which tab to display
   var x = document.getElementsByClassName("tab");

   // Exit the function if any field in the current tab is invalid:
   if (n == 1 && !validateForm()) return false;

   // Hide the current tab:
   x[currentTab].style.display = "none";

   // Increase or decrease the current tab by 1:
   currentTab = currentTab + n;

   // if you have reached the end of the form... :
   if (currentTab >= x.length) 
   {
      //...the form gets submitted:
      document.getElementById("register").submit();
      return false;
   }
   
   // Otherwise, display the correct tab:
   showTab(currentTab);
}

function validateForm()  
{
   // This function deals with validation of the form fields
   let x, y, i, valid = true;
   x = document.getElementsByClassName("tab");
   y = x[currentTab].getElementsByTagName("input");

   // A loop that checks every input field in the current tab:
   for (i = 0; i < y.length; i++) 
   {
      // If a field is empty...
      if (y[i].value == "") 
      {
         // add an "invalid" class to the field:
         y[i].className += " invalid";
         // and set the current valid status to false:
         valid = false;
      }
   }
   
   // If the valid status is true, mark the step as finished and valid:
   if (valid) 
   {
      document.getElementsByClassName("step")[currentTab].className += " finish";

   }
   return valid; // return the valid status
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