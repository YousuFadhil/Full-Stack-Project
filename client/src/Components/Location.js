import React, { useState, useEffect } from "react";
import axios from "axios";

const Location = () => {
  const [ip, setIp] = useState(null); // State to hold the IP address
  const [geoData, setGeoData] = useState(null); // State to hold geolocation

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      setIp(response.data.ip); // Set the IP address in state
    } catch (error) {
      console.error("Error fetching IP address:", error.message);
    }
  };

  // Fetch geolocation data based on the IP
  const getGeoLocationData = async () => {
    if (!ip) return; // Ensure IP is available before making the request
    try {
      const response = await axios.get(
        `https://geo.ipify.org/api/v2/country?apiKey=at_NoIYtZEjcgPrsNoDP6ddFmBechC3y&ipAddress=${ip}`
      );
      setGeoData(response.data); // Set geolocation data in state
    } catch (error) {
      console.error("Error fetching geolocation data:", error.message);
    }
  };

  useEffect(() => {
    fetchIpAddress();
  }, []);

  useEffect(() => {
    if (ip) {
      getGeoLocationData();
    }
  }, [ip]);

  return (
    <div>
      {ip ? <input type="text" className="form-control mb-2" value={`IP: ${ip}`} readOnly /> : <p>Loading IP address...</p>}
      {geoData ? (
        <input
          type="text"
          className="form-control"
          value={`Country: ${geoData.location.country}, Region: ${geoData.location.region}`}
          readOnly
        />
      ) : (
        <p>Loading Geolocation Data...</p>
      )}
    </div>
  );
};

export default Location;
