
    console.log("javascript is working....................")
    function applyParams({inputUrl}) {
      console.log(inputUrl)
      const inputUrlObj = new URL(inputUrl, window.location.origin);
      const currentPageParams = new URLSearchParams(window.location.search);
      const inputUrlParams = new URLSearchParams(inputUrlObj.search);
    
      // Iterate over all parameters in the current page's URL
      for (const [key, value] of currentPageParams) {
        // If the input URL does not already contain the parameter, add it
        if (!inputUrlParams.has(key)) {
          inputUrlParams.append(key, value);
        }
      }
    
      // Construct the final URL
      const finalUrl = inputUrlObj.origin + inputUrlObj.pathname + '?' + inputUrlParams.toString();
      console.log(finalUrl)
      return finalUrl;
    }

    const formatDate = (options = { slated: false, addDate: 0 }) => {
      const defaultOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
    
      const today = new Date();
    
      if (options.slated) {
        const day = (today.getDate() + (options.addDate || 0)).toString().padStart(2, '0');
        const month = (today.getMonth() + 1).toString().padStart(2, '0');
        const year = today.getFullYear();
        return `${day}/${month}/${year}`;
      }
    
      if(options.addDate){
        today.setDate(today.getDate()+options.addDate)
      }
      const formattedDate = today.toLocaleDateString(undefined, defaultOptions);
    
      return formattedDate;
    };
    
    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };
    function runDelayedFunctions(data) {
      document.querySelectorAll('.atomicat-delay').forEach(el => el.classList.remove('atomicat-delay'));
      if(data?.setDisplayed){
        localStorage.setItem(data?.setDisplayed, true);
      }
    }
  

    (function()  {
      const option = {
        year: 'numeric',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      };

      const dataPorExtenso = new Date().toLocaleDateString(undefined, option);
      const dataNumerica = new Date().toLocaleDateString();
      let output = '';
      const request = new XMLHttpRequest();
      request.open('GET', 'https://wtfismyip.com/json', true);

      request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          const data = JSON.parse(this.response);
          output = data.YourFuckingLocation.replace(/,.+/g, "$'");
          console.log(data);
          console.log(document.querySelectorAll('.atomicat-customer-city'));
          document.querySelectorAll('.atomicat-customer-city').forEach(el => {
            el.innerText = data?.YourFuckingCity;
          });
          document.querySelectorAll('.atomicat-customer-country').forEach(el => {
            el.innerText = data?.YourFuckingCountry;
          });
          const script = {
            city: data?.YourFuckingCity,
            country: data?.YourFuckingCountry,
            countryCode: data?.YourFuckingCountryCode,
            location: data?.YourFuckingLocation,
            numToday: dataNumerica,
            fullToday: dataPorExtenso,
          };
        }
      };

      request.onerror = function () {};
      request.send();
      return output;
    })();

    (function() {
      const replaceItems = ["hoje-ext", "amanha-ext", "hoje", "ano", "amanha", "hora"]
      replaceItems.forEach(rI => {
        let innerData = ""
        if(rI == "hoje-ext"){
          innerData = formatDate()
        } else if(rI == "amanha-ext"){
          innerData = formatDate({addDate: 1})
        } else if(rI == "hoje"){
          innerData = formatDate({ slated: true })
        } else if(rI == "ano"){
          innerData = new Date().getFullYear()
        } else if(rI == "amanha"){
          innerData = formatDate({ slated: true, addDate: 1 })
        } else if(rI == "hora"){
          innerData = formatTime()
        }
        document.querySelectorAll('.atomicat-'+rI).forEach(el => {
          el.innerText = innerData
        });
      });
    })();

    (function() {
      function rdn(e, t) {
        return Math.floor(Math.random() * (t - e + 1) + e)
      }

      let initial = rdn(400,700);

      setInterval(() => {
        document.querySelectorAll('.atomicat-random').forEach(el => {
          el.innerText = initial.toString();
        });
        initial += rdn(-1, 2);
      }, 1000);

    })();
  
    (function() {
      const accordionTitles = document.querySelectorAll(".atomicat-accordion-title");
      accordionTitles.forEach((title, index) => {
        title.addEventListener("click", () => {
          // Toggle the "active" class to open/close the accordion
          title.classList.toggle("atomicat-title-active");
          const accordionContent = title.nextElementSibling;
          const toggleSymbol = title.querySelector(".atomicat-accordion-toggle");
          title.childNodes[1].childNodes[0].classList.toggle('atomicat-hidden')
          title.childNodes[1].childNodes[1].classList.toggle('atomicat-hidden')
          accordionContent.classList.toggle("atomicat-content-inactive");
        });
      });
    })();
      (function() {
        const countdownList = [{"style":{"countdown":{"paddingRight":{"desktop":"2px"},"border":{"color":"rgba(255, 255, 255, 1)"},"digits":{"color":"rgba(255, 255, 255, 1)"},"flexDirection":"column","paddingLeft":{"desktop":"24px"},"maxWidth":{"desktop":"63%"},"gap":{"desktop":"0px"},"label":{"fontSize":{"desktop":"18px"},"color":"rgba(255, 255, 255, 1)"}}},"compKey":"1d2979c2-ff85-4fcd-af98-b55adc7e24a9","misc":{"dateTime":"15:15","countdownType":"evergreen","type":"countdown","items":[{"show":false,"text":"Days"},{"text":"Hours","show":true},{"text":"Minutes","show":true},{"show":true,"text":"Seconds"}],"tag":"div","labelTag":"span"}}];

        countdownList.forEach(function(countdown) {
          const countdownType = countdown.misc.countdownType;
          const dateTime = countdown.misc.dateTime;
          const compKey = countdown.compKey.slice(0, 7);
          const intervalName = 'atomicat_countdown_interval_' + compKey;

          window[intervalName] = setInterval(function updateCountdown() {
            let targetTime;
            if (countdownType === "evergreen") {
              const sessionStorageKey = 'atomicat_countdown_start_' + compKey;
              let countdownStart = sessionStorage.getItem(sessionStorageKey);
              if (!countdownStart) {
                countdownStart = new Date().getTime();
                sessionStorage.setItem(sessionStorageKey, countdownStart);
              }
              const [hours, minutes] = dateTime.split(":").map(Number);
              targetTime = new Date(parseInt(countdownStart));
              targetTime.setHours(targetTime.getHours() + hours);
              targetTime.setMinutes(targetTime.getMinutes() + minutes);
            } else if (countdownType === "due_date") {
              targetTime = new Date(dateTime);
            }

            const now = new Date();
            const distance = targetTime - now;

            if (distance <= 0) {
              clearInterval(window[intervalName]);
              const countdownContainer = document.querySelector('.atomicat-countdown-' + compKey);
              if(countdownContainer) {
                const countdownDigits = countdownContainer.querySelectorAll('.atomicat-countdown-digits');
                countdownDigits.forEach(digit => digit.textContent = '00');
              }
              return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const countdownContainer = document.querySelector('.atomicat-countdown-' + compKey);
            if(countdownContainer) {
              if(countdownContainer.querySelector('.atomicat-countdown-days')){
                countdownContainer.querySelector('.atomicat-countdown-days').textContent = days < 10 ? `0${days}` : days;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-hours')){
                countdownContainer.querySelector('.atomicat-countdown-hours').textContent = hours < 10 ? `0${hours}` : hours;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-minutes')){
                countdownContainer.querySelector('.atomicat-countdown-minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
              }
              if(countdownContainer.querySelector('.atomicat-countdown-seconds')){
                countdownContainer.querySelector('.atomicat-countdown-seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;
              }
            }
          }, 1000);
        });
    })();
    (function() {
      document.addEventListener('DOMContentLoaded', function () {
        const modalButtons = document.querySelectorAll('.atomicat-trigger-global-modal');
        const globalModalBox = document.querySelector('.atomicat-global-modal');
        const modalClose = ['atomicat-global-modal-overlay', 'atomicat-modal-close'];
        modalButtons?.forEach(button => {
          button?.addEventListener('click', function() {
            console.log("clicked modalButtons...")
            const globalModal = document.querySelector('.atomicat-global-modal');
            const globalModalOverlay = document.querySelector('.atomicat-global-modal-overlay');
            console.log(globalModal)
            if(globalModal) {
              globalModal.classList.add('atomicat-global-modal-active');
              globalModalOverlay.classList.add('atomicat-global-modal-active');
            }
          });
        });
        modalClose?.forEach(close => {
          const closeEle = document.getElementById(close);
          closeEle?.addEventListener('click', function() {
            console.log("clicked modalButtons...")
            const globalModal = document.querySelector('.atomicat-global-modal');
            const globalModalOverlay = document.querySelector('.atomicat-global-modal-overlay');
            console.log(globalModal)
            if(globalModal) {
              globalModal.classList.remove('atomicat-global-modal-active');
              globalModalOverlay.classList.remove('atomicat-global-modal-active');
            }
          });
        });
        globalModalBox?.addEventListener('click', function(e) {
          console.log("clicked globalModalBox...")
          console.log(e)
          if (typeof e?.target?.className === "string" && e?.target?.className?.includes('atomicat-global-modal')) {
            const globalModal = document.querySelector('.atomicat-global-modal');
            const globalModalOverlay = document.querySelector('.atomicat-global-modal-overlay');
            console.log(globalModal)
            if(globalModal) {
              globalModal.classList.remove('atomicat-global-modal-active');
              globalModalOverlay.classList.remove('atomicat-global-modal-active');
            }
          }
        });
      });
    })();