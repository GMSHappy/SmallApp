export async function GET(req, res) {
    console.log("In the weather API page");
  
    try {
      const res2 = await fetch('http://api.weatherapi.com/v1/current.json?key=c5fcb2c7e8704e15b7f164209242410&q=Dublin&aqi=no');
      
      // Parse the JSON response
      const data = await res2.json();
  
      // Extract the temperature in Celsius
      const currentTemp = data.current.temp_c;
  
      console.log(`Current temperature in Dublin: ${currentTemp}°C`);
  
      // Return the temperature as a JSON response
      return Response.json({ temp: currentTemp });
    } catch (error) {
      console.error("Error fetching weather data:", error);
  
      // Return an error response in case of failure
      return Response.json({ error: "Unable to fetch weather data" }, { status: 500 });
    }
  }
  