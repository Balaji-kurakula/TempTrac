document.addEventListener('DOMContentLoaded', () => {
  const daySelect = document.getElementById('day-select');
  const timeSelect = document.getElementById('time-select');
  const temperatureDisplay = document.getElementById('temperature-display');
  const button = document.querySelector('button');

  // Function to fetch temperature data
  function fetchTemperature() {


      const selectedDay = daySelect.value;
      const selectedTime = timeSelect.value;

      // Fetch temperature data for the selected day
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&forecast_days=5`)
      .then(response => response.json())
      .then(data => {
          const forecast = data.hourly.temperature_2m;
          console.log(forecast);

          const curTime = selectedDay + "T" + selectedTime;

          const index = data.hourly.time.findIndex((elem)=>{
          return elem === curTime;
          });
          const temperature = data.hourly.temperature_2m[index];
          temperatureDisplay.textContent = `Temperature on ${selectedDay} at ${selectedTime} :  ${temperature}°C`;
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Populate dropdowns with days and times
  function populateDropdowns() {
      const today = new Date();

      // Generate options for the next 5 days
      for (let i = 0; i < 5; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const formattedDate = date.toISOString().split('T')[0];
          daySelect.innerHTML += `<option value="${formattedDate}">${formattedDate}</option>`;
      }

      // Generate options for times (0:00 to 23:00)
      for (let i = 0; i < 24; i++) {
          const hour = i < 10 ? `0${i}` : `${i}`;
          timeSelect.innerHTML += `<option value="${hour}:00">${hour}:00</option>`;
      }
  }

  // Populate dropdowns on page load
  populateDropdowns();

  // Fetch temperature on button click
  button.addEventListener('click', fetchTemperature);
});
